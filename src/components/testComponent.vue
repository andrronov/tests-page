<template>
  <div v-if="test" class="content-loader">
    
    <div class="test_window">
      <div v-if="showTest" class="test_wrap">
      <h1>Вопрос {{ questionId + 1 }}/{{test.testData.questions.length}}</h1>
      <div class="content_test">
        <p class="test_question">{{
          test.testData.questions[questionId].question
        }}</p>
        <div class="test_inputs">
          <label
            v-for="(variant, index) in test.testData.questions[questionId].variants"
            :key="index"
            class="answer"
          >
            <input
              v-model="userAnswer"
              type="radio"
              class="answer_input"
              name="answer"
              :value="index + 1"
            />
            <p class="input_question">{{ variant }}</p>
          </label>
        </div>
      </div>
      <div class="test_buttons">
        <div class="buttons_next-prev">
          <v-btn :disabled="questionId <= 0" @click="changeQuestion('previous')" variant="outlined"
            >Предыдущий вопрос</v-btn>
          <v-btn
            :disabled="questionId === this.test.testData.questions.length - 1" variant="outlined"
            @click="changeQuestion('next')"
            >Следующий вопрос</v-btn>
        </div>
        <v-btn size="large" variant="outlined" color="green" elevation="4" @click="endTest">Завершить выполнение теста</v-btn>
      </div>

      <!-- <v-pagination v-model="questionId" :length="test.testData.length"></v-pagination> -->

      <v-snackbar v-model="snackbar" vertical>
        <div class="text-subtitle-1 pb-2">Тест пройден!</div>
        <p>Спасибо за прохождение теста!</p>
        <template v-slot:actions>
          <v-btn color="indigo" variant="text" @click="snackbar = false" elevation="4"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      </div>
      <div v-if="!showTest" class="test_wrap">
        <h2 style="margin-bottom: 15px">Правильных ответов: {{ rightUserAnswers }}</h2>
        <router-link to="/">
          <v-btn variant="outlined" color="indigo" elevation="4">На главную</v-btn>
        </router-link>
      </div>
    </div>
  </div>
  <v-skeleton-loader
    v-if="!test && !loadError"
    :elevation="10"
    class="skelet-loader"
    color="outlined blue-lighten-4"
    type="text@3, text, button"
  ></v-skeleton-loader>

  <v-alert
    v-model="allRightAlert"
    closable
    close-label="Close Alert"
    text="Вы дали верные ответы на все вопросы! Поздравляем"
    type="success"
    variant="outlined"
  ></v-alert>

  <!-- test load error -->
  <v-alert
    v-if="loadError"
    text="Такого теста не существует!"
    type="error"
    variant="outlined"></v-alert>
</template>

<script>
export default {
  name: "TestComponent",
  props: ["id"],
  data() {
    return {
      showTest: true,
      questionId: 0,
      test: null,
      userAnswer: "",
      rightUserAnswers: 0,
      snackbar: false,
      allRightAlert: false,
      loadError: false
    };
  },
  methods: {
    async loadTest() {
        const testData = await fetch(`http://localhost:3000/tests_list/${this.id}`)
        .then((r) => {
          if(r.ok) {return r.json()}
          else{this.loadError = true}
        })
        return { testData };
    },
    writeAnswer() {
      this.test.testData.questions[this.questionId].userAnswer = this.userAnswer;
      this.userAnswer = 0;
    },
    changeQuestion(data) {
      this.writeAnswer();
      if (data == "previous") {
        this.questionId--;
      } else if (data == "next") {
        this.questionId++;
      } else {
        console.error("error with questions");
      }
    },
    endTest() {
      this.writeAnswer();

      for (let i = 0; this.test.testData.questions.length > i; i++) {
        if (
          this.test.testData.questions[i].rightAnswerIdx ==
          this.test.testData.questions[i].userAnswer
        ) {
          this.rightUserAnswers++;
        }
      }
      if (this.rightUserAnswers === this.test.testData.questions.length) {
        this.allRightAlert = true;
      }

      this.snackbar = true;
      this.showTest = !this.showTest;
    },
  },
  async created() {
    this.test = await this.loadTest();
  },
};
</script>

<style lang="scss">
@import url("../styles/main_style.scss");
</style>