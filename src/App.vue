<template>
  <div id="app">
    <div v-if="showView" class="container">
      <TaskComponent/>
      <router-view @edit="editTask"></router-view>
      <PaginationComponent/>
    </div>
    <div v-else class="container">
      <EditTaskComponent :task-text="taskText.data.textTask" @input="handleInput" @back="backToTask" @save="editTasks"/>
    </div>
  </div>
</template>

<script>
import TaskComponent from './components/TaskComponent'
import PaginationComponent from './components/PaginationComponent'
import EditTaskComponent from './components/EditTaskComponent'
import { UPDATE_TASK_ACTION } from './store'

export default {
  name: 'app',
  data: () => ({
    showView: true,
    taskText: {}
  }),
  components: {
    TaskComponent,
    PaginationComponent,
    EditTaskComponent
  },
  methods: {
    editTask (task) {
      this.$router.push({ path: '/edit' })
      this.showView = false
      this.taskText = task
    },
    handleInput (value) {
      this.taskText.data.textTask = value
    },
    backToTask () {
      this.taskText = ''
      this.showView = true
    },
    editTasks () {
      this.showView = true
      this.$store.dispatch(UPDATE_TASK_ACTION, this.taskText)
    }
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
</style>
