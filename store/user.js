import firebase from '@/plugins/firebase'

export const state = () => ({
  isLogin: false,
  displayName: undefined,
  photoURL: undefined,
})

export const mutations = {
  setUserData(state, userData) {
    state.isLogin = true
    state.displayName = userData.displayName
    state.photoURL = userData.photoURL
  },
  resetUserData(state) {
    state.isLogin = false
    state.displayName = undefined
    state.photoURL = undefined
  },
}

export const actions = {
  statusCheck({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('setUserData', {
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      } else {
        commit('resetUserData')
      }
    })
  },
  login() {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  },
  logout({ commit }) {
    firebase.auth().signOut()
    commit('resetUserData')
  },
}
