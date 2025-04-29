import { useMutation } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import Axios from '../api'
import { AuthContextType, IUser, LoginInput } from '../helpers/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
	const [user, setUser] = useState<IUser | null>(null)

	const loginMutation = useMutation({
		mutationFn: async (data: LoginInput) => {
			const response = await Axios.post('/auth', data)
			return response.data
		},
		onSuccess: data => {
			setUser(data)
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
		localStorage.removeItem('token')
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				error: loginMutation.error ? 'Login Failed' : null,
				isLoading: loginMutation.isPending,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within an AuthProvider')
	return context
}
