<template>
  <div class="container">
    <div v-if="comments.length === 0">
      <button class="btn primary" :hidden="hideBtn" @click="getComments">Загрузить комментарии</button>
    </div>
    <div v-else class="card">
      <h2>Комментарии</h2>
      <ul class="list">
        <li class="list-item" v-for="comment in comments" :key="comment.id">
          <div>
            <p><b>{{ comment.email }}</b></p>
            <small>{{ comment.body }}</small>
          </div>
        </li>
      </ul>
    </div>
    <the-loader :is-loaded="isLoaded" />
  </div>
</template>

<script>
import TheLoader from "@/components/TheLoader";
import {mapGetters} from "vuex"

export default {
  components: {TheLoader},
  emits: ['getComments'],
  computed: mapGetters(['comments', 'isLoaded']),
  data: () => ({
    hideBtn: false,
  }),

  methods: {
    getComments() {
      this.$emit('getComments');
      this.hideBtn = true;
    }
  }
}
</script>

<style scoped>

</style>