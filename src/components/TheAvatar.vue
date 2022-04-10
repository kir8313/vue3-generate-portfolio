<template>
  <div class="avatar">
    <img :src="content" alt="">
  </div>
</template>

<script>
export default {
  props: ['content'],
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