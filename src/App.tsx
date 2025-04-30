import { AppLayout } from './components'
import useIsAuth from './hooks/useIsAuth'
import { Login } from './pages'

const App = () => {
	const isAuth = useIsAuth()
	return <>{isAuth ? <AppLayout /> : <Login />}</>
}

export default App
