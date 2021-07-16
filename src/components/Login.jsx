import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import socket from "./socket";
import { login } from "../reduxstore/thunk";
import immer from "immer";
function Login(props) {
  const [user, setUser] = useState();
  // const [yourID, setYourID] = useState()
  // console.log("login props",props)
  function joinCallback(messages, room) {
    console.log("aaaa", messages, room);
    const newMessages = immer(messages, (draft) => {
      draft[room] = room;
    });
    props.dispatch({
      type: "MESSAGE",
      payload: newMessages,
    });
  }

  let submitHandle = (e) => {
    e.preventDefault();
    socket.emit("join", user);
    socket.emit("join room", "general");
    props.dispatch(login(user));
    // socket.emit("Join",userData)

    props.history.push("/chat");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <form onSubmit={submitHandle} style={{ width: 500 }}>
            <h2 className="text-center">Hop In</h2>
            <label htmlFor="Username" style={{ fontSize: 20, marginRight: 10 }}>
              Username:{" "}
            </label>
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Username"
            />
            <br />
            <button className="bth btn-dark form-control">Join</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect(function (state, props) {
  return {
    logged: state?.isloggedin,
    messages: state?.messages,
  };
})(Login);
