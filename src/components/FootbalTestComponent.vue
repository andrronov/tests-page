<template>
  <h1>Test</h1>
  <div class="content_test">
    <h3>Вопрос №{{questionId + 1}}<br>{{test[questionId].question}}</h3>
    <div class="test_inputs">
    <label v-for="(variant, index) in test[questionId].variants" :key="index" class="answer" >
      {{variant}}
      <input v-model="userAnswer" type="radio" id="answer_1" name="answer" :value="index + 1" />
    </label>
    </div>
  </div>
  <button :disabled="questionId<=0" @click="questionId--">Предыдущий вопрос</button>
  <button :disabled="questionId===this.test.length - 1" @click="questionId++">Следующий вопрос</button>
</template>

<script>
import footballTest from "../tests/football_test.json"

export default {
  name: 'TestComponent',
  data(){
    return{
      questionId: 0,
      test: footballTest,
      userAnswer: null,
    }
  },
  methods: {
    aaa(){
      footballTest.forEach(element => {
        console.log(element)
      });
     console.log(this.test.length); 
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
