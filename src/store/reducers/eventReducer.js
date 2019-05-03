const initialState = {
  events: [],
  singleEvent: {
    name: 'Single Event Name'
  },
  test: 'test'
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        //...state,
        events: state.events.concat([action.event])
      };
    case "ADD_EVENT_ERROR":
      console.log("add event error", action.err);
      return state;
    case "DELETE_EVENT":
      return {
        events: state.events.action.id
      }
    case "DELETE_EVENT_ERROR":
      console.log("delete event error", action.err);
      return state;
    case "EDIT_EVENT":
      return {
        events: state.events.concat([action.event])
      }
    case "EDIT_EVENT_ERROR":
      console.log("edit event error", action.err);
      return state;
    default:
      return state;
  }
};

export default eventReducer;
