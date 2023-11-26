<template>
  <header class="header">
    <v-container class="d-flex flex-column align-center">
      <v-container class="d-flex flex-row align-center">
        <v-autocomplete
          class="header_search"
          style="color: white"
          variant="outlined"
          label="Найти тест"
          :items="allTests?.testsList"
          @keydown.enter="findSearchedTest"
          v-model="searchValue"
        ></v-autocomplete>
        <v-btn @click="findSearchedTest" icon="mdi-magnify"></v-btn>
      </v-container>
      <v-combobox
      class="w-100 header_search"
        style="color: white"
        clearable
        chips
        multiple
        label="Категории"
        :items="testCategory"
        variant="outlined"
        v-model="searchCategories"
      ></v-combobox>
    </v-container>
  </header>

  <div class="wrapper">
    <h2 class="title">Выберите тест, который хотите пройти:</h2>
    <v-container v-if="allTests?.newTestArray">
      <div
        class="title_button"
        style="display: flex; flex-direction: column; gap: 10px"
      >
        <h4 class="title">Найденные тесты</h4>
        <h3
          style="align-self: center; margin: 25px 0px"
          v-if="allTests.newTestArray == 0"
        >
          Ничего не найдено
        </h3>
        <v-btn @click="allTests.newTestArray = 0" variant="outlined"
          >Отменить поиск</v-btn
        >
      </div>
      <v-col v-for="(test, i) in allTests.newTestArray" :key="i">
        <v-card color="indigo-darken-3" variant="outlined">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">{{ test.title }}</div>
              <div class="text-body-1 mb-1">{{ test.description }}</div>
              <div class="text-body-2">Категория: {{ test.category }}</div>
              <div class="text-body-2">Автор: {{ test.author }}</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <router-link :to="{ name: 'test', params: { id: test.id } }">
              <v-btn variant="outlined" color="indigo-darken-3"> Пройти </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>
    <v-container v-if="allTests">
      <h4 class="title">Все тесты</h4>
      <v-col v-for="(test, i) in allTests.testsList" :key="i">
        <v-card color="indigo-darken-3" variant="outlined">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">{{ test.title }}</div>
              <div class="text-body-1 mb-1">{{ test.description }}</div>
              <div class="text-body-2">Категория: {{ test.category }}</div>
              <div class="text-body-2">Автор: {{ test.author }}</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <router-link :to="{ name: 'test', params: { id: test.id } }">
              <v-btn variant="outlined" color="indigo-darken-3"> Пройти </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>
  </div>

  <!-- skeleton loader -->
  <v-container v-if="!allTests">
    <v-skeleton-loader
      :elevation="10"
      class="skelet-loader"
      color="outlined blue-lighten-4"
      type="text@3, text, button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      :elevation="10"
      class="skelet-loader"
      color="outlined blue-lighten-4"
      type="text@3, text, button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      :elevation="10"
      class="skelet-loader"
      color="outlined blue-lighten-4"
      type="text@3, text, button"
    ></v-skeleton-loader>
  </v-container>
</template>

<script>
import { testCategories } from '../sources/test_categories.js'

export default {
  name: "MainComponent",
  data() {
    return {
      allTests: null,
      searchValue: null,
      searchCategories: null,

      testCategory: testCategories
    };
  },
  methods: {
    takeTest(data) {
      this.$emit("test-data", data);
    },
    async fetchAllTests() {
      const testsList = await fetch("http://localhost:3000/tests_list").then(
        (r) => r.json()
      );
      return { testsList };
    },
    findSearchedTest() {
      this.allTests.newTestArray = this.allTests.testsList.filter(
        (searchingTest) => searchingTest.title == this.searchValue || searchingTest.category == this.searchCategories
      );
    },
  },
  async created() {
    this.allTests = await this.fetchAllTests();
  },
};
</script>

<style lang="scss">
@import url("../styles/main_style.scss");
</style>
