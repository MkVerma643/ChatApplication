import React from "react";
import SendIcon from "@material-ui/icons/Send";
import "./App.css";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";
import { connect } from "react-redux";
import io from 'socket.io-client'
import { BrowserRouter, Route , useHistory} from "react-router-dom";



function App(props) {
  
  return (
    
    <>
      <nav className="navbar navbar-dark bg-dark p-2 ">
        <a className="navbar-brand" href="#">
          Chat Application
        </a>
      </nav>
      <BrowserRouter>
        <Route exact path="/chat" component={ props.isloggedin? Chat : Login}></Route>
        <Route exact path="/" component={Login}></Route>
      </BrowserRouter>
      {/* <Home/> */}
        {/* {
          props.isloggedin?  <Home/> :  <Login/> 
        } */}
    </>
  );
}

export default connect(function(state,props){
  console.log("state",state)
  return {
    isloggedin: state?.isloggedin
  }
})(App);
