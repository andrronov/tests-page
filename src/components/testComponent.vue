<template>
  <div v-if="test" class="content-loader">
    <h1>Test</h1>
    <div v-if="showTest" class="content_test">
      <h3>
        Вопрос №{{ questionId + 1 }}<br />{{
          test.testData[questionId].question
        }}
      </h3>
      <div class="test_inputs">
        <label
          v-for="(variant, index) in test.testData[questionId].variants"
          :key="index"
          class="answer"
        >
          <p class="input_question">{{ variant }}</p>
          <input
            v-model="userAnswer"
            type="radio"
            class="answer_input"
            name="answer"
            :value="index + 1"
          />
        </label>
      </div>
    </div>
    <p v-if="!showTest">Правильных ответов: {{ rightUserAnswers }}</p>
    <div v-if="showTest" class="test_buttons">
      <v-btn :disabled="questionId <= 0" @click="changeQuestion('previous')"
        >Предыдущий вопрос</v-btn
      >
      <v-btn
        :disabled="questionId === this.test.length - 1"
        @click="changeQuestion('next')"
        >Следующий вопрос</v-btn
      >
      <v-btn @click="endTest">Закончить выполнение теста</v-btn>
    </div>

    <!-- <v-pagination v-model="questionId" :length="test.testData.length"></v-pagination> -->

    <v-snackbar v-model="snackbar" vertical>
      <div class="text-subtitle-1 pb-2">Тест пройден!</div>
      <p>Спасибо за прохождение теста!</p>
      <template v-slot:actions>
        <v-btn color="indigo" variant="text" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
  <v-skeleton-loader
    v-if="!test"
    :elevation="10"
    class="skelet-loader"
    color="outlined blue-lighten-4"
    type="text@3, text, button"
  ></v-skeleton-loader>
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

      for(let i = 0; this.test.testData.length > i; i++){
        if(this.test.testData[i].rightAnswerIdx == this.test.testData[i].userAnswer){
          this.rightUserAnswers ++
        }
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
