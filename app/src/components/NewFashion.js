import React from "react";
import NewFashionImages from "./NewFashionImages";
import ImageSlider from "./ImageSlider";
import NewFashionImagesMedium from "./NewFashionImagesMedium";
import { Link } from "react-router-dom";
const menImages = [
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195027/Men_Hero_11_xt9dwm.jpg",
    _id: "633c656195807e610a14c642",
    description: "Short Sleeve Distortion T-shirt",
    price: "12.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195024/Men_Hero_39_v9tz23.jpg",
    _id: "633c656195807e610a14c63b",
    description: "Regular Fit Short Sleeve T-Shirt With Photo Print",
    price: "12.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195025/Men_Hero_37_qtquks.jpg",
    _id: "633c656195807e610a14c63c",
    description: "Short sleeve polo shirt with Gothic print",
    price: "14.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195035/Men_Hero_36_obxkv4.jpg",
    _id: "633c656195807e610a14c63d",
    description: "Jujutsu Kaisen Black T-shirt",
    price: "19.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195027/Men_Hero_41_seszwr.jpg",
    _id: "633c656195807e610a14c63e",
    description: "Long sleeve printed overshirt",
    price: "32.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195028/Men_Hero_13_eiazx1.jpg",
    _id: "633c656195807e610a14c63f",
    description: "Short Sleeve Mount Hokousai T-shirt",
    price: "15.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195021/Men_Hero_31_oj0jlc.jpg",
    _id: "633c656195807e610a14c640",
    description: "Regular fit short sleeve T-shirt with contrast thread",
    price: "15.99",
  },

  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195027/Men_Hero_44_dmzlsp.jpg",
    _id: "633c656195807e610a14c641",
    description: "Loose fit pleated overshirt with long sleeves",
    price: "35.99",
  },
];
const WomenImages = [
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195071/Women_Hero_22_wtpuzo.jpg",
    _id: "633c656195807e610a14c643",
    description: "Long sleeve satin shirt",
    price: "29.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195072/Women_Hero_20_hnuzux.jpg",
    _id: "633c656195807e610a14c644",
    description: "Sleaveless drapped Top",
    price: "27.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195077/Women_Hero_37_pvmgkb.jpg",
    _id: "633c656195807e610a14c645",
    description: "Cross-over halter neck top",
    price: "15.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195088/Women_Hero_21_vkvhcq.jpg",
    _id: "633c656195807e610a14c64c",
    description: "Straight-Leg High Waist Jeans",
    price: "35.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195050/Women_Hero_2_bjg4vh.jpg",
    _id: "633c656195807e610a14c647",
    description: "AC/DC Cropped T-shirt",
    price: "15.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195055/Women_Hero_3_fkrhwm.jpg",
    _id: "633c656195807e610a14c648",
    description: "Short sleeve T-shirt with a gothic print",
    price: "17.99",
  },
  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195077/Women_Hero_38_istekj.jpg",
    _id: "633c656195807e610a14c649",
    description: "Polo collar top with buttons",
    price: "17.99",
  },

  {
    src: "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195074/Women_Hero_29_tgjbiq.jpg",
    _id: "633c656195807e610a14c64b",
    description: "Long sleeve cropped fitted satin shirt",
    price: "29.99",
  },
];
const NewFashion = () => {
  return (
    <section id="trending-now" className="w-full bg-gray-100 border-b-2 overflow-hidden">
      <div
        className="py-4 lg:py-16 mx-auto flex flex-col justify-center items-center
      text-center"
      >
        <h1 className="hidden lg:block text-5xl tracking-[0.3rem] superior mb-8">
          Men Fashion Highlights
        </h1>
        <h1 className="lg:hidden text-4xl tracking-[0.3rem] superior mb-8 mt-4">
          Summer Fashion Highlights
        </h1>
        {/* <h3 className="hidden lg:block text-2xl tracking-widest text-black/90 hover:text-gray-600 hover:border-gray-600 border-b-2 border-black/90 py-2 capitalize mb-8  superior">
          <a href="#">Shop Men</a>
        </h3> */}
        <div className="hidden over lg:block mb-8 ">
          <NewFashionImages pageSrc="men" images={menImages} duration={10000} />
        </div>
        {/* <h3 className="hidden lg:block text-2xl tracking-widest text-black/90 hover:text-gray-600 hover:border-gray-600 border-b-2 border-black/90 py-2 capitalize mb-8  superior">
          <a href="#">Shop Women</a>
        </h3> */}
        <h1 className="hidden lg:block text-5xl tracking-[0.3rem] superior mb-8">
          Women Fashion Highlights
        </h1>
        <div className="hidden lg:block">
          <NewFashionImages pageSrc="women" images={WomenImages} duration={10000} />
        </div>

        <div className="hidden sm:block lg:hidden">
          <NewFashionImagesMedium pageSrc="men" images={menImages} duration={10000} />
        </div>
        <div className="sm:hidden  mb-8 lg:mb-0 relative ">
          <ImageSlider  pageSrc="men" slides={menImages} showArrows={true} duration={4000} />
        </div>
        <h3 className="lg:hidden text-2xl tracking-widest text-black/90 hover:text-gray-600 hover:border-gray-600 border-b-2 border-black/90 py-2 capitalize mb-8  superior">
          <Link to="/men/">Shop Men</Link>
        </h3>

        <div className="hidden sm:block lg:hidden">
          <NewFashionImagesMedium pageSrc="women" images={WomenImages} duration={10000} />
        </div>
        <div className="sm:hidden  mb-8 lg:mb-0 relative">
          <ImageSlider pageSrc="women" slides={WomenImages} showArrows={true} duration={4000} />
        </div>
        <h3 className="lg:hidden text-2xl tracking-widest text-black/90 hover:text-gray-600 hover:border-gray-600 border-b-2 border-black/90 py-2 capitalize mb-8  superior">
          <Link to="/women/">Shop Women</Link>
        </h3>
      </div>
    </section>
  );
};

export default NewFashion;
