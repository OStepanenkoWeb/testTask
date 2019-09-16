import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import { firebaseConfig } from '../firebase-config'

Vue.use(firestorePlugin)

export const db = firebase.initializeApp(firebaseConfig).firestore()
export const firestore = firebase.firestore

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
