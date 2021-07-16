// import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import immer from "immer";
import React, { Component } from "react";

export class Users extends Component {
  constructor(props) {
    super(props);
  }

  SetGeneralChat = () => {
    // console.log("room set")
    this.props.dispatch({
      type: "CURRENT CHAT",
      payload: {
        isChannel: true,
        chatName: "general",
        receiverId: "",
      },
    });
  };

  SetUserChat = (user) => {
    this.props.dispatch({
      type: "CURRENT CHAT",
      payload: {
        isChannel: false,
        chatName: user.name,
        receiverId: user.id,
      },
    });
    //  console.log("checkkkk......",this.props.currentChat.chatName)
    if (!this.props.messages[user.name]) {
      // console.log("set krunnn....")
      let newMessages = immer(this.props.messages, (draft) => {
        draft[user.name] = [];
      });
      this.props.dispatch({
        type: "MESSAGES",
        payload: newMessages,
      });
      // console.log("user set",newMessages)
    }
  };
  render() {
    return (
      <>
        <div className="inbox_people">
          <div className="headind_srch">
            <div className="recent_heading">
              <h4>Group</h4>
            </div>
          </div>
          <div className="inbox_chat">
            <div className="chat_list" onClick={this.SetGeneralChat}>
              <div className="chat_people">
                <div className="chat_img">
                  {" "}
                  <AccountCircleIcon />{" "}
                </div>
                <div className="chat_ib">
                  <h5>
                    General <span className="chat_date">0</span>
                  </h5>
                  <p>Messages on this receives by everyone</p>
                </div>
              </div>
            </div>
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Online</h4>
              </div>
            </div>
            {this.props?.allusers?.map((user) => {
              if (this.props.user != user.name) {
                return (
                  <div
                    className="chat_list"
                    key={user.id}
                    onClick={() => this.SetUserChat(user)}
                  >
                    <div className="chat_people">
                      <div className="chat_img">
                        {" "}
                        <AccountCircleIcon />{" "}
                      </div>
                      <div className="chat_ib">
                        <h5>
                          {user.name} <span className="chat_date">0</span>
                        </h5>
                        <p>ID: {user.id}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  }
}

export default connect(function (state, props) {
  return {
    user: state?.user,
    allusers: state?.allusers,
    messages: state?.messages,
    currentChat: state?.CurrentChat,
  };
})(Users);
