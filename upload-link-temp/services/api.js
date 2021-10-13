import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'nricoy.token': token } = parseCookies()

export const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})


api.interceptors.request.use(config => {
    console.log(config)
    return config

})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}

