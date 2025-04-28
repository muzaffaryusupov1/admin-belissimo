import {
	AlignLeftOutlined,
	AreaChartOutlined,
	HomeOutlined,
	InboxOutlined,
	ProductOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router'
import PizzaIcon from '/pizza.svg'

export const menuItems = [
	{
		key: '/',
		icon: <HomeOutlined />,
		label: <Link to='/'>Dashboard</Link>,
	},
	{
		key: '/kombo',
		icon: <InboxOutlined />,
		label: <Link to='/kombo'>Kombo</Link>,
	},
	{
		key: '/pizza',
		icon: <img src={PizzaIcon} alt='pizza icon' className='w-2' />,
		label: <Link to='/pizza'>Pitsa</Link>,
	},
	{
		key: '/products',
		icon: <ProductOutlined />,
		label: <Link to='/products'>Products</Link>,
	},
	{
		key: '/categories',
		icon: <AlignLeftOutlined />,
		label: <Link to='/categories'>Categories</Link>,
	},
	{
		key: '/banner',
		icon: <AreaChartOutlined />,
		label: <Link to='/banner'>Banner</Link>,
	},
]
