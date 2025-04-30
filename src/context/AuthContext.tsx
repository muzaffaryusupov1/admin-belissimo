import { useMutation } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useState } from 'react'
import Axios from '../api'
import { getLocale } from '../helpers/helper'
import { AuthContextType, IUser, LoginInput } from '../helpers/types'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
	const [user, setUser] = useState<IUser | null>(null)
	const initialToken = getLocale('token') || ''
	const [token, setToken] = useState<string>(initialToken)

	const loginMutation = useMutation({
		mutationFn: async (data: LoginInput) => {
			const response = await Axios.post('/auth', data)
			return response.data
		},
		onSuccess: data => {
			setUser(data)
			setToken(data.token)
			localStorage.setItem('token', data.token)
		},
		onError: () => {
			console.log('Error')
		},
	})

	const login = (data: LoginInput) => {
		loginMutation.mutate(data)
	}

	const logout = () => {
		setUser(null)
		setToken('')
		localStorage.removeItem('token')
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				user,
				login,
				logout,
				error: loginMutation.error ? 'Email or Password is invalid' : null,
				isLoading: loginMutation.isPending,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
