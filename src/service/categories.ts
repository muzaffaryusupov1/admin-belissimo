import Axios from '../api'
import { ICategories } from './../helpers/types'

const getCategories = async (): Promise<ICategories[]> => {
	const { data } = await Axios.get<ICategories[]>('/navigation')
	return data
}

const createCategories = async (newCategories: ICategories): Promise<ICategories> => {
	const { data } = await Axios.post<ICategories>('/navigation', newCategories)
	return data
}

const deleteCategories = async (id: number): Promise<ICategories> => {
	const { data } = await Axios.delete<ICategories>(`/navigation/${id}`)
	return data
}

const updateCategories = async ({
	id,
	updatedData,
}: {
	id: number
	updatedData: ICategories
}): Promise<ICategories> => {
	const { data } = await Axios.patch<ICategories>(`/navigation/${id}`, updatedData)
	return data
}

export { createCategories, deleteCategories, getCategories, updateCategories }
