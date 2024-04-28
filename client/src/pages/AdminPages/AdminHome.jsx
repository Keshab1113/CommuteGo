import React, { useEffect, useState } from "react";
import axios from "axios";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import TroubleshootSharpIcon from "@mui/icons-material/TroubleshootSharp";
import AreaChart from "../../component/AdminComponents/AreaChart"
import BarChart from "../../component/AdminComponents/BarChart"

const AdminHome = () => {
  const [numberOfSystem, setNumberOfSystem] = useState();
  const [numberOfOnline, setNumberOfOnline] = useState();
  const [numberOfOffline, setNumberOfOffline] = useState();
  const [numberOfUnknown, setNumberOfUnknown] = useState();

  // useEffect(() => {
  //   const SystemData = async () => {
  //     try {
  //       const response2 = await axios.post(
  //         "http://localhost:5000/api/home/homeData"
  //       );
  //       const data2 = await response2.data.data;
  //       var TotalLength = data2.length;
  //       setNumberOfSystem(TotalLength < 10 ? "0" + TotalLength : TotalLength);
  //       var countOnline = 0;
  //       var countOffline = 0;
  //       data2.map((i) => {
  //         if (i.isOnline == true) {
  //           countOnline++;
  //         } else if (i.isOnline == false) {
  //           countOffline++;
  //         }
  //       });
  //       var countUnknown = data2.length - (countOnline + countOffline);
  //       setNumberOfOnline(countOnline < 10 ? "0" + countOnline : countOnline);
  //       setNumberOfOffline(
  //         countOffline < 10 ? "0" + countOffline : countOffline
  //       );
  //       setNumberOfUnknown(
  //         countUnknown < 10 ? "0" + countUnknown : countUnknown
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   SystemData();
  // }, []);

  return (
    <div className=" bg-slate-100 h-[100vh] pt-[8vh] w-full flex justify-center flex-col items-center">
      <div className=" sm:h-[26vh] h-min sm:flex justify-between items-center gap-2 w-[90%]">
        <div className=" bg-white dark:bg-slate-900 sm:w-[30%] h-[15vh] sm:h-[70%] rounded-xl pr-4 pt-2 mt-2 sm:mt-0">
          <div className="w-full text-end">
            <button className=" bg-blue-700 rounded-3xl px-4 py-[4px] text-white text-sm">
              Manage
            </button>
          </div>
          <div className="flex ml-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
              <KitchenIcon className="text-blue-700 " />
            </div>
            <div className="flex flex-col ml-4 ">
              <h1 className="font-semibold text-black  dark:text-white">
                Total User(s)
              </h1>
              <h1 className="text-xl font-semibold text-blue-700 w-full">
                100
              </h1>
            </div>
          </div>
        </div>
        <div className=" bg-white dark:bg-slate-900  sm:w-[30%] w-[100%] h-[15vh] sm:h-[70%] rounded-xl pr-4 pt-2 mt-2 sm:mt-0">
          <div className="w-full  text-end">
            <button className=" bg-yellow-500 rounded-3xl px-4 py-[4px] text-white text-sm">
              Manage
            </button>
          </div>
          <div className="flex ml-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
              <ScreenSearchDesktopIcon className="text-yellow-600 " />
            </div>
            <div className="flex flex-col ml-4 ">
              <h1 className="font-semibold  dark:text-white">
                Total BusData(s)
              </h1>
              <h1 className="text-xl font-semibold text-yellow-600 w-full">
                800
              </h1>
            </div>
          </div>
        </div>
        <div className=" bg-white dark:bg-slate-900 sm:w-[30%] w-[100%] h-[15vh] sm:h-[70%] rounded-xl pr-4 pt-2 mt-2 sm:mt-0">
          <div className="w-full  text-end">
            <button className=" bg-red-600 rounded-3xl px-4 py-[4px] text-white text-sm">
              Manage
            </button>
          </div>
          <div className="flex ml-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
              <TroubleshootSharpIcon className="text-red-600 " />
            </div>
            <div className="flex flex-col ml-4 ">
              <h1 className="font-semibold  dark:text-white">
                Total Feedback(s)
              </h1>
              <h1 className="text-xl font-semibold text-red-600 w-full">
                20
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[90%]  h-[66vh] flex gap-4 justify-center items-center ">
        <div className=" w-[50%] h-[80%] border p-6 bg-white">
          <AreaChart />
        </div>
        <div className=" w-[50%] h-[80%] border p-6 bg-white">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
