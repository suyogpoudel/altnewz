import { TextLoop } from "./ui/text-loop";

const stages = [
  "INTERCEPTING SIGNAL...",
  "LOCATING ALTERNATE TIMELINES...",
  "BREACHING DIMENSIONAL FIREWALL...",
  "DECODING PARALLEL BROADCASTS...",
  "STABILIZING FEED...",
  "BYPASSING TEMPORAL ENCRYPTION...",
  "NEGOTIATING WITH PARALLEL GOVERNMENTS...",
  "UNTANGLING CAUSALITY LOOPS...",
  "BRIBING INTERDIMENSIONAL CENSORS...",
  "REROUTING THROUGH COLLAPSED TIMELINE...",
  "TRANSLATING FROM ALTERNATE ENGLISH...",
  "SUPPRESSING PARADOX WARNINGS...",
  "RECOVERING CORRUPTED REALITIES...",
  "AWAITING CLEARANCE FROM TIMELINE BUREAU...",
  "THIS IS TAKING LONGER THAN EXPECTED...",
  "THE SIGNAL IS UNUSUALLY FAR AWAY...",
  "PLEASE DO NOT PANIC...",
  "ALMOST CERTAINLY FINE...",
  "STABILIZING FEED...",
];
const LoadingScreen = () => {
  return (
    <div className="fixed w-full h-full bg-background inset-0 flex justify-center items-center">
      <TextLoop
        className="overflow-y-clip"
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
      >
        {stages.map((stage, i) => (
          <p
            key={i}
            className="text-primary text-2xl font-mono font-semibold tracking-wider"
          >
            {stage}
          </p>
        ))}
      </TextLoop>
    </div>
  );
};

export default LoadingScreen;
