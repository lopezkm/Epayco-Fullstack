import { LOGGED_USER, LOG_OUT, ADD_MONEY, CONFIRMATION_CODE, SUBSTRACT_MONEY } from '../actionsNames.js';


const initialState = {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
	documentNumber: '',
	phoneNumber:'',
	balance: 0,
	shopCode: 0,
	isLogged: false
}

function Reducer(state = initialState, action) {
  switch ( action.type )
	{
		case LOGGED_USER:
			const {id, firstName, lastName, email, documentNumber, phoneNumber, balance} = action.payload;
			return {
				...state,
				id,
				firstName,
				lastName,
				email,
				documentNumber,
				phoneNumber,
				balance,
				shopCode: 0,
				isLogged: true
			};
		
		 case LOG_OUT:
			
			return {
				...state,
				id: '',
				firstName: '',
				lastName: '',
				email: '',
				documentNumber: '',
				phoneNumber:'',
				balance: 0,
				shopCode: 0,
				isLogged: false
			};

		case ADD_MONEY:
		
			return {
				...state,
				balance: action.payload
			};
		
		case SUBSTRACT_MONEY:
	
			return {
				...state,
				balance: action.payload
			};

		case CONFIRMATION_CODE:
	
			return {
				...state,
				shopCode: action.payload
			};
       
		default:
			
			return state;
	}
} 
export default Reducer;