<template>
  <div class="wrapper">
    <h2 class="title">Выберите тест, который хотите пройти:</h2>
    <v-container v-if="allTests">
      <v-col>
        <v-col v-for="(test, i) in allTests.testsList" :key="i">
          <v-card color="indigo-darken-3" variant="outlined">
            <v-card-item>
              <div>
                <div class="text-h6 mb-1">{{ test.title }}</div>
                <div class="text-caption">
                  {{ test.description }}
                </div>
              </div>
            </v-card-item>

            <v-card-actions>
              <router-link :to="{ name: 'test', params: { id: test.path } }">
                <v-btn> Пройти </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
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
export default {
  name: "MainComponent",
  data() {
    return {
      allTests: null,
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
  },
  async created() {
    this.allTests = await this.fetchAllTests();
  },
};
</script>

<style lang="scss">
@import url("../styles/main_style.scss");
</style>
