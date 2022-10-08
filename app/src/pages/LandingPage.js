import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer";
import NewFashion from "../components/NewFashion";
import NewsLetter from "../components/NewsLetter";

const LandingPage = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0.675,
    initialInView: true,
  });
  return (
    <>
      <Navbar changeColor={!inView} isShadow={true} />
      <Hero refProp={ref} />
      <NewArrivals />
      <NewFashion />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default LandingPage;
