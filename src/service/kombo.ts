import Axios from '../api'
import { IKombo, IKomboInput } from '../helpers/types'

const getKombo = async (): Promise<IKombo[]> => {
	const { data } = await Axios.get<IKombo[]>('/combos')
	return data
}

const createKombo = async (newKombo: IKomboInput): Promise<IKombo> => {
	const { data } = await Axios.post<IKombo>('/combos', newKombo)
	return data
}

const deleteKombo = async (id: number) => {
	const { data } = await Axios.delete(`/combos/${id}`)
	return data
}

const updateKombo = async ({ id, updatedData }: { id: number; updatedData: Partial<IKombo> }) => {
	const { data } = await Axios.patch(`/combos/${id}`, updatedData)
	return data
}

export { createKombo, deleteKombo, getKombo, updateKombo }
