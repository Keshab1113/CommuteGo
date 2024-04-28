import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faRoute,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../../index.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Aos from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../../store/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const { busdata } = useAuth();
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("HOWRAH");
  const [fromvalue, setFvalue] = useState("JADAVPUR");
  const [open, setOpen] = useState(false);
  const [sopen, setSopen] = useState(false);
  const [stopen, setStopen] = useState(false);

  const [searchFrom, setSearchfrom] = useState("");
  const [searchTo, setSearchto] = useState("");
  const [searchName, setSearchname] = useState("");
  const [searchRoute, setSearchroute] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const onChange = (event, uniqueValues) => {
    setStopen(true);
    setValue(event.target.value);
  };
  const onFchange = (event) => {
    setFvalue(event.target.value);
    setSopen(true);
    uniqueValue();
    
  };
  const onSearch = (searchTerm) => {
    setStopen(false);
    setValue(searchTerm);
  };
  const onFsearch = (searchFterm) => {
    setSopen(false);
    setFvalue(searchFterm);
  };
  const Swap = () => {
    setValue(fromvalue);
    setFvalue(value);
  };

  const onButtonclick = (e) => {
    if (value == "" || fromvalue == "") {
      setOpen(false);
      toast.warn("Please Choose Your Destination");
    } else {
      setOpen(true);
      const result = busdata.filter(
        (item) => item.from === fromvalue && item.to === value
      );
      setResultSearch(result);
    }
    setSopen(false);
    setStopen(false);
  };

  const uniqueValue = (searchVal, destination) => {
    const result = busdata.filter((item) => {
      const desVal = item[destination].toLowerCase();
      const serVal = searchVal.toLowerCase();
      return desVal && serVal && desVal.startsWith(serVal);
    })
      .slice(0, 10)
      .filter(
        (item, i, arr) =>
          arr.findIndex((ele) => ele[destination] == item[destination]) === i
      );
    return result;
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="flex flex-col justify-center items-end h-screen w-full mb-10 busbackground">
      <ToastContainer
        position="top-center"
      />

      <div className="  h-[60%] w-full flex flex-col items-center pt-10">
        <h1 className=" sm:items-center text-center text-4xl font-bold mb-4">Search Your Destination Here</h1>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className=" bg-white h-20 w-11/12 sm:w-2/3 rounded-xl flex justify-center items-center resser shadow-lg shadow-cyan-500/50"
        >
          <div className="  h-20 flex flex-row justify-center items-center w-[33%] rounded-l-xl">
            <FontAwesomeIcon icon={faRoute} className=" text-violet-800" />
            <input
              type="text"
              value={fromvalue}
              onChange={onFchange}
              placeholder="Where From?"
              className="searchInputType"
            />
          </div>
          <div className="w-10 h-full text-xl flex justify-center items-center ">
            <span className=" w-[1px] h-full bg-slate-200"></span>
            <button
              onClick={() => Swap()}
              className=" fixed border h-1/2 bg-white w-10 rounded-[100%]"
            >
              <FontAwesomeIcon
                icon={faRightLeft}
                className=" text-violet-800 text-sm cursor-pointer"
              />
            </button>
          </div>
          <div className="  h-20 flex flex-row justify-center items-center w-[33%]">
            <FontAwesomeIcon
              icon={faMapLocationDot} className="text-violet-800"
            />
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Where To?"
              className="searchInputType"
            />
          </div>
          <button
            onClick={() => onButtonclick()}
            className="SearchButton"
          >
            Search
          </button>
        </div>
        <div className="dropdown w-11/12 sm:w-2/3 mb-2 flex z-20 mt-2">
          <div className=" bg-white text-black sm:w-[32%] w-2/4 flex flex-col justify-center items-center rounded h-min ">
            {sopen &&
              uniqueValue(fromvalue, "from").map((item) => (
                <div
                  onClick={() => onFsearch(item.from)}
                  className="dropdown-row cursor-pointer w-full justify-center items-center text-center text-xm mt-1 mb-1"
                  key={item.id}
                >
                  {item.from}
                </div>
              ))}
          </div>
          <div className=" bg-white text-black w-2/4 sm:w-[32%] ml-5 flex flex-col justify-center items-center rounded h-min ">
            {stopen &&
              uniqueValue(value, "to").map((item) => (
                <div
                  onClick={() => onSearch(item.to)}
                  className=" dropdown-row cursor-pointer  w-full justify-center items-center text-center text-xm mt-1 mb-1"
                  key={item.id}
                >
                  {item.to}
                </div>
              ))}
          </div>
        </div>

        <div className="w-full flex absolute top-[25rem] flex-col md:flex-row  justify-center">
          <div className=" w-full sm:w-11/12 mb-2">
            {open && (
              <div className=" max-sm:p-4 w-full sm:w-[99%]  rounded-xl  h-fit flex flex-col justify-center items-center  max-sm:overflow-x-scroll text-white">
                {resultSearch.length != 0 ? (
                  <TableContainer
                    component={Paper}
                    sx={{ backgroundColor: "white", color: "black" }}
                    className="removscrool"
                  >
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className="bg-gradient-to-r from-[#00093c] to-[#2d0b00]">
                          <TableCell
                            align="center"
                            sx={{ color: "white", fontWeight: "Bold" }}
                          >
                            Bus Name
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "white", fontWeight: "Bold" }}
                          >
                            From
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "white", fontWeight: "Bold" }}
                          >
                            To
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "white", fontWeight: "Bold" }}
                          >
                            Route
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {resultSearch.map((item) => {
                          const { id, name, from, to, route } = item;
                          return (
                            <TableRow
                              key={id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                  color: "#fff",
                                },
                              }}
                            >
                              <TableCell align="center" sx={{ color: "black" }}>
                                {name}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "black" }}>
                                {from}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "black" }}>
                                {to}
                              </TableCell>
                              <TableCell align="center" sx={{ color: "black" }}>
                                {route}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{searchName}</TableCell>
                          <TableCell align="center">{searchFrom}</TableCell>
                          <TableCell align="center">{searchTo}</TableCell>
                          <TableCell align="center">{searchRoute}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <h1 className=" text-xl text-white h-16 flex justify-center items-center bg-gradient-to-r from-[#00093c] to-[#2d0b00] w-full rounded-md">
                    Sorry, Bus not found in this route....
                  </h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
