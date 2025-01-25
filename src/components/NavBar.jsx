import React, { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isMenuopen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuopen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const list = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
    hidden: { opacity: 0 },
};

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100, transition: { duration: 0.5 } },  // Adjust exit duration here
};
  return (
    <>
      <div>
        <div className="flex items-center justify-between px-8 md:flex md:justify-around md:items-center shadow-md py-4">
          <Link to="/">
            <h1 className="text-2xl sm:text-4xl font-semibold">Stockfolio</h1>
          </Link>
          <div className=" hidden md:flex md:gap-10 lg:gap-16 items-center">
            <NavLink to="/" className="hover:underline">
              <h1 className="font-semibold">Dashboard</h1>
            </NavLink>
            <NavLink to="/add" className="hover:underline">
              <h1 className="font-semibold">Add</h1>
            </NavLink>
            <NavLink to="/stocks" className="hover:underline">
              <h1 className="font-semibold">Stocks</h1>
            </NavLink>
            <NavLink to="/portfolio" className="hover:underline">
              <h1 className="font-semibold">Portfolio</h1>
            </NavLink>
            <NavLink to="/price" className="hover:underline">
              <h1 className="font-semibold">Price</h1>
            </NavLink>
          </div>

          <div onClick={toggleMenu} className="md:hidden">
            {
              isMenuopen?<IoMdClose size={30} />:<IoMdMenu size={30} />
            }
            
            
          </div>
        </div>

        <AnimatePresence>
        {isMenuopen ? (
          <motion.div className="flex md:hidden flex-col items-center pt-4 gap-3" initial="hidden"
          animate="visible"
          exit="hidden"
          variants={list}>
            <motion.div variants={item}>
            <NavLink  to="/" onClick={handleMenuClick}>
              <h1 className="font-semibold">Dashboard</h1>
            </NavLink>
            </motion.div>
            <motion.div variants={item}>
            <NavLink  to="/add" onClick={handleMenuClick}>
              <h1 className="font-semibold">Add</h1>
            </NavLink>
            </motion.div>
            <motion.div variants={item}>
            <NavLink  to="/stocks" onClick={handleMenuClick}>
              <h1 className="font-semibold">Stocks</h1>
            </NavLink>
            </motion.div>
            <motion.div variants={item}>
            <NavLink  to="/portfolio" onClick={handleMenuClick}>
              <h1 className="font-semibold">Portfolio</h1>
            </NavLink>
            </motion.div>
            <motion.div variants={item}>
            <NavLink  to="/price" onClick={handleMenuClick}>
              <h1 className="font-semibold">Price</h1>
            </NavLink>
            </motion.div>
          </motion.div>
        ) : (
          ""
        )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavBar;