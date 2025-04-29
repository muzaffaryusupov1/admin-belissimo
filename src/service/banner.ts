import Axios from '../api'
import { IBanner } from '../helpers/types'

const getBanner = async (): Promise<IBanner[]> => {
	const { data } = await Axios.get<IBanner[]>('/banner')
	return data
}

const createBanner = async (newBanner: IBanner): Promise<IBanner> => {
	const { data } = await Axios.post<IBanner>('/banner', newBanner)
	return data
}

const deleteBanner = async (id: number): Promise<IBanner> => {
	const { data } = await Axios.delete<IBanner>(`/banner/${id}`)
	return data
}

const updateBanner = async ({
	id,
	updatedBanner,
}: {
	id: number
	updatedBanner: IBanner
}): Promise<IBanner> => {
	const { data } = await Axios.patch<IBanner>(`/banner/${id}`, updatedBanner)
	return data
}

export { createBanner, deleteBanner, getBanner, updateBanner }
