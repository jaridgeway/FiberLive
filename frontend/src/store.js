import {combineReducers,applyMiddleware} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {cableReducer,spliceReducer,eventCreateReducer,} from './reducers/fiberReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers';

const reducer =combineReducers({
    Cables:cableReducer,
    Splices:spliceReducer,
    userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
    eventCreate:eventCreateReducer
})

const SplicesFromStorage = localStorage.getItem('fiberSplices') ? JSON.parse(localStorage.getItem('fiberSplices')) : [];

const preloadedState={
    Splices: {
		splices: SplicesFromStorage,
	},
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  })

  export default store