import Feedback from "./components/Feedback/Feedback";
import TopRated from "./components/TopRated/TopRated";
import Trending from "./components/Trending/Trending";

export default function Home() {
  return (
    <div className="text-black max-w-[1350px] mx-auto px-4 md:px-3">
      <Trending></Trending>
      <TopRated></TopRated>
      <Feedback></Feedback>
    </div>
  );
}
