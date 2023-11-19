<template>
  <div class="wrapper-center">
    <h2 class="title">Здравствуйте! Выберите действие:</h2>
    <div class="page_buttons">
      <router-link to="/tests">
        <v-btn variant="outlined" size="x-large" elevation="4"> Пройти тест </v-btn>
      </router-link>
      <router-link to="/">
        <v-btn variant="outlined" size="x-large" elevation="4" @click="dialog = true"> Создать тест </v-btn>
      </router-link>
    </div>
  </div>

  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-card-text>
        Возможности создавать тесты пока нет. Приходите позже!
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
