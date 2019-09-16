<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1 class="center-align">ToDo list</h1>
      <div class="input-field">
        <input
          v-model="textTask"
          @keypress.enter="addTask"
          id="inputField"
          type="text"
          class="validate"
        >
        <label for="inputField"> Введите задачу </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_TASK_ACTION } from '../../store'
export default {
  name: 'TaskComponent',
  data: () => ({
    textTask: '',
    isRead: false
  }),
  methods: {
    addTask () {
      if (this.textTask !== '') this.$store.dispatch(ADD_TASK_ACTION, { textTask: this.textTask, isRead: this.isRead })
      this.$router.push({ name: 'CardComponent', params: { id: 1 } }).catch(err => {})
      this.textTask = ''
    }
  }
}
</script>

<style scoped>

</style>
