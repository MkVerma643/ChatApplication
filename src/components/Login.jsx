import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'

const socket = io("http://localhost:7000");
function Login(props) {    
    const [user, setUser] = useState(); 
    const [yourID, setYourID] = useState()
    console.log("login props",props)
    
    useEffect(()=>{
        socket.on("yourid",id => {
            setYourID(id)
         })
    })

    let submitHandle = (e) =>{
        e.preventDefault()
        let userData = {
            name: user,
            id: yourID
        }
        socket.emit("join",userData)
        // socket.emit("Join",userData)
        props.dispatch({
            type:"USER",
            payload: userData
        })
        props.history.push('/chat')
       
    }
        
    

   
    return (
        <div className="container">
            <div className="row">
               <div className="col-md-3"></div>
               <div className="col-md-6">
               <form onSubmit={submitHandle} style={{width:500}}>
                    <h2 className="text-center">Hop In</h2>
                    <label for="Username" style={{fontSize:20, marginRight:10}}>Username: </label>
                    <input onChange={(e) =>setUser(e.target.value)} type="text" className="form-control" placeholder="Username"/>
                    <br/>
                    <button  class="bth btn-dark form-control">Join</button>
                </form>
               </div>
            </div>
        </div>
    )
}

export default connect(function(state,props){
    return {
        logged: state?.isloggedin
    }
})(Login)
