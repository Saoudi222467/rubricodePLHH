module 0x0::plhh_dao {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};
    use sui::vec_map::{Self, VecMap};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use 0x4baa9e1a7f3cfd74a7d3e42ff54ab1b0e376df20b6d7ff090455c9043dda18fc::plhh::PLHH;



    use std::string::{Self, String};
    use std::vector;
    use std::option::{Self, Option};

    // ===== Constants =====
    const VOTING_PERIOD: u64 = 7 * 24 * 60 * 60; // 7 days in seconds
    const EXECUTION_DELAY: u64 = 2 * 24 * 60 * 60; // 2 days in seconds
    const QUORUM_THRESHOLD: u64 = 10; // Minimum percentage of voters required for proposal to pass

    // ===== Errors =====
    const ENO_ACTIVE_PROPOSAL: u64 = 1;
    const EALREADY_VOTED: u64 = 2;
    const EVOTING_ENDED: u64 = 3;
    const EVOTING_NOT_ENDED: u64 = 4;
    const EPROPOSAL_STATE_CONFLICT: u64 = 5;
    const EEXECUTION_DELAY_NOT_MET: u64 = 6;
    const ENO_TOKEN_BALANCE: u64 = 7;
    const EPROPOSAL_ALREADY_EXECUTED: u64 = 8;
    const EPROPOSAL_REJECTED: u64 = 9;
    const EPROPOSAL_NOT_FOUND: u64 = 10;
    const EUSER_NOT_ADMIN: u64 = 11;

    // ===== Types =====
    public struct ProposalStatus has copy, drop, store {
        // States a proposal can be in
        is_active: bool,
        is_executed: bool,
        is_canceled: bool,
        voting_end_time: u64,
        execution_time: u64,
        votes_for: u64,
        votes_against: u64,
        total_voters: u64,
    }

    public struct ProposalAction has copy, drop, store {
        // Stores the action type and parameters to be executed if proposal passes
        action_type: u8, // 1=Parameter change, 2=Fund allocation, etc.
       
    }

    public struct Proposal has store {
        id: u64,
        creator: address,
        title: String,
        description: String,
        created_at: u64,
        status: ProposalStatus,
        action: ProposalAction,
    }

    public struct DAOConfig has key, store {
        id: UID,
        admin: address,
        proposal_count: u64,
        voting_period: u64,
        execution_delay: u64,
        quorum_threshold: u64,
    }

    public struct DAOStorage has key {
        id: UID,
        proposals: Table<u64, Proposal>,
        votes: Table<address, VecMap<u64, bool>>, // Map of voter address -> (proposal_id -> vote)
        voter_count: Table<u64, u64>, // Count of unique voters per proposal
    }

    // ===== Events =====
    public struct ProposalCreated has copy, drop {
        proposal_id: u64,
        creator: address,
        title: String,
        description: String,
        created_at: u64,
        voting_end_time: u64,
    }

    public struct VoteCast has copy, drop {
        proposal_id: u64,
        voter: address,
        support: bool,
        votes_for: u64,
        votes_against: u64,
    }

    public struct ProposalExecuted has copy, drop {
        proposal_id: u64,
        executor: address,
        succeeded: bool,
    }

    public struct ProposalCanceled has copy, drop {
        proposal_id: u64,
        canceler: address,
    }

    public struct DAOConfigChanged has copy, drop {
        parameter: String,
        old_value: u64,
        new_value: u64,
        admin: address,
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let dao_config = DAOConfig {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
            proposal_count: 0,
            voting_period: VOTING_PERIOD,
            execution_delay: EXECUTION_DELAY,
            quorum_threshold: QUORUM_THRESHOLD,
        };
        
        let dao_storage = DAOStorage {
            id: object::new(ctx),
            proposals: table::new(ctx),
            votes: table::new(ctx),
            voter_count: table::new(ctx),
        };
        
        transfer::share_object(dao_config);
        transfer::share_object(dao_storage);
    }

    // ===== Public Functions =====
    
    /// Create a new proposal
    public entry fun create_proposal(
        dao_config: &mut DAOConfig,
        dao_storage: &mut DAOStorage,
        title: vector<u8>,
        description: vector<u8>,
        action_type: u8,
        clock: &Clock,
        token: &Coin<PLHH>, // Just to verify the user holds tokens
        ctx: &mut TxContext
    ) {
        // Ensure creator has some PLHH tokens
        assert!(coin::value(token) > 0, ENO_TOKEN_BALANCE);
        
        let sender = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock) / 1000; // Convert to seconds
        
        let proposal_id = dao_config.proposal_count + 1;
        dao_config.proposal_count = proposal_id;
        
        let voting_end_time = current_time + dao_config.voting_period;
        let execution_time = voting_end_time + dao_config.execution_delay;
        
        let status = ProposalStatus {
            is_active: true,
            is_executed: false,
            is_canceled: false,
            voting_end_time,
            execution_time,
            votes_for: 0,
            votes_against: 0,
            total_voters: 0,
        };
        
        let action = ProposalAction {
            action_type,
        };
        
        let proposal = Proposal {
            id: proposal_id,
            creator: sender,
            title: string::utf8(title),
            description: string::utf8(description),
            created_at: current_time,
            status,
            action,
        };
        
        table::add(&mut dao_storage.proposals, proposal_id, proposal);
        table::add(&mut dao_storage.voter_count, proposal_id, 0);
        
        event::emit(ProposalCreated {
            proposal_id,
            creator: sender,
            title: string::utf8(title),
            description: string::utf8(description),
            created_at: current_time,
            voting_end_time,
        });
    }
    
    /// Cast a vote on a proposal
    public entry fun cast_vote(
        dao_storage: &mut DAOStorage,
        proposal_id: u64,
        support: bool,
        clock: &Clock,
        token: &Coin<PLHH>, // To verify the user holds tokens
        ctx: &mut TxContext
    ) {
        // Ensure voter has some PLHH tokens
        assert!(coin::value(token) > 0, ENO_TOKEN_BALANCE);
        
        let sender = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock) / 1000; // Convert to seconds
        
        // Get proposal
        assert!(table::contains(&dao_storage.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        let proposal = table::borrow_mut(&mut dao_storage.proposals, proposal_id);
        
        // Check proposal is active
        assert!(proposal.status.is_active, ENO_ACTIVE_PROPOSAL);
        assert!(!proposal.status.is_executed, EPROPOSAL_ALREADY_EXECUTED);
        assert!(!proposal.status.is_canceled, EPROPOSAL_STATE_CONFLICT);
        assert!(current_time <= proposal.status.voting_end_time, EVOTING_ENDED);
        
        // Check if user has already voted
        if (!table::contains(&dao_storage.votes, sender)) {
            table::add(&mut dao_storage.votes, sender, vec_map::empty());
        };
        
        let user_votes = table::borrow_mut(&mut dao_storage.votes, sender);
        assert!(!vec_map::contains(user_votes, &proposal_id), EALREADY_VOTED);
        
        // Add vote
        vec_map::insert(user_votes, proposal_id, support);
        
        // Update vote count
        if (support) {
            proposal.status.votes_for = proposal.status.votes_for + 1;
        } else {
            proposal.status.votes_against = proposal.status.votes_against + 1;
        };
        
        // Update voter count for this proposal
        let voter_count = table::borrow_mut(&mut dao_storage.voter_count, proposal_id);
        *voter_count = *voter_count + 1;
        proposal.status.total_voters = *voter_count;
        
        // Emit vote event
        event::emit(VoteCast {
            proposal_id,
            voter: sender,
            support,
            votes_for: proposal.status.votes_for,
            votes_against: proposal.status.votes_against,
        });
    }
    
    /// Execute a proposal that has passed voting
    public entry fun execute_proposal(
        dao_storage: &mut DAOStorage,
        proposal_id: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let current_time = clock::timestamp_ms(clock) / 1000; // Convert to seconds
        let sender = tx_context::sender(ctx);
        
        // Get proposal
        assert!(table::contains(&dao_storage.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        let proposal = table::borrow_mut(&mut dao_storage.proposals, proposal_id);
        
        // Check proposal can be executed
        assert!(proposal.status.is_active, ENO_ACTIVE_PROPOSAL);
        assert!(!proposal.status.is_executed, EPROPOSAL_ALREADY_EXECUTED);
        assert!(!proposal.status.is_canceled, EPROPOSAL_STATE_CONFLICT);
        assert!(current_time > proposal.status.voting_end_time, EVOTING_NOT_ENDED);
        assert!(current_time >= proposal.status.execution_time, EEXECUTION_DELAY_NOT_MET);
        
        // Check if proposal has passed
        let total_votes = proposal.status.votes_for + proposal.status.votes_against;
        let succeeded = proposal.status.votes_for > proposal.status.votes_against && 
                       total_votes > 0;
        
        // Mark as executed
        proposal.status.is_active = false;
        proposal.status.is_executed = true;
        
        // Emit event
        event::emit(ProposalExecuted {
            proposal_id,
            executor: sender,
            succeeded,
        });
    }
    
    /// Cancel a proposal (only creator or admin)
    public entry fun cancel_proposal(
        dao_config: &DAOConfig,
        dao_storage: &mut DAOStorage,
        proposal_id: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Get proposal
        assert!(table::contains(&dao_storage.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        let proposal = table::borrow_mut(&mut dao_storage.proposals, proposal_id);
        
        // Check proposal is active
        assert!(proposal.status.is_active, ENO_ACTIVE_PROPOSAL);
        assert!(!proposal.status.is_executed, EPROPOSAL_ALREADY_EXECUTED);
        assert!(!proposal.status.is_canceled, EPROPOSAL_STATE_CONFLICT);
        
        // Check if sender is creator or admin
        assert!(sender == proposal.creator || sender == dao_config.admin, EUSER_NOT_ADMIN);
        
        // Cancel proposal
        proposal.status.is_active = false;
        proposal.status.is_canceled = true;
        
        // Emit event
        event::emit(ProposalCanceled {
            proposal_id,
            canceler: sender,
        });
    }
    
    /// Update the DAO configuration parameters (admin only)
    public entry fun update_dao_config(
        dao_config: &mut DAOConfig,
        param_name: vector<u8>,
        new_value: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Check if sender is admin
        assert!(sender == dao_config.admin, EUSER_NOT_ADMIN);
        
        let param_str = string::utf8(param_name);
        let old_value: u64;
        
        if (string::utf8(param_name) == string::utf8(b"voting_period")) {
            old_value = dao_config.voting_period;
            dao_config.voting_period = new_value;
        } else if (string::utf8(param_name) == string::utf8(b"execution_delay")) {
            old_value = dao_config.execution_delay;
            dao_config.execution_delay = new_value;
        } else if (string::utf8(param_name) == string::utf8(b"quorum_threshold")) {
            old_value = dao_config.quorum_threshold;
            dao_config.quorum_threshold = new_value;
        } else {
            return
        };
        
        // Emit config change event
        event::emit(DAOConfigChanged {
            parameter: param_str,
            old_value,
            new_value,
            admin: sender,
        });
    }
    
    /// Transfer admin rights to a new address
    public entry fun transfer_admin(
        dao_config: &mut DAOConfig,
        new_admin: address,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Check if sender is admin
        assert!(sender == dao_config.admin, EUSER_NOT_ADMIN);
        
        // Update admin
        dao_config.admin = new_admin;
    }
    
    // ===== View Functions =====
    
    /// Check if a user has voted on a specific proposal
    public fun has_voted(
        dao_storage: &DAOStorage,
        voter: address,
        proposal_id: u64
    ): bool {
        if (!table::contains(&dao_storage.votes, voter)) {
            return false
        };
        
        let votes = table::borrow(&dao_storage.votes, voter);
        vec_map::contains(votes, &proposal_id)
    }
    
    /// Get proposal details by ID
    public fun get_proposal(
        dao_storage: &DAOStorage,
        proposal_id: u64
    ): (String, String, u64, u64, u64, bool, bool, bool) {
        assert!(table::contains(&dao_storage.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        let proposal = table::borrow(&dao_storage.proposals, proposal_id);
        
        (
            proposal.title,
            proposal.description,
            proposal.status.votes_for,
            proposal.status.votes_against,
            proposal.status.total_voters,
            proposal.status.is_active,
            proposal.status.is_executed,
            proposal.status.is_canceled
        )
    }
    
    /// Check if a proposal has passed (can be called after voting period ends)
    public fun is_proposal_passed(
        dao_storage: &DAOStorage,
        proposal_id: u64,
        dao_config: &DAOConfig
    ): bool {
        assert!(table::contains(&dao_storage.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        let proposal = table::borrow(&dao_storage.proposals, proposal_id);
        
        // Proposal must have ended voting
        let passed = proposal.status.votes_for > proposal.status.votes_against;
        
        passed
    }
    
    /// Get DAO configuration parameters
    public fun get_dao_config(dao_config: &DAOConfig): (u64, u64, u64, address) {
        (
            dao_config.voting_period,
            dao_config.execution_delay,
            dao_config.quorum_threshold,
            dao_config.admin
        )
    }
    
    /// Get the total number of proposals
    public fun get_proposal_count(dao_config: &DAOConfig): u64 {
        dao_config.proposal_count
    }
}