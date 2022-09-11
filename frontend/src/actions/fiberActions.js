import axios from 'axios'
import {CABLES_REQUEST,CABLES_SUCCESS,CABLES_FAIL,FIBER_SPLICE_ADD, FIBER_SPLICE_REMOVE, FIBER_SPLICE_CLEAR, EVENT_CREATE_REQUEST,EVENT_CREATE_SUCCESS,EVENT_CREATE_FAIL} from '../constants/fiberConstants'

export const listCables= () => async(dispatch) => {
    try{
        
        dispatch({ type: CABLES_REQUEST })

        const {data} = await axios.get(`api/fibers/cables/`)

        dispatch({
            type: CABLES_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: CABLES_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }
}


export const addSplice = (cableid, cableid2, fiberList) => async (dispatch,getState) => {
    //const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: FIBER_SPLICE_ADD,
        payload: {
            cableid, 
            cableid2, 
            fiberList
        }
    })
    localStorage.setItem('fiberSplices',JSON.stringify(getState().Splices.splices))

}

export const removeSplice= (id) =>(dispatch,getState)  => {
    dispatch({
        type: FIBER_SPLICE_REMOVE,
        payload: id,
        
    })
    localStorage.setItem('fiberSplices',JSON.stringify(getState().Splices.splices))
}


export const createEvent = (event) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EVENT_CREATE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } =getState()
        
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.post(
            `/api/fibers/createEvent/`,
            event,
            config
        )
        dispatch({
            type: EVENT_CREATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: FIBER_SPLICE_CLEAR,
            payload:data
        })

        localStorage.removeItem('fiberSplices')

    }catch(error){
        dispatch({
            type: EVENT_CREATE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}
