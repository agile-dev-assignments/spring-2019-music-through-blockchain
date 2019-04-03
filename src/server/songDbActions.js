import { db, storageRef } from "../fbconfig"
import firebase from 'firebase'

// - Import react components
export const songService = {
  /**
  * Upload song
  */
  uploadSong: (uid, songInfo, image, imageName, song, songName) => {
    return new Promise((resolve, reject) => {
        let songData = {}
        let songRef = db.collection(`songs`).doc()
        let userRef = db.collection(`users`).doc(uid)
        const imageStorageFile = storageRef.child(`images/${imageName}`)
        const songStorageFile = storageRef.child(`songs/${songName}`)

        //cloud storage --> store cover art
        imageStorageFile.put(image).then((imageResult) => {
          imageResult.ref.getDownloadURL()
          .then((imageDownloadURL) => {

            //cloud storage --> store song
            songStorageFile.put(song).then((songResult) => {
              songResult.ref.getDownloadURL()
              .then((songDownloadURL) => {
                songData = {...songInfo, 
                  imageUrl: imageDownloadURL,
                  imageFullPath: imageResult.metadata.fullPath,
                  songUrl: songDownloadURL, 
                  songFullPath: songResult.metadata.fullPath}
                
                //firestore --> save song info
                songRef.set(songData).then(() => {
                  //add song id to songs owned by user
                  userRef.update({songsOwned: firebase.firestore.FieldValue.arrayUnion(songRef.id)})
                  
                  //add songId to songInfo and resolve
                  .then(() => {
                    songData['id'] = songRef.id
                    resolve(songData)
                  })
                })
              })
            })
          }).catch((error) => {
            reject(error)
          })
        })
      })
    },
    
  /**
   * Update song
   */
  updateSong: (song) => {
      return new Promise((resolve, reject) => {
        const batch = db.batch()
        let songRef = db.doc(`songs/${song.id}`)
             
        batch.update(songRef, { ...song })
        batch.commit().then(() => {
          resolve()
        })
          .catch((error) => {
            reject()
          })
      })
    },

  /**
   * Delete song
   */
  deleteSong: (songId) => {
      return new Promise((resolve, reject) => {
        const batch = db.batch()
        let songRef = db.doc(`songs/${songId}`)
        batch.delete(songRef)
        batch.commit().then(() => {
          resolve()
        })
          .catch((error) => {
            reject()
          })
      })
    },

/**
 * Get list of songs for homepage
 * 
 */
getSongs: (userId, lastSongId, page, limit, type, sortBy) => {
    return new Promise((resolve, reject) => {
        let parsedData = []
        let query = db.collection('songs')
        if (userId !== '') {
            query = query.where('ownerId', '==', userId)
        }
        if (lastSongId && lastSongId !== '') {
            query = query.orderBy('id').orderBy('creationDate').startAfter(lastSongId).limit(limit)
        }
        query.get().then((songs) => {
            let newLastSongId = songs.size > 0 ? songs.docs[songs.docs.length - 1].id : ''
            songs.forEach((songResult) => {
            const song = songResult.data()
            parsedData = [
                ...parsedData,
                {
                [songResult.id]: {
                    id: songResult.id,
                    ...song
                }
                }

            ]
            })
            resolve({ songs: parsedData, newLastSongId })
        })
        })
    }
}

