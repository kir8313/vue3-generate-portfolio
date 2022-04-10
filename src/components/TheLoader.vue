<template>
  <div v-if="isLoaded" class="loader"></div>
</template>

<script>
export default {
  props: {
    isLoaded: {
      type: Boolean,
      required: true,
    }
  }
}
</script>