import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";

const BusDataEdit = () => {
    const [data, setData] = useState({
        name: "",
        from: "",
        to: "",
        route: "",
    });
    const navigate = useNavigate();

    const params = useParams();
    const { authorizationToken } = useAuth();
    const getSingleBusData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setData(data);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleBusData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    // to udpate the data dynamically
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/busdata/update/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                toast.success("Updated successfully");
                navigate(-1);
            } else {
                toast.error("Not Updated ");
            }
        } catch (error) {
            console.log(error);
        }
    };

  return (
      <section className="  h-screen w-full flex justify-center items-center bg-black bg-grid-white/[0.2]">
          <div className="  md:w-[40%] w-[90vw] glass mt-[8vh] md:p-10 p-6 overflow-hidden rounded-2xl">
              <div className=" mb-10">
                  <h1 className=" text-4xl font-bold text-white">Update Details</h1>
              </div>
              <div className=" grid grid-two-cols  h-full">
                  <section className="flex flex-col">
                      <form onSubmit={handleSubmit} className=" ">
                          <div className="flex flex-col">
                              <label htmlFor="name" className=" font-bold mt-2 mb-2 capitalize text-white">name</label>
                              <input
                                  type="text"
                                  className=" outline-none border border-black rounded-xl px-4 py-2 h-fit text-[15px]"
                                  name="name"
                                  id="name"
                                  autoComplete="off"
                                  value={data.name}
                                  onChange={handleInput}
                                  required
                              />
                          </div>

                          <div className="flex flex-col">
                              <label htmlFor="email" className=" font-bold mt-2 mb-2 capitalize text-white">from</label>
                              <input
                                  type="text"
                                  className=" outline-none border border-black rounded-xl px-4 py-2 h-fit text-[15px]"
                                  name="from"
                                  id="from"
                                  autoComplete="off"
                                  value={data.from}
                                  onChange={handleInput}
                                  required
                              />
                          </div>
                          <div className="flex flex-col">
                              <label htmlFor="phone" className=" font-bold mt-2 mb-2 capitalize text-white">to</label>
                              <input
                                  type="text"
                                  className=" outline-none border border-black rounded-xl px-4 py-2 h-fit text-[15px]"
                                  name="to"
                                  id="to"
                                  autoComplete="off"
                                  value={data.to}
                                  onChange={handleInput}
                                  required
                              />
                          </div>
                          <div className="flex flex-col">
                              <label htmlFor="message" className=" font-bold mt-2 mb-2 capitalize text-white">route</label>
                              <textarea
                                  rows="3"
                                  className=" outline-none border border-black rounded-xl px-4 py-2 text-[15px]"
                                  name="route"
                                  id="route"
                                  autoComplete="off"
                                  value={data.route}
                                  onChange={handleInput}
                              />
                          </div>


                          <div className=" mt-2 mb-2 flex justify-center items-center w-full">
                              <button type="submit" className=" px-10 py-2 hover:border rounded-xl bg-blue-800 text-white">Update</button>
                          </div>
                      </form>
                  </section>
              </div>
          </div>
      </section>
  )
}

export default BusDataEdit
