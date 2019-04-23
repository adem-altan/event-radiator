
// const initialState = {
//     events: []
// };

// const rootReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case "ADD_EVENT":
//             return {
//                 ...state,
//                 //events: action.events
//             }
//         case "ADD_EVENT_ERROR":
//             console.log('add event error', action.err);
//             return state;
//         default: 
//             return  state;
//     }
// };

// export default rootReducer


import eventReducer from './eventReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
const rootReducer = combineReducers({
    event: eventReducer,
    firestore: firestoreReducer
});

export default rootReducer
