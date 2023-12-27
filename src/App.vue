<template>
  <h1>hello</h1>
  <input type="text" placeholder="Имя" v-model="name">
  <input type="text" placeholder="Фамилия (обязательно)" v-model="surname">
  <input type="text" placeholder="Отчество" v-model="thirdName">
  <button @click="sendUserData">send</button>
  <h2 v-if="isError" style="color: red">Обязательно введите фамилию</h2>
  <div v-if="responseMessage" class="response">
    <h1>Ответ от сервера:</h1>
    <p>Имя: {{responseMessage.name}}</p>
    <p>Фамилия: {{responseMessage.surname}}</p>
    <p>Отчество: {{responseMessage.thirdName}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      surname: null,
      thirdName: null,
      isError: false,
      responseMessage: null
    };
  },
  methods: {
    async sendUserData() {
      if(!this.surname){
        this.isError = true
        throw new Error('Обязательно введите фамилию');
      }
      let user = {
        name: this.name,
        surname: this.surname,
        thirdName: this.thirdName
      };
      this.isError = false
      const data = await fetch("http://localhost:3003/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      });
      const response = await data.json()
      this.responseMessage = response
    },
  },
};
</script>
