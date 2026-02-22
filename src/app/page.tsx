import InputForm from "@/components/input-form";
import LoadingScreen from "@/components/loading-screen";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center flex flex-col mb-10">
        <h1 className="text-3xl font-mono font-bold mb-5">
          Welcome to{" "}
          <span className="tracking-widest text-primary">ALTNEWZ</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Enter a news headline and get 5 wild new alternate timeline news
          stories
        </p>
      </div>

      <InputForm />
    </div>
  );
};

export default Home;
