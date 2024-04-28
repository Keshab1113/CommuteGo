

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../store/auth";
import profilePhoto from "/Profile.png";

const AdminProfile = () => {
  const [image, setImage] = useState("");
  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setPview] = useState(false);
  const { user } = useAuth();

  const profileFinal = profile.map((item) => item.pview);

  const onClose = () => {
    setPview(null);
  };
  const onCrop = (view) => {
    setPview(view);
  };
  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setImageCrop(false);
  };

  return (
    <div className=" flex justify-center items-center pt-[8vh]">
    <div className="bg-[#ff574a] h-[80vh] sm:w-[40%] rounded-2xl w-full flex flex-col items-center my-[6vh] border">
      <div className=" h-[42%] w-full flex flex-col justify-center items-center bg-[#ff574a] dark:bg-slate-800 rounded-t-2xl">
        <div className=" h-14 w-full border-b border-white flex justify-center pt-4 pb-4 shadow-2xl shadow-white dark:shadow-slate-600 dark:border-slate-600 ">
          <h1 className=" font-extrabold pb-2 px-6 w-[90%] text-white">
            Profile
          </h1>
        </div>
        <div className=" mt-2  h-full w-full flex justify-center items-center">
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid white",
            }}
            src={profileFinal.length ? profileFinal : profilePhoto}
            alt=""
          />
        </div>
        
        
      </div>
      <div className=" w-full h-[58%] px-6 py-4 bg-slate-100 rounded-t-2xl rounded-b-2xl">
        <div className="flex justify-between items-center mt-4 border-b pb-2 border-white">
          <h1 className=" font-semibold ">
            UserName: {user.username}
          </h1>
          <EditIcon className=" cursor-pointer" />
        </div>
        <div className="flex justify-between items-center mt-4 border-b pb-2 border-white">
          <h1 className=" font-semibold">
            Email: {user.email}
          </h1>
          <EditIcon className=" cursor-pointer" />
        </div>
        <div className="flex justify-between items-center mt-4 border-b pb-2 border-white">
          <h1 className=" font-semibold ">Address: Jalpaiguri, India</h1>
          <EditIcon className=" cursor-pointer" />
        </div>
        <div className="flex justify-between items-center mt-4 border-b pb-2 border-white ">
          <h1 className=" font-semibold ">Admin: Yes</h1>
          <EditIcon className=" cursor-pointer" />
        </div>
        <div className=" w-full flex justify-end mt-4">
          <button className=" bg-[#ff574a] px-4 py-1 border border-white mr-4 text-white rounded-full">
            Save
          </button>
          <button className="bg-[#ff574a] px-4 border border-white text-white rounded-full">
            more
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminProfile;

