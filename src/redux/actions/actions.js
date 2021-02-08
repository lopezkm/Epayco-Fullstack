import { LOGGED_USER, LOG_OUT, ADD_MONEY, CONFIRMATION_CODE, SUBSTRACT_MONEY } from '../actionsNames.js';

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

export function MoneyAdded(payload) {
    return { 
        type: ADD_MONEY,  
        payload
    };
};

export function ShopCode(payload) {
    return {
        type: CONFIRMATION_CODE,
        payload
    }
};

export function MoneySubstracted(payload) {
    return {
        type: SUBSTRACT_MONEY,
        payload
    }
};
