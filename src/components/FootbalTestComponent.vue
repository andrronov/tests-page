<!-- USING VUETIFY -->
<template>
  <h1>Test</h1>
  <div v-if="showTest" class="content_test">
    <h3>Вопрос №{{questionId + 1}}<br>{{test[questionId].question}}</h3>
    <div class="test_inputs">
    <label v-for="(variant, index) in test[questionId].variants" :key="index" class="answer" >
      <p class="input_question">{{variant}}</p>
      <input v-model="userAnswer" type="radio" id="answer_1" name="answer" :value="index + 1" />
    </label>
    </div>
  </div>
  <p v-if="!showTest">Правильных ответов: {{ rightUserAnswers }}</p>
  <div v-if="showTest" class="test_buttons">
    <v-btn :disabled="questionId <= 0" @click="changeQuestion('previous')">Предыдущий вопрос</v-btn>
    <v-btn :disabled="questionId===this.test.length - 1" @click="changeQuestion('next')">Следующий вопрос</v-btn>
    <v-btn @click="endTest">Закончить выполнение теста</v-btn>
  </div>

  <!-- <v-pagination v-model="questionId" :length="test.length"></v-pagination> -->

  <v-snackbar v-model="snackbar" vertical>
    <div class="text-subtitle-1 pb-2">Тест пройден!</div>
    <p>Спасибо за прохождение теста!</p>
    <template v-slot:actions>
      <v-btn color="indigo" variant="text" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import footballTest from "../tests/football_test.json"

export default {
  name: 'TestComponent',
  data(){
    return{
      showTest: true,
      questionId: 0,
      test: footballTest,
      userAnswer: null,
      rightUserAnswers: 0,
      snackbar: false,
    }
  },
  methods: {
    writeAnswer(){
      if(this.userAnswer == this.test[this.questionId].rightAnswerIdx){
        this.rightUserAnswers++;
      }else{
        console.log('answer is wrong')
      }
      this.userAnswer = 0;
    },
    changeQuestion(data){
      this.writeAnswer();
      if(data == 'previous'){
        this.questionId--;
      } else if(data == 'next'){
        this.questionId++;
      } else{
        console.error('error with questions')
      }
    },
    endTest(){
      this.writeAnswer();
      this.snackbar = true;
      this.showTest = !this.showTest
    }
  },
};
</script>

<style lang="scss">
.content_test{
  height: 200px;
}
.answer{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.test_inputs{
  display: flex;
  flex-direction: column;
}
.input_question{
  font-size: 1.15rem;
  font-weight: 400;
}
</style>
