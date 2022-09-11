import {CABLES_REQUEST,CABLES_SUCCESS,CABLES_FAIL, FIBER_SPLICE_ADD, FIBER_SPLICE_REMOVE, FIBER_SPLICE_CLEAR,EVENT_CREATE_REQUEST,EVENT_CREATE_SUCCESS,EVENT_CREATE_FAIL} from '../constants/fiberConstants'

export const cableReducer = (state = {cables: []}, action)=>{
    switch(action.type){
        case CABLES_REQUEST:
            return {loading:true, cables: []}
        case CABLES_SUCCESS:
            return {loading:false, cables: action.payload.cables}
        case CABLES_FAIL:
            return {loading:false,error: action.payload}
        default:
            return state
    }
}

export const spliceReducer = (state={splices:[]}, action) => {
    switch(action.type){
        case FIBER_SPLICE_ADD:
            const item = action.payload
            //const existItem = state.splices.find(x => x.id === item.id) 
            // if(existItem){
            //     return{
            //         ...state,
            //         splices: state.splices.map(x =>
            //             x.id === existItem.id ? item : x
            //             )
            //     }}
            // else{
            return{
                ...state,
                splices:[...state.splices,item]
            }
            
        case FIBER_SPLICE_REMOVE:
            return{
                ...state,
                splices: state.splices.filter((x,i) => i !== action.payload),
            }
        case FIBER_SPLICE_CLEAR:
            return{
                ...state,
                splices:[]
            }
        default:
            return state
    }}


    export const eventCreateReducer =(state={},action) => {
        switch(action.type){
            case EVENT_CREATE_REQUEST:
                return{
                    loading:true
                }
            case EVENT_CREATE_SUCCESS:
                return{
                    loading:false,
                    success:true,
                    events:action.payload,
                }
            case EVENT_CREATE_FAIL:
                return{
                    loading:false,
                    error:action.payload,
                }
            default:
                return state
        }
    }