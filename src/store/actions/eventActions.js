export const addEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('events').add({
            ...event
        }).then(() => {
             dispatch({ type: 'ADD_EVENT', event });
        }).catch((err) => {
            dispatch({ type: 'ADD_EVENT_ERROR', err});
        })
    }
};