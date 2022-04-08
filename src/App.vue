<template>
  <div class="container column">
    <the-create-form @submitInfo="sendInfo"/>

    <div class="card card-w70">
      <component v-if="portfolio.length" v-for="item in portfolio" :key="item.id" :is="'the-' + item.select"
                 v-bind="{content: item.content}"/>
      <h3 v-else>Информации пока нет, но ты можешь её добавить</h3>
    </div>
  </div>
  <div class="container">
    <div v-if="comments.length === 0">
      <button class="btn primary" @click="getComments">Загрузить комментарии</button>
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
    <div v-if="isLoaded" class="loader"></div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';
import TheCreateForm from "@/components/TheCreateForm";
import TheAvatar from "@/components/TheAvatar";
import TheSubtitle from "@/components/TheSubtitle";
import TheText from "@/components/TheText";
import TheTitle from "@/components/TheTitle";

export default {
  components: {TheAvatar, TheSubtitle, TheText, TheTitle, TheCreateForm},
  methods: {
    getComments() {
      this.$store.dispatch('getComments');
    },

    sendInfo(infos) {
      this.$store.dispatch('sendInfo', infos);
    },
  },

  computed: {
    ...mapGetters(['comments', 'isLoaded', 'portfolio']),
  },

  async mounted() {
    const result = await this.$store.dispatch('getPortfolios')
  }
}
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>
