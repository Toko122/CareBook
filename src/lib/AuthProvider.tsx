'use client'

import { jwtDecode } from 'jwt-decode'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface DecodedToken {
    exp: number
}

interface AuthProviderTypes {
    token: string | null,
    userId: string | null,
    login: (token: string, userId: string) => void,
    logout: () => void,
    isLoggedIn: boolean
}

const AuthContext = createContext<AuthProviderTypes | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider = ({children}: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const login = (token: string, userId: string) => {
         localStorage.setItem('token', token)
         localStorage.setItem('userId', userId)
         setToken(token)
         setUserId(userId)
         setIsLoggedIn(true)
    }

    const logout = () => {
       localStorage.removeItem('token')
       localStorage.removeItem('userId')
       setToken(null)
       setUserId(null)
       setIsLoggedIn(false)
    }
    
       const autoLogout = (token: string) => {
          const decoded = jwtDecode<DecodedToken>(token)
          const currentTime = Date.now() / 1000
          if(decoded.exp && decoded.exp < currentTime){
            logout()
          }
       }

       useEffect(() => {
          const storedToken = localStorage.getItem('token')
          const storedUserId = localStorage.getItem('userId')
          if(!storedToken || !storedUserId) return;
            
             autoLogout(storedToken)
             setToken(storedToken)
             setUserId(storedUserId)
             setIsLoggedIn(true)
          
       }, [])
   
  return (
    <AuthContext.Provider value={{token, userId, login, logout, isLoggedIn}}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
   const context = useContext(AuthContext)

   if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}