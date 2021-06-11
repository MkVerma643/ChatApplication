// import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import immer from 'immer'
import React, { Component } from 'react'

export class Users extends Component {

  constructor(props){
    super(props)
  }

   SetGeneralChat = () => {
    console.log("room set")
    this.props.dispatch({
      type: "CURRENT CHAT",
      payload: {
        isChannel: true,
        chatName: "general",
        receiverId: ""
      }
    })
  }

   SetUserChat = user => {
     console.log("checkkkk......",this.props.messages[this.props.currentChat.chatName])
    if(this.props.messages[this.props.currentChat.chatName] === null){
      console.log("set krunnn....")
      const newMessages = immer(this.props.messages, draft => {
        draft[this.props.currentChat.chatName] = []
      })
      console.log("set krunnn....")
      this.props.dispatch({
        type:"MESSAGE",
        payload: newMessages
      })
    }
    console.log("user set",user)
    this.props.dispatch({
      type: "CURRENT CHAT",
      payload: {
        isChannel: false,
        chatName: user.name,
        receiverId: user.id
      }
    })
  }
  render() {
    return (
      <>
      <div class="inbox_people">
        <div class="headind_srch">
          <div class="recent_heading">
            <h4>Group</h4>
          </div>
        </div>
        <div class="inbox_chat">
        <div class="chat_list" onClick={this.SetGeneralChat}>
                      <div class="chat_people">
                        <div class="chat_img">
                          {" "}
                          <AccountCircleIcon />{" "}
                        </div>
                        <div class="chat_ib">
                          <h5>
                            General <span class="chat_date">0</span>
                          </h5>
                          <p>Messages on this receives by everyone</p>
                        </div>
                      </div>
                    </div>
                    <div class="headind_srch">
          <div class="recent_heading">
            <h4>Online</h4>
          </div>
        </div>
          {this.props?.allusers?.map((user) => {
                if (this.props.user != user.name) {
                  return (
                    <div class="chat_list" key={user.id} onClick={() => this.SetUserChat(user)}>
                      <div class="chat_people">
                        <div class="chat_img">
                          {" "}
                          <AccountCircleIcon />{" "}
                        </div>
                        <div class="chat_ib">
                          <h5>
                            {user.name} <span class="chat_date">0</span>
                          </h5>
                          <p>ID: {user.id}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            }
        </div>
      </div>
    </>
    )
  }
}

export default connect(function (state, props) {
  return {
    user: state?.user,
    allusers:state?.allusers,
    messages:state?.messages,
    currentChat: state?.CurrentChat
  };
})(Users);
