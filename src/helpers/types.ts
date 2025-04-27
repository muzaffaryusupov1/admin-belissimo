export interface IContentDashbord {
	id: number
	title: string
	loading: boolean
	value: number
}

export interface IProducts {
	id: number
	title: string
	description: string
	price: number
	oldPrice: number
	slug: string
	image: string
}

export interface IKomboInput {
	title: string
	description: string
	price: number
	oldPrice: number
	slug: string
	image: string
	showOldPrice: boolean
	discount: number
}

export interface IKombo extends IProducts {
	showOldPrice: boolean
	discount: number
}

export type IBanner = {
	id: number
	image: string
}

export type ICategories = {
	id: number
	title: string
	navigate: string
}
