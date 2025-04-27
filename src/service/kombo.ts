import Axios from '../api'
import { IKombo } from '../helpers/types'

const getKombo = async (): Promise<IKombo[]> => {
	const { data } = await Axios.get<IKombo[]>('/combos')
	return data
}

export default getKombo
