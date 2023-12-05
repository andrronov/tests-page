<template>
  <div class="wrapper-center">
    <h2 class="title">
      Здравствуйте, {{ $store.getters.auth.username }}! Выберите действие:
    </h2>
    <div class="page_buttons">
      <router-link to="/tests">
        <v-btn variant="outlined" size="x-large" elevation="4">
          Пройти тест
        </v-btn>
      </router-link>
      <router-link to="/tests-create">
        <v-btn variant="outlined" size="x-large" elevation="4">
          Создать тест
        </v-btn>
      </router-link>
      <v-btn variant="outlined" size="x-large" elevation="4" @click="logOut">
        Выйти из аккаунта
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    logOut() {
      this.$store.commit("logOut");
      localStorage.removeItem('isLogged')
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss">
@import url("../styles/main_style.scss");
</style>
