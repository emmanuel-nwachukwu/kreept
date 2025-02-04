import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

// import logo from "../../images/logo.png";
import logo from "../../images/kreept/kreept-white-no-bg.png";

import { useState, useEffect, useContext } from "react";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";

const NavBarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  useEffect(() => {
    if (!toggleMenu) {
      setAnimateOut(true);
      setTimeout(() => setAnimateOut(false), 200); // Ensure this matches the animation duration
    }
  }, [toggleMenu]);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}

        {currentAccount ? (
          <button className="bg-blue-600 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-blue-700">
            {shortenAddress(currentAccount)}
          </button>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            className="bg-blue-600 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-blue-700">
            Sign In
          </button>
        )}
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}

        {(toggleMenu || animateOut) && (
          <ul
            className={`z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism ${
                toggleMenu ? "animate-slide-in" : "animate-slide-out"
              }
            `}>
            <li className="text-xl w-full my-2 cursor-pointer">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Wallets"].map((item, index) => (
              <NavBarItem
                key={item + index}
                title={item}
                classProps="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
