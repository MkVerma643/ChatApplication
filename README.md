# Chat Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

This Project Doesn't have any database instead the required information is stored in the socket server itself. \

In the project directory, you can run: \


### `npm start` to start the react-front-end
### `node src/server/server.js` to start socket server



Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Enter Username in the browser '/' route
## `Public Chat & Person to Person Chat`
 There is a pre-defined general room to send messages to all active users which they can see. Send a custom message by selecting a user from a left panel

### `Sockets used in :`
 When a user visit (http://localhost:3000) a default room  (general) is assigned to the user 
 The users name is then stored the in users array inside server script which then emits the updated array to allusers and the front app stores it in a redux store
 On the left panel user can see the default public chat room (general) and Active users fetched from redux state
 When sending a message to general chat,the message gets broadcasted to all users
 On sending a message to a particular user the message emits from frontend and catches on server where it takes the user name matches with the server's allusers array and get its socket.id and sends the message to that particalar user


The page will reload if you make edits.\
You will also see any lint errors in the console.

