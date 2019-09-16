import Vue from 'vue'
import Router from 'vue-router'
import CardComponent from './components/CardComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:id',
      name: 'CardComponent',
      component: CardComponent
    }
  ]
})
