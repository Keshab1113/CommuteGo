

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../store/auth";
import profilePhoto from "/Profile.png";
import { LampContainer } from "../../../components/ui/lamp";

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
    <div className=" flex justify-center items-center pt-[8vh] bg-black">
      <LampContainer>
        <h1 className=" text-6xl font-extrabold pb-2 px-6  text-white">
        {user.username}
        </h1>
        <div className=" w-full text-white text-center">
            <h1 className=" font-semibold mt-4  pb-2">
              Email: {user.email}
            </h1>
            <h1 className=" font-semibold mt-4  pb-2">Admin: Yes</h1>
        </div>
      </LampContainer>
    </div>
  );
};

export default AdminProfile;

