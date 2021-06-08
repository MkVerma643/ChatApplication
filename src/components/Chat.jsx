import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Users from "./Users";
import { connect } from "react-redux";
import io from 'socket.io-client'

const socket = io('http://localhost:7000')
const userName = 'User '+parseInt(Math.random()*10)

function Chat(props) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState()
  const [yourID, setYourID] = useState()
  const [people, setPeople] = useState()

  // console.log("your message",messages)

  useEffect(() =>{
   
    socket.on("yourid",id => {
       setYourID(id)
    })
    socket.on("message", (message)=> {
      receivedMessage(message)
    })

  },[])
  const receivedMessage = (message) => {
    setMessages(preMessage => [...preMessage, message])
  }
  
  const sendMessage = (e) => {
    e.preventDefault()
    console.log("you clicked the btn.....")
    const msgData = {
      msg: message,
      id: yourID
    }
    console.log("ye msg hai:",msgData)
    setMessage("")
    socket.on("send-message",msgData)
   
    socket.on("test",string => {
      console.log(string)
    })
    
  }
  const handleChange = (e) =>{
    // console.log("yahaaaaan",e.target.value)
    setMessage(e.target.value)
  }

  return (
    <>
      <div class="container">
        <h3 class=" text-center">My id...( {yourID} )</h3>
        <div class="messaging">
          <div class="inbox_msg">
            <Users  />
            <div class="mesgs">
              <div class="msg_history">
                {messages.map((each,index) => {
                    if(each.id === yourID){
                      return (
                      <div class="outgoing_msg">
                      <div class="sent_msg">
                        <p>Test which is a new approach to have all solutions</p>
                        <span class="time_date"> 11:01 AM | June 9</span>{" "}
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
                            <p>Test, is a new approach to have all sol</p>
                            <span class="time_date"> 11:01 AM | Yesterday</span>
                          </div>
                        </div>
                      </div>
                      )
                    }
                  
                })}
             
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
              <form onSubmit={sendMessage} >
              <input
                    type="text"
                    class="write_msg"
                    name="msg"
                    value={message}
                    onChange={handleChange}
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
    user : state?.user
  }
})(Chat);
