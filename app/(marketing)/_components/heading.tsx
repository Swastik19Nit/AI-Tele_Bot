"use client";

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">AI-Notes</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">It is a connected workspace where<br/>
      better, faster work happens</h3>
      <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-5 rounded-lg mt-8">Learn More</button>
    </div>
  );
};

export default Heading;
