import Axios from '../api'
import { IConstructor } from '../helpers/types'

const getConstructor = async (): Promise<IConstructor[]> => {
	const response = await Axios.get<IConstructor[]>('/constructor')
	return response.data
}

const createConstructor = async (newData: IConstructor): Promise<IConstructor> => {
	const response = await Axios.post<IConstructor>('/constructor', newData)
	return response.data
}

const deleteConstructor = async (id: number): Promise<IConstructor> => {
	const response = await Axios.delete(`/constructor/${id}`)
	return response.data
}

const updateConstructor = async ({
	id,
	updatedData,
}: {
	id: number
	updatedData: IConstructor
}): Promise<IConstructor> => {
	const response = await Axios.patch<IConstructor>(`/constructor/${id}`, updatedData)
	return response.data
}

export { createConstructor, deleteConstructor, getConstructor, updateConstructor }
