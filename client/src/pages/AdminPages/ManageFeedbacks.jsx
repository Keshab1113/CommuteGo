import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const ManageFeedbacks = () => {
    const [data, setData] = useState({
        fullname: "",
        email: "",
        phone: "",
        message: "",
        isDone: "",
    });
    const navigate = useNavigate();

    const params = useParams();
    const { authorizationToken } = useAuth();
    const getSingleFeedBackData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/feedback/${params.id}`, {
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
        getSingleFeedBackData();
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
                `${import.meta.env.VITE_API_URL}/api/admin/feedback/update/${params.id}`,
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
            <div className="  w-[40%] bg-slate-400 mt-[8vh] p-4 overflow-hidden">
                <div className="">
                    <h1 className=" text-4xl font-bold">Update FeedBack Data</h1>
                </div>
                <div className=" grid grid-two-cols  h-full">
                    <section className="flex flex-col">
                        <form onSubmit={handleSubmit} className=" ">
                            <div className="flex flex-col">
                                <label htmlFor="fullname" className=" font-bold mt-2 mb-2 capitalize">fullname</label>
                                <input
                                    type="text"
                                    className=" outline-none border border-black rounded-xl px-4 h-8"
                                    name="fullname"
                                    id="fullname"
                                    autoComplete="off"
                                    value={data.fullname}
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
                                <label htmlFor="phone" className=" font-bold mt-2 mb-2 capitalize">phone</label>
                                <input
                                    type="phone"
                                    className=" outline-none border border-black rounded-xl px-4 h-8"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="message" className=" font-bold mt-2 mb-2 capitalize">message</label>
                                <textarea
                                    rows="3"
                                    className=" outline-none border border-black rounded-xl px-4"
                                    name="message"
                                    id="message"
                                    autoComplete="off"
                                    value={data.message}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="isDone" className=" font-bold mt-2 mb-2 capitalize">isDone</label>
                                <input
                                    type="text"
                                    name="isDone"
                                    className=" outline-none border border-black rounded-xl px-4 h-8"
                                    id="isDone"
                                    autoComplete="off"
                                    value={data.isDone}
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


export default ManageFeedbacks
