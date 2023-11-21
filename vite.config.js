import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
})

// module.exports = {
//   chainWebpack: (config) => {
//     config.plugins.delete('prefetch');
//   },
// };