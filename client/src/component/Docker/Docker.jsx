import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrain,
    faBus,
    faTrainTram,
    faPlane,
    faHouse,
  } from "@fortawesome/free-solid-svg-icons";
import { Dock, DockIcon } from "../../components/magicui/dock";
import { shoot } from "../Header/Navbar";
import { useNavigate } from "react-router-dom";

export function Docker() {
    const navigate = useNavigate();
  return (
    <div className=" sticky bottom-2">
      <Dock direction="middle">
        <DockIcon onClick={()=>navigate("/bus")}>
          <FontAwesomeIcon icon={faBus} className=" " />
        </DockIcon>
        <DockIcon onClick={shoot}>
          <FontAwesomeIcon icon={faTrain} className=" " />
        </DockIcon>
        <DockIcon onClick={shoot}>
          <FontAwesomeIcon icon={faTrainTram} className=" " />
        </DockIcon>
        <DockIcon onClick={()=>navigate("/flight")}>
          <FontAwesomeIcon icon={faPlane} className="  rotate-[-90deg]" />
        </DockIcon>
        <DockIcon onClick={shoot}>
          <FontAwesomeIcon icon={faTrainTram} className=" " />
        </DockIcon>
      </Dock>
    </div>
  );
}