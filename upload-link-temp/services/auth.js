import { v4 as uuid } from "uuid";
import { api } from "./api";
const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest({ email, password }) {
    // await delay()
    // return {
    //     token: uuid(),
    //     user: {
    //         name: "Igor Souza",
    //         email: 'igor.souza@ricoy.com.br',
    //         avatar_url: 'https://github.com/irgot.png'
    //     }
    // }
    const response = await fetch('/api/auth', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
        // url: 'http://localhost:3000/api/auth'
    })
    const authInformation = await response.json()
    // localStorage.setItem("token", data.token)

    return authInformation

}


export async function recoverUserInformation() {
    // await delay()

    const response = await api.get('me')
    // const response = await fetch('/api/me', {
    //     method: "GET",
    //     headers: {
    //         "ASDF": "ASDF"
    //     }
    // })
    // console.log(response.data)
    const newTokenInformation = response.data
    return (newTokenInformation)
    return {
        token: uuid(),
        user: {
            name: "Igor Souza",
            email: 'igor.souza@ricoy.com.br',
            avatar_url: 'https://github.com/irgot.png',
            displayName: "Bgor Souza"
        }
    }

}