import { Banner, Categories, Constructor, Dashboard, Kombo, Pitsa, Products } from '../pages'

export const router = [
	{
		id: 1,
		path: '/',
		component: <Dashboard />,
	},
	{
		id: 2,
		path: '/products',
		component: <Products />,
	},
	{
		id: 3,
		path: '/categories',
		component: <Categories />,
	},
	{
		id: 4,
		path: '/banner',
		component: <Banner />,
	},
	{
		id: 4,
		path: '/kombo',
		component: <Kombo />,
	},
	{
		id: 4,
		path: '/pizza',
		component: <Pitsa />,
	},
	{
		id: 4,
		path: '/constructor',
		component: <Constructor />,
	},
]
