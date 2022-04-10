<template>
  <div class="container column">
    <the-create-form @submitInfo="sendInfo"/>

    <div class="card card-w70">
      <component v-if="portfolio.length" v-for="item in portfolio" :key="item.id" :is="'the-' + item.select" v-bind="{content: item.content}"/>
      <h3 v-else>Информации пока нет, но ты можешь её добавить</h3>
    </div>
  </div>

  <the-comments @get-comments="getComments"/>

</template>

<script>
import {mapGetters} from 'vuex';
import TheCreateForm from "@/components/TheCreateForm";
import TheAvatar from "@/components/TheAvatar";
import TheSubtitle from "@/components/TheSubtitle";
import TheText from "@/components/TheText";
import TheTitle from "@/components/TheTitle";
import TheComments from "@/components/TheComments";

export default {
  components: {TheComments, TheAvatar, TheSubtitle, TheText, TheTitle, TheCreateForm},
  methods: {
    getComments() {
      this.$store.dispatch('getComments');
    },

    sendInfo(infos) {
      this.$store.dispatch('sendInfo', infos);
    },
  },

  computed: {
    ...mapGetters(['portfolio']),
  },

  async mounted() {
    const result = await this.$store.dispatch('getPortfolios')
  }
}
</script>

