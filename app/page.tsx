import CategorySection from "@/components/CategoryCartd";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainSlider from "@/components/MainSlider";

const Home = () => {
  return (
    <div className="bg-[oklch(37%_0.013_285.805_/_0.6)]">
      <div className="pt-16">
        <Header />
        <MainSlider />
        <CategorySection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
