import { createContext, useEffect, useState } from "react";
import { recoverUserInformation, signInRequest } from "../services/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/api";


export const AuthContext = createContext({

})


const setCookieToken = (user, token) => {
    setUserState(user)
    setCookie(undefined, 'nricoy.token', token, {
        maxAge: 60 * 60 * 1, //1 hour
    })
}

export function AuthProvider({ children }) {
    const [userState, setUserState] = useState({})
    const isAutenticated = !!userState
    useEffect(() => {
        const { 'nricoy.token': token } = parseCookies()
        if (token) {
            recoverUserInformation().then(response => {
                const { user, token } = response
                if (user) {
                    setUserState(user)
                    setCookie(undefined, 'nricoy.token', token, {
                        maxAge: 60 * 60 * 1, //1 hour

                    })
                }
                else {
                    Router.push('/auth')
                }

            })
        }
    }, [])
    async function signIn({ email, password }) {


        const { token, user, error } = await signInRequest({ email, password })
        if (!error) {
            setCookie(undefined, 'nricoy.token', token, {
                maxAge: 60 * 60 * 1, //1 hour

            })
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            setUserState(user)
            Router.push('/')
        }
        else return error


    }
    async function signOut() {
        destroyCookie(undefined, 'nricoy.token')
        Router.push('/auth')
    }
    return (
        <AuthContext.Provider value={{ userState, isAutenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}