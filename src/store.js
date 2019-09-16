import Vue from 'vue'
import Vuex from 'vuex'
import { db, firestore } from './main'

export const ADD_TASKS = 'ADD_TASKS'
export const GET_TASK_ACTION = 'GET_TASK_ACTION'
export const ADD_TASK_ACTION = 'ADD_TASK_ACTION'
export const UPDATE_TASK_ACTION = 'UPDATE_TASK_ACTION'
export const DELETE_TASK_ACTION = 'DELETE_TASK_ACTION'
export const COUNT_PAGES = 'COUNT_PAGES'
export const GET_PAGE = 'GET_PAGE'

const countInPage = 10

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: []
  },
  getters: {
    [COUNT_PAGES]: state => {
      return Math.ceil(state.taskList.length / countInPage) || 1
    },
    [GET_PAGE]: state => (page) => {
      return state.taskList.slice((page - 1) * countInPage, countInPage * page)
    }
  },
  mutations: {
    [ADD_TASKS]: (state, payload) => {
      state.taskList = payload
    }
  },
  actions: {

    [DELETE_TASK_ACTION]: async ({ dispatch }, { id }) => {
      try {
        await db.collection('tasks').doc(id).delete()
        dispatch(GET_TASK_ACTION, {})
      } catch (e) {
        console.log(e)
      }
    },
    [UPDATE_TASK_ACTION]: async ({ dispatch }, payload) => {
      const { id, data = {} } = payload

      try {
        await db.collection('tasks').doc(id).set(data)
        dispatch(GET_TASK_ACTION, {})
      } catch (e) {
        console.log(e)
      }
    },
    [ADD_TASK_ACTION]: async ({ dispatch }, payload) => {
      const { executed = false, textTask = '' } = payload

      try {
        await db.collection('tasks').add({
          executed,
          textTask,
          date: firestore.FieldValue.serverTimestamp()
        })
        dispatch(GET_TASK_ACTION, {})
      } catch (e) {
        console.log(e)
      }
    },
    [GET_TASK_ACTION]: async ({ commit }, _) => {
      try {
        const { docs } = await db.collection('tasks').orderBy('date').get()
        const documents = docs.map(doc => ({ data: doc.data(), id: doc.id })).reverse()

        commit(ADD_TASKS, documents)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
