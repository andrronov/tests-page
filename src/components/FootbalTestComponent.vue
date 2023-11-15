<template>
  <h1>Test</h1>
  <div v-if="showTest" class="content_test">
    <h3>Вопрос №{{questionId + 1}}<br>{{test[questionId].question}}</h3>
    <div class="test_inputs">
    <label v-for="(variant, index) in test[questionId].variants" :key="index" class="answer" >
      {{variant}}
      <input v-model="userAnswer" type="radio" id="answer_1" name="answer" :value="index + 1" />
    </label>
    </div>
  </div>
  <p v-if="!showTest">Правильных ответов: {{ rightUserAnswers }}</p>
  <div v-if="showTest" class="test_buttons">
    <button :disabled="questionId <= 0" @click="changeQuestion('previous')">Предыдущий вопрос</button>
    <button :disabled="questionId===this.test.length - 1" @click="changeQuestion('next')">Следующий вопрос</button>
    <button @click="endTest">Посмотреть результат</button>
  </div>
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
    }
  },
  methods: {
    aaa(){
      footballTest.forEach(element => {
        console.log(element)
      });
     console.log(this.test.length); 
    },
    wtiteAnswer(){
      if(this.userAnswer == this.test[this.questionId].rightAnswerIdx){
        this.rightUserAnswers++;
      }else{
        console.log('answer is wrong')
      }
    },
    changeQuestion(data){
      this.wtiteAnswer();
      if(data == 'previous'){
        this.questionId--;
      } else if(data == 'next'){
        this.questionId++;
      } else{
        console.error('error with questions')
      }
    },
    endTest(){
      this.showTest = !this.showTest
    }
  },
  mounted(){
    this.aaa();
  }
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
</style>
