import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
let socket;
let name;
export default function Chat() {
  const BackendURL = "https://chatappserver-ocdw.onrender.com";
  const [mailString] = useSearchParams();

  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [activeUser, setActiveUser] = useState([]);

  useEffect(() => {
    socket = io(BackendURL);

    name = mailString.get("name");
    const room = mailString.get("room");

    setUser(name);
    setRoom(room);

    socket.emit("join", { name: name, room: room }, (err) => {
      if (err) {
        alert(err);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("message=>>>>>>  ", msg);
      setMessage((prevMsg) => [...prevMsg, msg]);

      setActiveUser((activeUsers) => activeUsers);

      setTimeout(() => {
        var scrollDiv = document.getElementById("scroll");

        scrollDiv.scrollTop = scrollDiv.scrollHeight;

        console.log("msggg", message);
        console.log("SOCKET : ", socket);
      }, 1000);
    });
  }, []);

  useEffect(() => {
    socket.on("activeusers", (activeUsers) => {
      setActiveUser(activeUsers);
      console.log("Active users :", activeUsers);
    });
  }, [activeUser]);

  const sendMessage = (e) => {
    console.log("Ss3s", socket);

    e.preventDefault();

    socket.emit("sendMsg", userMsg, () => {
      setUserMsg("");

      setTimeout(() => {
        let scrollDiv = document.getElementById("scroll");

        scrollDiv.scrollTop = scrollDiv.scrollHeight;
        console.log("SD", scrollDiv.scrollTop);
      }, 1000);
    });
  };

  return (
    <div className="mainbox w-full shadow-lg rounded-lg   bg-gray-100">
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="text-indigo-500 font-serif text-3xl font-bold ">
          Quick chat
        </div>

        <div className="text-5xl font-light font-sans ">
          <span> {room} </span>
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=random`}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>

      <div className="sub flex flex-row justify-between bg-white subbox">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div className="flex justify-center font-bold text-gray-400 bg-green-200 sticky top-0 left-0 right-0 z-10">
            ACTIVE USERS{" "}
          </div>

          <div className=" overflow-y-auto activeuser scrollbar-thin scrollbar-thumb-gray-200  ">
            {activeUser.map((activeUser, Idx) => {
              return (
                <>
                  {activeUser.username !== name && (
                    <div key={Idx}>
                      <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                        <div className="w-1/4 relative">
                          <img
                            src={`https://ui-avatars.com/api/?name=${activeUser.username}&background=random`}
                            className="object-cover h-12 w-12 rounded-full"
                            alt=""
                          />
                          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full">
                            {" "}
                          </span>
                        </div>
                        <div className="w-full flex justify-around space-between">
                          <div className="text-lg font-semibold ">
                            {activeUser.username}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>

        <div className="w-full px-5 flex flex-col justify-between bg-gray-100">
          <div
            id="scroll"
            className="flex flex-col overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200  chatroom"
          >
            {message.map((msg, idx) => (
              <>
                {msg.user == "admin" ? (
                  <>
                    {" "}
                    <div className="w-full bg-gray-200 flex justify-center rounded-lg my-2">
                      <span> Admin</span>
                    </div>
                    <div key={idx} className="flex justify-center mb-4">
                      <div className=" py-1 px-2  rounded-2xl text-black bg-green-200">
                        {JSON.parse(JSON.stringify(msg.text))}
                      </div>
                    </div>
                    <hr />
                  </>
                ) : msg.user === user ? (
                  <div key={idx} className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black bg-green-200">
                      {JSON.parse(JSON.stringify(msg.text))}
                    </div>
                    <div className="user-img-name flex flex-col">
                      {" "}
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <p className="text-gray-500"> {msg.user}</p>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="flex justify-start mb-4">
                    <div className="user-img-name flex flex-col">
                      {" "}
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <p className="text-gray-500"> {msg.user}</p>
                    </div>
                    <div className="mx-2 py-3 px-4 bg-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                      {JSON.parse(JSON.stringify(msg.text))}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>

          <div className="py-5 flex">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
              placeholder="type your message here..."
            />
            <div
              onClick={(e)=>sendMessage(e) }
            className="btn bg-green-400 mx-4 w-20 h-10 self-center rounded-full text-center py-2 font-bold text-gray-900 cursor-pointer">
              {" "}SEND 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
