<template>
  <div v-if="test" class="content-loader">
    
    <div class="test_window">
      <div v-if="showTest" class="test_wrap">
      <h1>Тест, Вопрос №{{ questionId + 1 }}/{{test.testData.length}}</h1>
      <div class="content_test">
        <p class="test_question">{{
          test.testData[questionId].question
        }}</p>
        <div class="test_inputs">
          <label
            v-for="(variant, index) in test.testData[questionId].variants"
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
            :disabled="questionId === this.test.length - 1" variant="outlined"
            @click="changeQuestion('next')"
            >Следующий вопрос</v-btn>
        </div>
        <v-btn size="large" variant="outlined" color="green" elevation="4" @click="endTest">Закончить выполнение теста</v-btn>
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
    v-if="!test"
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
      items: [
        {
          title: 'Item #1',
          value: 1,
        },
        {
          title: 'Item #2',
          value: 2,
        },
        {
          title: 'Item #3',
          value: 3,
        },
      ],
    };
  },
  methods: {
    async loadTest() {
      if (this.id) {
        const testData = await fetch(`http://localhost:3000/${this.id}`).then(
          (r) => r.json()
        );
        console.log("test loaded");
        return { testData };
      } else {
        setTimeout(() => {
          this.loadTest();
          console.log("test didnt found, load again....");
        }, 1000);
      }
      console.log(this.id);
    },
    writeAnswer() {
      this.test.testData[this.questionId].userAnswer = this.userAnswer;
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

      for (let i = 0; this.test.testData.length > i; i++) {
        if (
          this.test.testData[i].rightAnswerIdx ==
          this.test.testData[i].userAnswer
        ) {
          this.rightUserAnswers++;
        }
      }
      if (this.rightUserAnswers === this.test.testData.length) {
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