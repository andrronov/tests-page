<template>
  <div class="wrapper" style="background-color: #1a237e">
    <h1
      style="
        margin-top: 25px;
        color: #1a237e;
        background-color: white;
        padding: 10px;
      "
    >
      Создать тест
    </h1>
    <div class="create_test__form" style="width: 100%; color: white">
      <v-container class="w-100">
        <v-form fast-fail @submit.prevent>
          <v-card-title>Основная информация</v-card-title>
          <v-text-field
            :variant="form_variant"
            v-model="testName"
            label="Название теста"
          ></v-text-field>
          <v-text-field
            :variant="form_variant"
            v-model="testAutor"
            label="Автор"
          ></v-text-field>

          <v-combobox
            v-model="testCategory"
            clearable
            label="Категория"
            :items="testCategories"
            variant="outlined"
          ></v-combobox>

          <v-text-field
            :variant="form_variant"
            v-model="testDescription"
            label="Описание"
          ></v-text-field>
          <div style="margin-top: 50px">
            <v-card-title>Вопросы</v-card-title>
            <v-text-field
              :variant="form_variant"
              v-model="autorQuestion"
              label="Вопрос"
            ></v-text-field>
            <div style="display: flex; flex-direction: column">
              <div
                v-for="(question, index) in 3"
                :key="index"
                style="display: flex; flex-direction: row; align-items: center"
              >
                <v-text-field
                  :variant="form_variant"
                  v-model="autorQuestionVariant[index]"
                  label="Вариант ответа"
                ></v-text-field>
                <input
                  style="width: 28px; height: 28px"
                  type="radio"
                  v-model="autorQuestionVariantRightAnswer"
                  :value="index + 1"
                />
              </div>
            </div>
            <v-card-text
              v-if="questAddingSuccess"
              style="
                color: white;
                background-color: green;
                padding: 2.5px;
                text-align: center;
              "
              >Вопрос добавлен!</v-card-text
            >
            <v-btn class="my-4" @click="addQuestion">Следующий вопрос</v-btn>
          </div>
          <h3
            v-if="validate_error"
            style="color: white; font-size: 1.5rem; background-color: red"
          >
            Ошибка! Заполните все поля. В тесте должно быть не менее трех
            вопросов
          </h3>
          <h2
            v-if="testAddedSuccessfully"
            style="
              color: white;
              background-color: green;
              padding: 5px;
              text-align: center;
            "
          >
            Тест успешно добавлен!
          </h2>
          <v-btn type="submit" @click="createTest" block class="mt-2"
            >Завершить</v-btn
          >
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { testCategories } from '../sources/test_categories.js'

export default {
  data: () => ({
    testName: "",
    testAutor: "",
    testDescription: "",
    autorQuestion: "",
    autorQuestionVariant: [],
    autorQuestionVariantRightAnswer: 0,
    autorTest: [],
    testCategory: null,

    testCategories: testCategories,

    form_variant: "outlined",
    validate_error: false,
    questAddingSuccess: false,
    testAddedSuccessfully: false,
  }),
  methods: {
    addQuestion() {
      if (
        this.autorQuestion &&
        this.autorQuestionVariant[0] &&
        this.autorQuestionVariant[1] &&
        this.autorQuestionVariant[2] &&
        this.autorQuestionVariantRightAnswer
      ) {
        const autorQuestionsTest = {
          question: this.autorQuestion,
          variants: [
            this.autorQuestionVariant[0],
            this.autorQuestionVariant[1],
            this.autorQuestionVariant[2],
          ],
          rightAnswerIdx: this.autorQuestionVariantRightAnswer,
        };
        this.autorTest.push(autorQuestionsTest);
        this.questAddingSuccess = true;
        setTimeout(() => {
          this.questAddingSuccess = false;
        }, 3000);

        this.autorQuestion = "";
        this.autorQuestionVariant = [];
        this.autorQuestionVariantRightAnswer = 0;
      } else {
        this.validate_error = true;
        setTimeout(() => {
          this.validate_error = false;
        }, 5000);
      }
    },

    async createTest() {
      if (
        this.testName &&
        this.testAutor &&
        this.testDescription &&
        this.autorTest.length > 2 &&
        this.testCategory
      ) {
        const autorQuestionMain = {
          id: Date.now() + Math.floor(Math.random() * 100),
          title: this.testName,
          category: this.testCategory,
          description: this.testDescription,
          author: this.testAutor,
          questions: this.autorTest,
        };
        axios
          .post("http://localhost:3000/tests_list", autorQuestionMain)
          .then((resp) => {
            console.log(resp.data);
            this.testAddedSuccessfully = true;
            setTimeout(() => {
              this.$router.push('/home')
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
@import url("../styles/main_style.scss");
</style>
