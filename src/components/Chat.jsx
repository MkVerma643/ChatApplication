import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Users from "./Users";
import { connect } from "react-redux";
import socket from './socket'
import immer from "immer";
import  ScrollMePlease from "react-scrollable-feed"

// const socketRef = useRef()

function Chat(props) {
  // console.log("yrssss",props?.messages? props.message[props?.currentChat?.chatName]: "j")
  if(!props.isloggedin){
    props.history.push('/')
  }
  socket.on("newuser",(allusers) => {
    props.dispatch({
      type:"USERS",
      payload:allusers
    })
    
})
 

  const [message, setMessage] = useState("")
  
  socket.on("new-client", (allusers) => {
    console.log("new online user found.....", allusers);
    props.dispatch({
      type: "USERS",
      payload: allusers
    })
  });
  socket.on("new message",({content, sender,chatName}) => {
    const newMessages = immer(props.messages,draft => {
      if(draft[chatName]) {
        draft[chatName].push({content, sender})
      }
      else {
        draft[chatName] = [{content, sender}]
      }
      

    })
    // console.log("new message received",newMessages)
    props.dispatch({
      type: "MESSAGES",
      payload: newMessages
    })
  })

  const sendMessage = (e) => {
    e.preventDefault()
    const payload = {
      content: message,
      to: props.currentChat.isChannel? props.currentChat.chatName : props.currentChat.receiverId,
      sender: props.user,
      chatName: props.currentChat.chatName,
      isChannel: props.currentChat.isChannel
    }
    socket.emit("send message", payload)
    const newMessages = immer(props.messages, draft => {
      draft[props.currentChat.chatName].push({
        sender:props.user, 
        content: message
      })
    })
    props.dispatch({
      type: "MESSAGES",
      payload:newMessages
    })
      setMessage("")
  }
  return (
    <>
      <div class="container">
        <h3 class=" text-center">Welcome {props.user}</h3>
        <div class="messaging">
          <div class="inbox_msg">
            <Users  />
            <div class="mesgs">
              <h4> <AccountCircleIcon fontSize={'large'}/>{props?.currentChat?.chatName}</h4>
              <div class="msg_history">
               <ScrollMePlease>
               {props?.messages[props?.currentChat?.chatName] && props?.messages[props.currentChat.chatName].map((each,index) => {
                    if(each.sender === props?.user){
                      return (
                      <div class="outgoing_msg">
                      <div class="sent_msg">
                        <p>{each.content}</p>
                        <span class="time_date"> {each.sender}</span>{" "}
                      </div>
                    </div>
                    )
                    }
                    else {
                      return (
                        <div class="incoming_msg">
                        <div class="incoming_msg_img">
                          <AccountCircleIcon />
                        </div>
                        <div class="received_msg">
                          <div class="received_withd_msg">
                            <p>{each.content}</p>
                            <span class="time_date"> {each.sender}</span>
                          </div>
                        </div>
                      </div>
                      )
                    }
                  
                })}
               </ScrollMePlease>
             
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
              <form onSubmit={sendMessage} >
              <input
                    type="text"
                    class="write_msg"
                    name="msg"
                    value={message}
                    onChange={(e) =>setMessage(e.target.value)}
                    placeholder="Type a message"
                  />
                  <button  class="msg_send_btn">
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

export default connect((state,props) =>{
  return {
    user : state?.user,
    messages: state?.messages,
    allusers: state?.allusers,
    isloggedin:state?.isloggedin,
    currentChat:state?.CurrentChat
  }
})(Chat);
