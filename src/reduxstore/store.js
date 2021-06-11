import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import {logger} from "./middleware"
import thunk from 'redux-thunk'

var middleware = applyMiddleware(logger, thunk)

export default createStore(reducer,middleware)