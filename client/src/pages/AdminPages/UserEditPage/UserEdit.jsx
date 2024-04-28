import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";

const UserEdit = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        isAdmin: "",
    });
    const navigate = useNavigate();

    const params = useParams();
    // console.log("params single user: ", params);
    const { authorizationToken } = useAuth();

    //   get single user data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            // console.log(`users single data:  ${data}`);
            setData(data);

            //   if (response.ok) {
            //     getAllUsersData();
            //   }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
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
                `http://localhost:5000/api/admin/users/update/${params.id}`,
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
        <section className=" bg-slate-600 h-screen w-full flex justify-center items-center">
            <div className=" h-[22rem] w-[40%] bg-slate-400 p-4 overflow-hidden">
            <div className="">
                <h1 className=" text-4xl font-bold">Update User Data</h1>
            </div>
            <div className=" grid grid-two-cols  h-full">
                    <section className="flex flex-col">
                    <form onSubmit={handleSubmit} className=" ">
                            <div className="flex flex-col">
                            <label htmlFor="username" className=" font-bold mt-2 mb-2 capitalize">username</label>
                            <input
                                    type="text"
                                    className=" outline-none border border-black rounded-xl px-4 h-8"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}
                                required
                            />
                        </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className=" font-bold mt-2 mb-2 capitalize">email</label>
                            <input
                                    type="email"
                                    className=" outline-none border border-black rounded-xl px-4 h-8"
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput}
                                required
                            />
                        </div>

                            <div className="flex flex-col">
                                <label htmlFor="isAdmin" className=" font-bold mt-2 mb-2 capitalize">IsAdmin</label>
                            <input
                                type="text"
                                    name="isAdmin"
                                    className=" outline-none border border-black rounded-xl px-4 h-8"
                                id="isAdmin"
                                autoComplete="off"
                                value={data.isAdmin}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div className=" mt-2 mb-2 flex justify-center items-center w-full">
                            <button type="submit" className=" px-4 hover:border rounded-xl bg-blue-800 text-white">Update</button>
                        </div>
                    </form>
                </section>
                </div>
            </div>
        </section>
    );
};



// import React from 'react'



// const UserEdit = () => {
//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setData({
//             ...data,
//             [name]: value,
//         });
//     };
//   return (
//       <div>
//               <h1>
//                   Update User Details
//               </h1>
//               <div className=' flex  flex-col h-full  justify-around w-full'>
//                   <div className=' w-full  py-2'>
//                       <h1 className=' font-bold mb-2'>Username</h1>
//                   <input
//                       onChange={handleInput} type="text"
//                       value={curUsers.username}
//                       name="username" id="username"
//                       className=' border px-4 border-black outline-none rounded-xl w-full h-10'
//                       autoComplete='off'
//                       required
                      
//                   />
//                   </div>
//                   <div className=' w-full  py-2'>
//                       <h1 className=' font-bold mb-2'>Email</h1>
//                       <input type="text" value={curUsers.email} name="" id="" className=' border px-4 border-black outline-none rounded-xl w-full h-10' />
//                   </div>
//                   <div className=' w-full  py-2'>
//                       <h1 className=' font-bold mb-2'>Is Admin</h1>
//                       <input type="text" value={curUsers.isAdmin} name="" id="" className=' border px-4 border-black outline-none rounded-xl w-full h-10' />
//                   </div>
//                   <button className=' border px-4 border-black bg-blue-700 hover:bg-indigo-800 text-white w-full h-10 rounded-xl mb-6'>Submit</button>
//               </div>
//       </div>
//   )
// }

export default UserEdit
