<template>
  <div class="wrapper-center">
    <h2 class="title">Здравствуйте! Выберите действие:</h2>
    <div class="page_buttons">
      <router-link to="/tests">
        <v-btn variant="outlined" size="x-large" elevation="4"> Пройти тест </v-btn>
      </router-link>
      <router-link to="/tests-create">
        <v-btn variant="outlined" size="x-large" elevation="4"> Создать тест </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
   data() {
      return {
         dialog: false
      }
   }
};
</script>

<style>
@import url("../styles/main_style.scss");
</style>
