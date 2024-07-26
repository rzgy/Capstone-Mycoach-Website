import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import bigPicture from "../src/Pics/3.png";
import { useMutation } from "@tanstack/react-query";
import { registerCoach } from "./api/Auth";
import UserContext from "./Context/UserContext";
import { Alert } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [coachInfo, setCoachInfo] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    image: null,
  });

  const [user, setUser] = useState(UserContext);

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => registerCoach(coachInfo),
    onSuccess: () => {
      setUser(true);
      console.log("success");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setCoachInfo({
          email: "",
          password: "",
          fullname: "",
          gender: "",
          image: null,
        });
      }, 5000);
      setIsLoading(false);
    },
    onError: () => {
      <Alert severity="error">Your registeration was not successful.</Alert>;
      setIsLoading(false);
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setCoachInfo((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setCoachInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    mutate();
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-[#182026] text-white font-serif"
      style={{ position: "relative" }}
    >
      {/* Blurred background image */}
      <img
        src="https://png.pngtree.com/png-vector/20220804/ourmid/pngtree-simple-blank-blue-background-vector-for-business-png-image_6098381.png"
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(100px)" /* Apply blur to the image */,
          zIndex: 1 /* Place it behind other content */,
        }}
      />

      <main className="w-full max-w-7xl text-center flex flex-col justify-start items-center mt-28 pt-4">
        <div className="text-5xl font-bold mb-5">
          <span className="text-white">Welcome to My</span>
          <span className="text-blue-300 ml-2">Coach</span>
        </div>
        <p className="text-2xl mb-5 text-white">
          where you can track all your athlete's improvement
        </p>
        <div className="relative mb-0 w-full w-2xl-md mb-0">
          <img
            src={bigPicture}
            alt="Logo"
            className="w-30 h-40 object-contain mx-auto rounded-lg"
          />
        </div>
      </main>

      {/* Registration Form */}
      <div className="z-10 flex justify-center items-center h-screen mt--10">
        <div className="bg-[#252526] p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-white text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={coachInfo.fullname}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={coachInfo.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-white text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={coachInfo.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-white text-sm font-bold mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={coachInfo.gender}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="none">Prefer not to say</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-white text-sm font-bold mb-2"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {show && (
              <Alert severity="success">
                Your registration was successful.
              </Alert>
            )}
            <button
              onClick={handleFormSubmit}
              type="submit"
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      {/* More About the App */}
      <section className="z-10 w-full py-10 bg-gray-500 rounded-lg mt-5 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto">
          <h2 className="text-3xl mb-5 text-[#252526]">What is MyCoach</h2>
          <p className="text-xl mb-5 text-[#252526]">
            Our innovative application revolutionizes the gym experience by
            providing gym players with a cutting-edge feature that allows them
            to seamlessly connect with their personal trainers. In addition to
            offering a diverse range of workout plans from experienced coaches,
            users can now engage with their trainers through interactive bar
            charts, real-time chat functionality, and a user-friendly interface
            for online communication. This pivotal feature enhances the coaching
            experience, enabling trainers to provide personalised guidance and
            motivation, while users can easily track their progress, ask
            questions, and stay connected with their fitness journey.
          </p>
        </div>
      </section>
      <div />
    </div>
  );
}

export default App;
