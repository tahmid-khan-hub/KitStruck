import NewArrivals from "./components/NewArrivals/NewArrivals";
import Retro from "./components/Retro/Retro";
import Review from "./components/Review/Review";
import TopSelling from "./components/TopSelling/TopSelling";

export default function Home() {
  return (
    <div className="text-black  px-4 md:px-3">
      <TopSelling></TopSelling>
      <NewArrivals></NewArrivals>
      <Retro></Retro>
      <Review></Review>
    </div>
  );
}
