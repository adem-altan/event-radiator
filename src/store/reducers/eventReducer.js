const initialState = {
    events: []
};

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_EVENT":
            return {
                //...state,
                //events: action.events
            }
        case "ADD_EVENT_ERROR":
            console.log('add event error', action.err);
            return state;
        default: 
            return  state;
    }
};

export default eventReducer