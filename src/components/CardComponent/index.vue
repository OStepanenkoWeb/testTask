<template>
  <div class="wrapper">
    <div class="row valign-wrapper">
      <div v-if="!taskList.length" class="col offset-s6 mt-20">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0" v-for="(task, index) in taskList" :key="index">
      <div class="col s6 offset-s3">
        <div class="card row valign-wrapper hoverable">
            <div class="card-content col s1">
              <label>
                <input type="checkbox" @input="handleInput(task)" :checked="task.data.executed"/>
                <!--span Нужен для работы чекбокса-->
                <span/>
              </label>
            </div>
            <div class="card-content col s10" :class="{'done-task': task.data.executed}">
              {{task.data.textTask}}
            </div>
          <div class="col waves-effect waves-light p-0">
            <i class="material-icons" @click="editTask(task)">edit</i>
          </div>
          <div class="col waves-effect waves-light clear-icon-mr p-0">
            <i class="material-icons" @click="deleteTask(task)">clear</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_TASK_ACTION, UPDATE_TASK_ACTION, DELETE_TASK_ACTION, GET_PAGE } from '../../store'

export default {
  name: 'CardComponent',
  computed: {
    taskList () {
      return this.$store.getters[GET_PAGE](Number.parseInt(this.$route.params.id))
    }
  },
  mounted () {
    this.$store.dispatch(GET_TASK_ACTION, {})
  },
  methods: {
    handleInput (task) {
      let { data, ...tasks } = task

      data.executed = !data.executed
      this.$store.dispatch(UPDATE_TASK_ACTION, { data, ...tasks })
    },
    deleteTask (task) {
      this.$store.dispatch(DELETE_TASK_ACTION, task)
    },
    editTask (task) {
      this.$emit('edit', task)
    }
  }
}
</script>

<style scoped lang="scss">
  .m-0 {
    margin: 0;
  }
  .mt-20 {
    margin-top: 20%;
  }
  .clear-icon-mr {
    margin-right: 0.5rem;
  }
  .done-task {
    text-decoration: line-through;
  }
  .p-0 {
    padding: 0;
  }
</style>
