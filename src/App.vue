<template>
  <MainComponent @testData="takeTest" v-if="!testOpened" />
  <TestComponent :testPath="testPath" v-if="testOpened" />
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import TestComponent from "./components/testComponent.vue"
export default {
  name: "App",
  components: {
    MainComponent,
    TestComponent,
  },
  data(){
    return{
      testOpened: false,
      testPath: "./",
    }
  },
  methods: {
    takeTest(data){
      this.testPath = data
      this.testOpened = true
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
body{
  font-family: 'Lato', sans-serif;
}
</style>
