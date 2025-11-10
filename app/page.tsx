import Feedback from "./components/Feedback/Feedback";
import NewArrivals from "./components/NewArrivals/NewArrivals";
import TopSelling from "./components/TopSelling/TopSelling";

export default function Home() {
  return (
    <div className="text-black max-w-[1350px] mx-auto px-4 md:px-3">
      <TopSelling></TopSelling>
      <NewArrivals></NewArrivals>
      <Feedback></Feedback>
    </div>
  );
}
