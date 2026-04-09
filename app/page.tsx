import CategorySection from "@/components/CategoryCartd";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainSlider from "@/components/MainSlider";

const Home = () => {
  return (
    <div>
      <div className="bg-[oklch(37%_0.013_285.805_/_0.6)]">
        <Header />
        <MainSlider />
        <CategorySection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
