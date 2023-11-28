<template>
    <div class="wrapper-center _reg">
      <img src="../images/question-message-svgrepo-com.gif" alt="main-icon">
      <h2 class="title">QuizQues - сборник лучших тестов и викторин</h2>
      <div class="page_buttons">
          <v-btn variant="outlined" color="indigo-darken-3" size="x-large" elevation="4"> Войти </v-btn>
          <v-btn variant="outlined" size="x-large" color="indigo-darken-3" elevation="4" @click="regDialog = true"> Зарегестрироваться </v-btn>
      </div>
    </div>



    <v-row justify="center">
      <v-dialog
        v-model="regDialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="indigo-darken-3"
          >
            <v-btn
              icon
              dark
              @click="regDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-center">Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list class="d-flex flex-column align-center"
            lines="two"
            subheader
          >
          <v-divider></v-divider>
          <v-container class="d-flex flex-column mt-8">
            <v-toolbar-title class="mt-1">Никнейм</v-toolbar-title>
            <v-text-field v-model="username" clearable class="w-100" label="Введите" variant="outlined" color="indigo-darken-3"></v-text-field>
            <v-toolbar-title class="mt-4">Почта</v-toolbar-title>
            <v-text-field v-model="userMail" clearable label="Введите" variant="outlined" color="indigo-darken-3"></v-text-field>
            <v-toolbar-title class="mt-4">Пароль</v-toolbar-title>
            <v-text-field v-model="userPassword" type="password" clearable label="Введите" variant="outlined" color="indigo-darken-3"></v-text-field>
            <v-btn @click="registerUser" variant="outlined" color="indigo-darken-3" class="mt-6" size="large">Принять</v-btn>
          </v-container>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import UserController from '../../back/controllers/user_controllers.js'

export default {
data:() =>({
  username: null,
  userMail: null,
  userPassword: null,

  regDialog: false,
}),
methods: {
  registerUser(){
    
  }
}
}
</script>

<style>
@import url("../styles/main_style.scss");
</style>