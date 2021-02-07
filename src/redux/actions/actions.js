import { LOGGED_USER } from '../actionsNames.js';
import { LOG_OUT } from '../actionsNames.js';

export function LoggedUser(payload) {
    return { 
        type: LOGGED_USER,
        payload  
    };
};

export function Logout() {
    return { 
        type: LOG_OUT,  
    };
}; 