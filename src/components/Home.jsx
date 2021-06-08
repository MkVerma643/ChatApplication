import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Users from "./Users";
import { connect } from "react-redux";
import io from "socket.io-client";

const socket = io("http://localhost:7000");
function Chat(props) {
  if (props.isloggedin != true) {
    props.history.push("/");
  }
  console.log("chatssss", props);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [yourID, setYourID] = useState();
  const [people, setPeople] = useState([]);
  console.log("chatttttsssss",chat)
  useEffect(() => {
    socket.on("yourid", (id) => {
      setYourID(id);
    });

    socket.on("listen-client", (user) => {
      console.log("new online user found.....", user);
      setPeople([...people, user]);
    });

    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    const msgData = {
      msg: message,
      id: props.user.id,
      time: new Date(),
    };
    socket.emit("message", msgData);
    setMessage("");
  };

  return (
    <>
      <div class="container">
        <h3 class=" text-center">My id..{props?.user?.name}</h3>
        <div class="messaging">
          <div class="inbox_msg">
            <Users people={people} />
            <div class="mesgs">
              <div class="msg_history">
                {chat.map((msg) => {
                  if (msg.id === props.user.id) {
                    return (
                      <div class="outgoing_msg" key={msg.id}>
                        <div class="sent_msg">
                          <p>{msg.msg}</p>
                          <span class="time_date"> {msg.time}</span>{" "}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div class="incoming_msg" key={msg.id}>
                        <div class="incoming_msg_img">
                          <AccountCircleIcon />
                        </div>
                        <div class="received_msg">
                          <div class="received_withd_msg">
                            <p> {msg.msg}</p>
                            <span class="time_date">{msg.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <form onSubmit={sendMessage}>
                    <input
                      type="text"
                      name="message"
                      placeholder="Type message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      required
                    ></input>
                    <button class="msg_send_btn">
                      <SendIcon style={{ color: "#fff" }} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect((state, props) => {
  return {
    user: state?.user,
    isloggedin: state?.isloggedin,
  };
})(Chat);
