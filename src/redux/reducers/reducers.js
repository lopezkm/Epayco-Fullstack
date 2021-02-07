import { LOGGED_USER, LOG_OUT } from '../actionsNames.js';


const initialState = {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
	documentNumber: '',
	phoneNumber:'',
	balance:'',
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
				isLogged: false
			}
       
		default:
			
			return state;
	}
} 
export default Reducer;