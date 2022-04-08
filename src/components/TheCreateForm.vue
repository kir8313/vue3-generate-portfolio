<template>
  <form class="card card-w30" @submit.prevent="send" @keypress.enter.prevent="send">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="select">
        <option value="title">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model="textarea"></textarea>
    </div>

    <button :disabled="lengthText" class="btn primary">Добавить</button>
  </form>
</template>

<script>
export default {
  emits: ['submitInfo'],

  data() {
    return {
      textarea: "",
      select: 'title',
    }
  },

  methods: {
    send() {
      this.$emit('submitInfo', {
        select: this.select,
        content: this.textarea,
      });

      this.select = 'title';
      this.textarea = '';
    }
  },

  computed: {
    lengthText() {
      return this.textarea.length > 3 ? false : true;
    }
  }
}
</script>
