import React, { useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { TfiGallery } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { useRef } from "react";
const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Parent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [val,setVal] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const sellerId = "teacher";
    socketId.emit("addUser", sellerId);
    socketId.on("getUsers", (data) => {
    });
  }, []);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setVal("");
    const message = {
      sender: "parent",
      text: newMessage,
    };
    const receiverId = "teacher";

    socketId.emit("sendMessage", {
      senderId: "parent",
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`http://localhost:8000/api/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

    // get messages
    useEffect(() => {
      const getMessage = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/message/get-all-messages`
          );
          setMessages(response.data.messages);
        } catch (error) {
          console.log(error);
        }
      };
      getMessage();
    }, [sendMessageHandler]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);


  return (
    <div className="w-[full] min-h-full flex flex-col justify-between p-5">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Teacher</h1>
            <h1>{"Active Now"}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          // onClick={() => setOpen(false)}
        />
      </div>

      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                className={`flex w-full my-2 ${
                  item.sender === "parent" ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== "parent" && (
                  <img
                    src=""
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item?.images && (
                  <img
                    src=""
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                  />
                )}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${
                        item.sender === "parent" ? "bg-[#000]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                    >
                      <p>{item.text}</p>
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={val}
            onChange={(e) => {
              setVal(e.target.value)
              setNewMessage(e.target.value)
            }}
            className="w-full border p-1 rounded-[5px]"
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Parent;
