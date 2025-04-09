"use client";
import { motion } from "framer-motion";
import InfinityLoop from "../InfinityLoop";

export default function MintingSection() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center relative snap-start">
      <div className="max-w-lg w-full px-4 py-8 flex flex-col items-center space-y-6 relative">
        {/* Infinity loop positioned at the top */}
        <motion.div
          className="flex justify-center absolute top-[-300px]"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <InfinityLoop />
        </motion.div>

        {/* Headings */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-12">Purchase PLHH</h1>
          <h2 className="text-lg md:text-xl text-yellow-500 tracking-wider">
            PLHH PRESALE
          </h2>
        </div>

        {/* Payment Method Options */}
        <div className="w-full border border-gray-700 p-4 rounded-lg">
          <p className="text-xl md:text-2xl font-semibold mb-3">Select Payment Method</p>
          <div className="flex items-center space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg">
              Cryptocurrency
            </button>
            <button className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded-lg hover:bg-yellow-600/20">
              Fiat Currency
            </button>
          </div>
        </div>

        {/* PLHH Amount Input */}
        <div className="w-full border border-gray-700 p-4 rounded-lg">
          <p className="text-xl md:text-2xl font-semibold mb-3">Amount of PLHH</p>
          <input
            type="number"
            placeholder="Enter PLHH amount"
            className="w-full bg-black border border-gray-600 rounded-md p-3 focus:outline-none"
          />
        </div>

        {/* Bottom Section: Rate & Wallet Connect */}
        <div className="w-full flex items-center justify-between border border-gray-700 p-4 rounded-lg">
          <p className="text-sm md:text-base text-gray-300">
            1 PLHH = <span className="text-white">$0.006</span>
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg">
            Connect Wallet
          </button>
        </div>
      </div>
    </section>
  );
}
