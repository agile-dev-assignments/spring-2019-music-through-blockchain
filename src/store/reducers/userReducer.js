const initState = {
    user: {
        'accountOwner': null,
        'artistName': null,
        'photoUrl': null, 
        'songsOwned': [], 
        'bio':null
    }
}

export let userReducer = (state = initState, action) => {
    const {payload} = action
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user : {
                    ...state.user, 
                    artistName: payload.user.artistName,
                    photoUrl: payload.user.photoUrl,  
                    songsOwned: payload.user.songsOwned,
                    songs: payload.user.songs,
                    bio: payload.user.biography
            }
        }
        case 'SET_EDIT_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    accountOwner: payload.accountOwner,
                    artistName: payload.artistName,
                    bio: payload.biography
                }
            }
        case 'SET_EDIT_USER_IMAGE':
            return {
                ...state,
                user: {
                    ...state.user,
                    accountOwner: payload.accountOwner,
                    artistName: payload.artistName,
                    bio: payload.biography,
                    photoUrl: payload.photoUrl
                }
            }
        default:
            return state
    }
}