import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";

function Users(props) {
console.log("asd",props.people)


  return (
    <>
      <div class="inbox_people">
        <div class="headind_srch">
          <div class="recent_heading">
            <h4>Recent</h4>
          </div>
          <div class="srch_bar">
            <div class="stylish-input-group">
              <input type="text" class="search-bar" placeholder="Search" />
              <span class="input-group-addon">
                <button type="button">
                  {" "}
                  <i class="fa fa-search" aria-hidden="true"></i>{" "}
                </button>
              </span>{" "}
            </div>
          </div>
        </div>
        <div class="inbox_chat">
          {/* <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <AccountCircleIcon/> </div>
                <div class="chat_ib">
                  <h5>Arish Azmat <span class="chat_date">0</span></h5>
                  <p>some text.</p>
                </div>
              </div>
            </div> */}
          {props.people.length > 0? props.people.map((user) => {
          // if(props.user.name != user.name){
            return (<div class="chat_list" key={user.id}>
              <div class="chat_people">
                <div class="chat_img"> <AccountCircleIcon/> </div>
                <div class="chat_ib">
                  <h5>{props.user.name === user.name? "Private":user.name} <span class="chat_date">0</span></h5>
                  <p>ID: {user.id}</p>
                </div>
              </div>
            </div>)
          // }
          }) : ''}
        </div>
      </div>
    </>
  );
}

export default connect(function(state,props){
  return {
    user: state?.user
  }
})(Users);
