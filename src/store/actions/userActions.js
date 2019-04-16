import { userService } from '../../server/userDbActions'
import { showMessage } from './globalActions'
import {songService} from "../../server/songDbActions";
import {updateSong} from "./songActions";
 

/**
 * Set user profile
 */
export const getUserInfo = (userId) => {
    return (dispatch, getState, {getFirebase}) => {
      const state = getState()
      const uid = state.firebase.auth.uid
      const stream = state.song.stream
  
        return userService.dbGetUserInfo(userId).then((result) => {
          dispatch(setUserProfile(result))
        })
          .catch((error) => {
            dispatch(showMessage(error.message))
          })
  
    }
  }

export  const setUserProfile = (user) => {
    return {
        type: 'SET_USER',
        payload: user
}}

export const dbEditProfile = (updatedProfile, image, imageName, callBack) => {
    return (dispatch, getState, {getFirebase}) => {
        console.log("dbEditProfile called")
        return userService.updateProfile(updatedProfile).then((profileData) => {
            dispatch(setEditedUserProfile(profileData))
            callBack()
        })
            .catch((error) => {
                dispatch(showMessage(error.message))
            })
    }
}

//call on the for the edited profile reducer
export const setEditedUserProfile = (user) => {
    return {
        type: 'SET_EDIT_USER',
        payload: user
}}
