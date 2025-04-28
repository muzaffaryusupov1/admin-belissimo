import Axios from '../api'
import { IProducts } from '../helpers/types'

const getProducts = async (): Promise<IProducts[]> => {
	const { data } = await Axios.get<IProducts[]>('/products')
	return data
}

const createProduct = async (newProduct: IProducts): Promise<IProducts> => {
	const { data } = await Axios.post<IProducts>('/products', newProduct)
	return data
}

const deleteProduct = async (id: number): Promise<IProducts> => {
	const { data } = await Axios.delete<IProducts>(`/products/${id}`)
	return data
}

const updateProduct = async ({
	id,
	updatedProduct,
}: {
	id: number
	updatedProduct: Partial<IProducts>
}) => {
	const { data } = await Axios.patch(`/products/${id}`, updatedProduct)
	return data
}

export { createProduct, deleteProduct, getProducts, updateProduct }
