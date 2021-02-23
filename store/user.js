import firebase from '@/plugins/firebase'
import 'firebase/auth'
import 'firebase/firestore'

export const state = () => ({
  isLogin: false,
  displayName: undefined,
  uid: undefined,
  photoURL: undefined,
})

export const mutations = {
  setUserData(state, userData) {
    state.isLogin = true
    state.displayName = userData.displayName
    state.uid = userData.uid
    state.photoURL = userData.photoURL
  },
  resetUserData(state) {
    state.isLogin = false
    state.displayName = undefined
    state.uid = undefined
    state.photoURL = undefined
  },
  setUserName(state, userName) {
    state.displayName = userName
  },
}

export const actions = {
  statusCheck({ commit }) {
    console.log('statusCheck')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid)
        commit('setUserData', {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        })
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            const name = doc.data().name
            if (name) {
              commit('setUserName', name)
            }
          })
          .catch((err) => {
            console.log('Error getting documents', err)
          })
      } else {
        commit('resetUserData')
      }
    })
  },
  async saveNewNickName(context, payload) {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(context.state.uid)

    await userRef.set(
      {
        name: payload,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    context.commit('setUserName', payload)
  },
  login() {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  },
  logout({ commit }) {
    firebase.auth().signOut()
    commit('resetUserData')
  },
}
