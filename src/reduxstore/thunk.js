export function login (user){
    return function(dispatch, getState){
        // dispatch({
        //     type: "CURRENT CHAT",
        //     payload: {
        //       isChannel: true,
        //       chatName: "general",
        //       receiverId: ""
        //     }
        //   })
          dispatch({
            type:"ENTER",
            payload: user
        })
    }
}
