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

export const deleteEvent = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('events').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_EVENT', id });
        }).catch((err) => {
            dispatch({ type: 'DELETE_EVENT_ERROR', err});
        });
    }
};

export const editEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('events').doc(event.id).update({
            name: event.name
        }).then(() => {
            dispatch({ type: 'EDIT_EVENT', event });
        }).catch((err) => {
            dispatch({ type: 'EDIT_EVENT_ERROR', err});
        })
    }
}