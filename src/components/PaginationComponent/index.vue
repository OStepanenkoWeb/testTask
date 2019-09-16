<template>
    <div class="row">
        <div class="col s6 offset-s3">
            <ul class="pagination pagination-center">
                <li class="waves-effect"
                    @click="onClick(page)"
                    v-for="page in countPages"
                    :class="{'active': page === parseInt(activePage)}"
                    :key="page">
                    <a>{{page}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { COUNT_PAGES } from '../../store'

export default {
  name: 'PaginationComponent',
  mounted () {
    this.onClick(1)
  },
  computed: {
    countPages () {
      return this.$store.getters[COUNT_PAGES]
    },
    activePage () {
      return this.$route.params.id
    }
  },
  methods: {
    onClick (page) {
      this.$router.push({ name: 'CardComponent', params: { id: page } })
    }
  }
}
</script>

<style scoped>
    .pagination-center {
        display: flex;
        justify-content: center;
    }
</style>
