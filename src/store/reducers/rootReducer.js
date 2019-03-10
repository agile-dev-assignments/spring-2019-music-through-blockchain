import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { authReducer } from '../reducers/authReducer'

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer
});

export default rootReducer