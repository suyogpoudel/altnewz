import InputForm from "@/components/input-form";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center flex flex-col mb-10">
        <h1 className="text-3xl font-mono font-bold mb-5">
          Welcome to{" "}
          <span className="tracking-widest text-primary">ALTNEWZ</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          One headline. Five alternate timelines.
        </p>
      </div>

      <InputForm />
    </div>
  );
};

export default Home;
