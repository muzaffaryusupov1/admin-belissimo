import Axios from '../api'
import { IProducts } from '../helpers/types'

const getProducts = async (): Promise<IProducts[]> => {
	const { data } = await Axios.get<IProducts[]>('/products')
	return data
}

export default getProducts
