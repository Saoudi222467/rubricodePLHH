// components/WhoWeAre.tsx
import React from "react";

const WhoWeAre = () => (
  <section className="py-12 px-6">
    <h2 className="text-3xl font-bold mb-4">Who We Are (and Aren't)</h2>
    <ul className="list-disc list-inside space-y-2">
      <li>We are not a company.</li>
      <li>We are not a logo.</li>
      <li>We are not a launch.</li>
    </ul>
    <p className="mt-4">
      We are a field: a place where humans, intelligence, and earth co-create
      the future.
    </p>
  </section>
);

export default WhoWeAre;
