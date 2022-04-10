<template>
  <div v-if="isLoaded" class="loader"></div>
</template>

<script>
export default {
  computed: {
    isLoaded() {
      this.$store.getters.isLoaded
    }
  }
}
</script>