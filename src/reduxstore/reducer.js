import React from 'react'

const reducerFun = (state = {messages : {general: []}}, action) => {
    switch(action.type){
        case "ENTER":{ 
            console.log("hit meeeee",action)
            state = {...state}
            state["isloggedin"] = true 
            state["user"] = action.payload
            return state
        }
        case "CURRENT CHAT":{
            state = {...state}
            state['CurrentChat'] = action.payload
            // console.log("ressducer....",state["CurrentChat"])
            return state
        }
        case "MESSAGES": {
            console.log("hahahhhaa",action)
            state = {...state}
            state['messages'] = action.payload
            return state
        }
        case "USERS": {
            state = {...state}
            state["allusers"] = action.payload
            return state
        }
        
    }
}

export default reducerFun
