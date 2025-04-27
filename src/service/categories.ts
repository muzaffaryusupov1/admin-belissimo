import Axios from '../api'
import { ICategories } from '../helpers/types'

const getCategories = async (): Promise<ICategories[]> => {
	const { data } = await Axios.get<ICategories[]>('/navigation')
	return data
}

export { getCategories }
