import { NEW_REGISTERED, NEW_PROYECT, ID_LOGUED, FINISHED_PROYECT, DELETE_USER } from '../actionsNames.js';

export function newRegistered(payload) {
    return { 
        type: NEW_REGISTERED, 
        payload 
    };
};
  
export function newProyect(payload) {
    return { 
        type: NEW_PROYECT, 
        payload 
    };
};

export function idLogued(payload) {
    return { 
        type: ID_LOGUED,
        payload  
    };
};

export function finishedProyect(payload) {
    return { 
        type: FINISHED_PROYECT, 
        payload 
    };
};

export function deleteUser(payload) {
    return { 
        type: DELETE_USER,  
        payload
    };
};

