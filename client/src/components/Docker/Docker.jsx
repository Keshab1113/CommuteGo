import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconBusFilled
} from "@tabler/icons-react";
import { FaBusAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { FaTrainTram } from "react-icons/fa6";
import { BsAirplaneFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

export default function Docker() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Search Bus",
      icon: (
        <FaBusAlt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/bus",
    },
    {
      title: "Search Train",
      icon: (
        <FaTrainSubway className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Search Metro",
      icon: (
        <FaTrainTram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Search Plane",
      icon: (
        <BsAirplaneFill className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Search Metro",
      icon: (
        <FaTrainTram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    
  ];
  return (
    (<div className="md:flex hidden items-center justify-center h-fit md:w-full w-[80vw] fixed bottom-4 z-[1000]">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links} />
    </div>)
  );
}
