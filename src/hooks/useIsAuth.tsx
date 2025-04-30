import { useMemo } from 'react'
import { useAuth } from './useAuth'

function useIsAuth() {
	const { token } = useAuth()
	return useMemo(() => !!token.trim().length, [token])
}

export default useIsAuth
