import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className=" lg:flex justify-center  md:h-screen bg-gray-200  ">
      <div className="box1   bg-gray-200  md:space-y ">
        <div className="flex justify-center lg:mt-52  p-5   text-indigo-500 font-serif text-8xl font-bold ">
          Quick chat
        </div>

        <div className=" logintext  text-3xl  p-5 flex justify-center">
          {" "}
          Make you conversation quick . . .
        </div>
      </div>

      <div className="box2 md:h-96 flex-1 lg:mt-34 md:my-40   lg:mx-36  md:w-full md:max-w-full md:min-w-96    shadow-2xl rounded-2xl bg-white">
        <div className="logo flex justify-center ">
          <img
            className="limg rounded-md "
            src="https://seeklogo.com/images/C/chatcoin-chat-logo-D655A30A39-seeklogo.com.png"
            alt=""
          />
        </div>

        <h1 className="font-thin text-2xl text-center mb-3">
          Login to your Account
        </h1>

        <div className="box  md:mx-auto md:w-mdall md:max-w-md ">
          <form className="space-y-6" action="#" method="POST">
            <div className="inp">
              <label
                htmlFor={"user"}
                className="block text-md font-medium leading-6 text-gray-900"
              >
                User name
              </label>
                <input
                  id={"user"}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  placeholder=" Enter your name"
                  required
                  className="border p-2 my-1  sm:w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300"
                  />
              </div>

            <div className="">
              <label
                htmlFor="room"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Room
              </label>
              <input
                id="room"
                onChange={(e) => setRoom(e.target.value)}
                type="text"
                placeholder=" Enter your room name"
                required
                className=" border my-1 sm:w-full rounded-md p-2 placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <Link className="flex justify-center "
              onClick={(e) => (!user || !room ? e.preventDefault() : null)}
              to={`/chat?name=${user}&room=${room}`}
            >
              <button
                type="submit"
                className=" bg-gray-400   p-2  rounded  border-none font-thin text-base text-white cursor-pointer"
              > Log in </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
