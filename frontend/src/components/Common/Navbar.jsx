import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
    <div className="bg-[#f6eec3]">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 bg-[#f6eec3]">
        {/* Left - Logo */}
        {/* <div>
          <Link to="/" className="text-2xl font-medium">
            Harmony Digits
          </Link>
        </div> */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Harmony Digits Logo"
              className="h-10 w-10 rounded-full border-2 border-green-600 shadow-sm"
            />
            {/* Optional: Show name on md+ screens (comment out if you want only icon) */}
            {/* <span className="hidden md:inline text-2xl font-medium pl-2">Harmony Digits</span> */}
          </Link>
        </div>
        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">

          <Link
            to="/collections/all?category=yantra"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Yantra
          </Link>
          <Link
            to="/collections/all?category=bracelet"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bracelet
          </Link>
          <Link
            to="/astrologer"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Booking
          </Link>
        </div>
        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
    </div>
      

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation  */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-[#f6eec3] shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"
    }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            {/* <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link> */}
            {/* <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link> */}
            <Link
              to="/collections/all?category=yantra"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              yantra
            </Link>
            <Link
              to="/collections/all?category=bracelet"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              bracelet
            </Link>
            <Link
              to="/astrologer"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Booking
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;
