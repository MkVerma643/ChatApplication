import React from 'react'

const reducerFun = (state, action) => {
    switch(action.type){
        case "USER":{ 
            state = {...state}
            state["isloggedin"] = true 
            state["user"] = action.payload
            console.log("reducer state",state)
            return state
        }
    }
}

export default reducerFun
