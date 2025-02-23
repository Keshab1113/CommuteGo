import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTrain,
  faBus,
  faTrainTram,
  faPlane,
  faUser,
  faPhone,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useAuth} from "../../store/auth"

const Footer = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  return (
    <div className=" w-full flex flex-col justify-center sm:h-[25rem] h-screen items-center">
      <video src="https://firebasestorage.googleapis.com/v0/b/commutego.appspot.com/o/vid-1.mp4?alt=media&token=9e0d74ce-78fb-4f37-9262-8ddd90881283" muted autoPlay loop className=" object-cover w-full sm:h-[25rem] h-full" />
      <footer className=" w-11/12 absolute flex flex-col glass p-6">
        <div className=" h-[80%] w-full flex sm:flex-row flex-col justify-center items-start">
          <div className="footerLinks">
            <h1 className="footerHeading">Quick Links</h1>
            <Link className="followlinks"><FontAwesomeIcon icon={faHouse} className="icons" />Home</Link>
            <Link to={'about'} className="followlinks"><FontAwesomeIcon icon={faUser} className="icons" />AboutUs</Link>
            <Link to={'contact'} className="followlinks"><FontAwesomeIcon icon={faPhone} className="icons" />ContactUs</Link>
            <Link to={'services'} className="followlinks"><FontAwesomeIcon icon={faCircleInfo} className="icons" />Services</Link>
            {isLoggedIn && user.isAdmin ? <Link to={'admin'} className="followlinks"><FontAwesomeIcon icon={faUser} className="icons" />Admin</Link> : <Link to={'login'} className="followlinks"><FontAwesomeIcon icon={faUser} className="icons" />Login</Link>
            }
            
            
          </div>
          <div className="footerLinks">
            <h1 className="footerHeading">Services</h1>
            <Link to={'bus'} className="followlinks"><FontAwesomeIcon icon={faBus} className="icons" />Bus</Link>
            <Link className="followlinks"><FontAwesomeIcon icon={faTrain} className="icons" />Train</Link>
            <Link className="followlinks"><FontAwesomeIcon icon={faTrainTram} className="icons" />Metro</Link>
            <Link className="followlinks"><FontAwesomeIcon icon={faPlane} className="icons" />Flight</Link>
            <Link className="followlinks"><FontAwesomeIcon icon={faTrainTram} className="icons" />Tram</Link>
          </div>
          <div className="footerLinks">
            <h1 className="footerHeading">Follow Us</h1>
            <Link className="followlinks"><FaFacebook className="icons" />Facebook</Link>
            <Link className="followlinks"><FaWhatsapp className="icons" />Whatsapp</Link>
            <Link className="followlinks"><FaLinkedin className="icons" />Linkedin</Link>
            <Link className="followlinks"><FaTwitter className="icons" />Twitter</Link>
          </div>
          <div className="footerLinks">
            <h1 className="footerHeading">About this Page</h1>
            <p>CommuteGo is a team of dedicated members, who are passionate about Indian
              Transportation Systems.</p>
          </div>
        </div>
        <div className="h-[20%] w-full border-t">
          <p className=" text-[17px] text-white mt-3 flex justify-center font-semibold">
            © 2023 CommuteGo.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
