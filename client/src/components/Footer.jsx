// import logo from "../../images/logo.png";
import logo from "../../images/kreept/kreept-white-no-bg.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-base text-center mx-2 cursor-pointer">Market</p>
          <p className="text-base text-center mx-2 cursor-pointer">Exchange</p>
          <p className="text-base text-center mx-2 cursor-pointer">Wallets</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-sm text-center">Contact Us</p>
        <p className="text-sm text-center">emmax0121@gmail.com</p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5"></div>
      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-sm text-center">&copy; kreept 2025</p>
        <p className="text-sm text-center">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
Footer;
