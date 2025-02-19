import React from "react";
import Buses from "../component/Bus/Buses";
import GoTop from "../component/GoTop";
import ShowCase from "../component/ShowCase.jsx";
import Destinition from "../component/Flight/Destinition.jsx";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

const BusPage = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Buses />
      <ShowCase />
      <Destinition />
      <GoTop />
    </div>
  );
};

export default BusPage;
