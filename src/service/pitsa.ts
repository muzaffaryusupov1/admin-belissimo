import Axios from '../api'
import { IProducts } from '../helpers/types'

const getPitsa = async (): Promise<IProducts[]> => {
	const { data } = await Axios.get<IProducts[]>('/pizza')
	return data
}

const createPitsa = async (newProduct: IProducts): Promise<IProducts> => {
	const { data } = await Axios.post<IProducts>('/pizza', newProduct)
	return data
}

const deletePitsa = async (id: number): Promise<IProducts> => {
	const { data } = await Axios.delete<IProducts>(`/pizza/${id}`)
	return data
}

const updatePitsa = async ({
	id,
	updatedData,
}: {
	id: number
	updatedData: Partial<IProducts>
}) => {
	const { data } = await Axios.patch(`/pizza/${id}`, updatedData)
	return data
}

export { createPitsa, deletePitsa, getPitsa, updatePitsa }
