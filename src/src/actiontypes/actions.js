

export const ADD_EVENT = 'ADD_EVENT';
export const MODIFY_EVENT = 'MODIFY_EVENT';
export const ALL_EVENTS = 'ALL_EVENTS';
export const MODIFY_VIEW = 'MODIFY_VIEW';
export const CANCEL_ACION = 'CANCEL_ACION';

export function addEvent (event) {
    return {
        type: ADD_EVENT,
        event: event
    }
}


export function modifyEvent (event) {
    return {
        type: MODIFY_EVENT,
        event: event
    }
}

export function modificaView (event) {
    return {
        type: MODIFY_VIEW,
        event: event
    }
}

export function allEvents (events) {
    return {
        type: ALL_EVENTS,
        events: events
    }
}

export function cancelAction () {
    return {
        type: CANCEL_ACION
    }
}

