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
            <v-alert v-model="regSuccess" text="Вы успешно зарегистрировались!" type="success" variant="outlined" style="min-height: 50px; margin-top: 20px"></v-alert>
            <v-alert v-model="regError" text="Ошибка" type="error" variant="outlined" style="min-height: 50px; margin-top: 20px"></v-alert>
          </v-container>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
data:() =>({
  username: null,
  userMail: null,
  userPassword: null,

  regDialog: false,
  regSuccess: false,
  regError: false
}),
created(){
  console.log(this.$store.state.loggedIn)
},
methods: {
  registerUser(){
    axios.post('http://localhost:3003/api/user', {
        "username": this.username,
        "email": this.userMail,
        "password": this.userPassword
      } 
    )
    .then((res)=> {
      if(res.status == 200){
        this.regSuccess = true
        this.$store.dispatch('login')
        console.log(this.$store.state.loggedIn)
        setTimeout(() => {
          this.regSuccess = false
          this.$router.push({name: "homePageComponent"})
        }, 2500)
      }
      })
      .catch((error)=>{
        if(error.response.status == 400){
          this.regError = true
          setTimeout(() => {
            this.regError = false
          }, 5000);
        }
      })
  }
}
}
</script>

<style>
@import url("../styles/main_style.scss");
</style>