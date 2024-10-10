import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

// Create the API instance with base URL
const api = axios.create({ baseURL: process.env.API })
// const router = useRouter()
export default boot(({ app, store }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  api.interceptors.request.use(
    function (config) {
      const authToken = localStorage.getItem('authUser')
      if (authToken) {
        // config.headers['x-access-token'] = JSON.parse(authToken)
        config.headers['Authorization'] = `Bearer ${JSON.parse(authToken)}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    function (response) {
      if ([200, 201].includes(response.status)) {
        return response.data.data
      }
      return response
    },
    function (error) {
      const { data } = error.response
      if (data) {
        const { code, message } = data;
        if (code !== 200 && code !== 201) {
          Notify.create({
            type: 'negative',
            message: message || 'An error occurred!',
            position: 'top',
            timeout: 3000
          })
          if (code === 401) {
            store.dispatch('login/logout')
          }
        }

      }
      else {
        Notify.create({
          type: 'negative',
          message: 'Network error or server is unreachable',
          position: 'top',
          timeout: 3000
        })
      }

      return Promise.reject(error)
    }
  )
})

export { axios, api }
