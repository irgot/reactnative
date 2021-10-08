import { createContext, useEffect, useState } from "react";
import { signInRequest } from "../services/auth";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

export const AuthContext = createContext({

})

export function AuthProvider({ children }) {
    const [userState, setUserState] = useState({})
    const isAutenticated = !!userState
    useEffect(() => {
        const { 'nricoy.token': token } = parseCookies()
        if (token) {

        }
    }, [])
    async function signIn({ email, password }) {


        const { token, user } = await signInRequest({ email, password })
        setCookie(undefined, 'nricoy.token', token, {
            maxAge: 60 * 60 * 1, //1 hour

        })
        setUserState(user)

        Router.push('/dashboard')

    }
    return (
        <AuthContext.Provider value={{ userState, isAutenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}