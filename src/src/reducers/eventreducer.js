import {ADD_EVENT,MODIFY_EVENT, ALL_EVENTS, MODIFY_VIEW,CANCEL_ACION} from '../actiontypes/actions'

const initialState = {
    events : [],
    eventType : '',
    event : ''
}

function eventReducer (state = initialState, action){
    console.log('reducer: action->',action)
    switch (action.type) {
        case ADD_EVENT: 
            return {...state, events : [...state.events, action.event]}
        case MODIFY_VIEW:
            return {...state,event:action.event,eventType:'modify'}
        case MODIFY_EVENT: 
            return {...state,event:action.event,eventType:'modify'}
        case ALL_EVENTS:
            return{...state, events:[...action.events]}
        case CANCEL_ACION:
            return{...state,event:{},eventType:''}
        default:
            return state;
    }
}

export default eventReducer;