import Axios from '../api'
import { IBanner } from '../helpers/types'

const getBanner = async (): Promise<IBanner[]> => {
	const { data } = await Axios.get<IBanner[]>('/banner')
	return data
}

export default getBanner
