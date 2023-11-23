import React, { useState } from "react";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Data } from "../assets/Data";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className=" bg-[#C0C2C9] h-min flex flex-col justify-center items-center">
      <div className=" bg-white h-20 w-11/12 sm:w-2/3 mt-[-40px] rounded-xl z-20 flex justify-center items-center resser">
        <div className="  h-20 flex flex-row justify-center items-center w-1/4 rounded-l-xl">
          <DepartureBoardIcon />
          <input
            type="text"
            placeholder="From"
            className=" h-20 outline-none font-semibold pl-3 w-5/6 text-xl"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <hr />
        <div className="  h-20 flex flex-row justify-center items-center w-1/4 border-l-2">
          <DepartureBoardIcon />
          <input
            type="text"
            placeholder="To"
            className=" h-20 outline-none font-semibold pl-3 w-5/6 text-xl"
          />
        </div>
        <div className=" h-20 flex flex-row justify-center items-center w-1/4 border-l-2">
          <CalendarMonthIcon />
          <input
            type="date"
            name=""
            id=""
            className=" h-20 outline-none font-semibold"
          />
        </div>
        <button className=" w-1/4 bg-slate-700 h-20 rounded-r-xl font-serif text-xl text-white ">
          Search
        </button>
      </div>

      <div className=" max-sm:p-4 w-full sm:w-full bg-[#C0C2C9] h-min flex flex-col justify-center items-center pt-10 max-sm:overflow-x-scroll">

        <TableContainer component={Paper} sx={{backgroundColor: "#C0C2C9"}}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Bus Name</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Route</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Data.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.from.toLowerCase().includes(search);
            }).map((item) => (
                <TableRow
                  key={Data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.from}</TableCell>
                  <TableCell align="center">{item.to}</TableCell>
                  <TableCell align="center">{item.route}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Search;
