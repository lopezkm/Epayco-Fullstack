import { NEW_REGISTERED, ID_LOGUED, DELETE_USER } from '../actionsNames.js';


const initialState = {
  id:""
}

function Reducer(state = initialState, action) {
  switch ( action.type )
	{
		case NEW_REGISTERED:
		
			return {
				...state,
				registered: [ ...state.registered, action.payload ]
			};
		
		case ID_LOGUED:
			
			return {
				...state,
				id: action.payload
			}

		case DELETE_USER:
		
			return {
				...state,
				registered: state.registered.filter(user => user.id !== action.payload)
			}
       
		default:
			
			return state;
	}
} 
export default Reducer;