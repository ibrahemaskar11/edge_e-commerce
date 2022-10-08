import React from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { AiOutlineRight, AiOutlineCopyrightCircle } from "react-icons/ai";
function Footer() {
  return (
    <footer
      name="footer"
      className="w-full bg-gray-100 border-t-2  text-[#2d2d2d] py-0 lg:py-8 px-4"
    >
      <div className="max-w-[1148px] mx-auto grid grid-cols-2 lg:grid-cols-5 border-b-2 text-start space-y-4 lg:space-y-0 sm:text-start border-gray-600 py-8 ">
        <div className="col-span-2 sm:col-span-1">
          <h3 className="tracking-[0.4px] text-[15px] cursor-default mb-2 font-[700] uppercase">
            HELP
          </h3>
          <ul className="text-gray-500 tracking-[0.4px] text-[13px] pl-2 font-bold flex lg:flex-col space-x-4 lg:space-x-0 justify-start">
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                FAQ
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Track orders
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Returns
              </a>
            </li>

            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Delivery
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Gift card
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h3 className="tracking-[0.4px] text-[15px] cursor-default mb-2 font-[700] uppercase">
            BUSINESS
          </h3>
          <ul className="text-gray-500 tracking-[0.4px] text-[13px] pl-2 font-bold flex lg:flex-col space-x-4 lg:space-x-0 justify-start">
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                About us
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                store locator
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                franchise
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                work with us
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h3 className="tracking-[0.4px] text-[15px] cursor-default mb-2 font-[700] uppercase">
            Legal
          </h3>
          <ul className="text-gray-500 tracking-[0.4px] text-[13px] pl-2 font-bold flex lg:flex-col space-x-4 lg:space-x-0 justify-start">
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Claims
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Privacy
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Terms
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Policies
              </a>
            </li>
            <li className="py-1">
              <a href="#" className="hover:text-gray-700">
                Conditions
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <div>
            <h3 className="tracking-[0.4px] text-[15px] cursor-default mb-2 font-[700] uppercase ">
              Payment Methods
            </h3>
            <ul className="text-gray-500 tracking-[0.4px] text-[13px] font-bold grid grid-cols-4  pl-2 lg:pl-0">
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/2.svg?202209190200041283910901"
                  alt="MasterCard"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/90.svg?202209190200041283910901"
                  alt="Teacher"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/3.svg?202209190200041283910901"
                  alt="AMEX"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/8.svg?202209190200041283910901"
                  alt="PayPal"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/29.svg?202209190200041283910901"
                  alt="ApplePay"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/9.svg?202209190200041283910901"
                  alt="gift card"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/72.svg?202209190200041283910901"
                  alt="PostPay"
                />
              </li>
              <li className="p-1">
                <img
                  src="https://static.pullandbear.net/2/static2/itxwebstandard/images/payment/101.svg?202209190200041283910901"
                  alt="GooglePay"
                />
              </li>
            </ul>
          </div>
          <div className="flex flex-col mt-6">
            <h3 className="tracking-[0.4px] text-[15px] cursor-default font-[700] uppercase ">
              Be The First To Know
            </h3>
            <div
              className={
                "flex justify-center items-center border-b-2  lg:hover:border-black outline-b-2"
              }
            >
              <input
                type="text"
                placeholder="SUBSCRIBE TO OUR NEWSLETTER"
                className="bg-transparent placehodler:text-black
                 text-whie py-2 placeholder:cursor-white placeholder:font-semibold placeholder:capitalize outline-none w-full text-start placeholder:tracking-[0.175rem] font-semibold mr-2 outline-border-b-2 "
              />
              <button>
                <AiOutlineRight size="24" className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1148px] mx-auto flex flex-col md:flex-row px-4 py-2 justify-center items-center text-center sm:justify-between text-[#222] ">
        <p className="py-4 tracking-[0.4px] text-[13px] lg:text-[15px] cursor-default mb-2 font-[500] capitalize flex items-center">
          <AiOutlineCopyrightCircle className="mt-[1px] mr-1" />
          Copyright
          <span>
            <a
              className="ml-1 hover:text-gray-600"
              target="_blank"
              href="https://twitter.com/ibrahim_askar11"
            >
              Ibrahim Askar
            </a>
          </span>
          , All Rights Reserved
        </p>
        <div className="flex flex-row justify-center items-center space-x-4 sm:py-4 text-2xl text-black/80">
          <a href="https://github.com/ibrahemaskar11" target="_blank">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ibrahimaskar11/" target="_blank">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/ibrahim_askar11" target="_blank">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
