<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1 class="center-align">Edit Task</h1>
        <div class="input-field col s12">
          <textarea
            id="textarea1"
            class="materialize-textarea"
            :value="taskText"
            @input="editText">
          </textarea>
        </div>
      <div class="row">
        <button
          @click="backToTasks"
          class="btn waves-effect waves-light col s3 offset-s1"
          type="submit"
          name="action">
          Back
          <i class="material-icons right">reply</i>
        </button>
        <button
          @click="saveText"
          class="btn waves-effect waves-light col s3 offset-s4"
          type="submit"
          name="action">
          Save
          <i class="material-icons right">check</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditTaskComponent',
  props: {
    taskText: {
      type: String,
      default: ''
    }
  },
  methods: {
    editText (event) {
      const { target: { value } } = event

      this.$emit('input', value)
    },
    saveText () {
      this.$emit('save')
    },
    backToTasks () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
