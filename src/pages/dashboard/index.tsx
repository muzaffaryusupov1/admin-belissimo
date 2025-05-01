import { ArrowUpOutlined } from '@ant-design/icons'
import { useQueries } from '@tanstack/react-query'
import { Card, Col, Row, Statistic, Typography } from 'antd'
import { IContentDashbord } from '../../helpers/types'
import { getBanner } from '../../service/banner'
import { getCategories } from '../../service/categories'
import { getConstructor } from '../../service/constructor'
import { getKombo } from '../../service/kombo'
import { getPitsa } from '../../service/pitsa'
import { getProducts } from '../../service/products'

const Dashboard = () => {
	const result = useQueries({
		queries: [
			{
				queryKey: ['combos'],
				queryFn: getKombo,
			},
			{
				queryKey: ['pizza'],
				queryFn: getPitsa,
			},
			{
				queryKey: ['products'],
				queryFn: getProducts,
			},
			{
				queryKey: ['constructor'],
				queryFn: getConstructor,
			},
			{
				queryKey: ['navigation'],
				queryFn: getCategories,
			},
			{
				queryKey: ['banner'],
				queryFn: getBanner,
			},
		],
	})

	const komboQuery = result[0]
	const pitsaQuery = result[1]
	const productsQuery = result[2]
	const constructorQuery = result[3]
	const categoriesQuery = result[4]
	const bannerQuery = result[5]

	const content: IContentDashbord[] = [
		{
			id: 1,
			title: 'Total Combos',
			loading: komboQuery.isLoading,
			value: komboQuery.data ? komboQuery.data?.length : 0,
		},
		{
			id: 2,
			title: 'Total Pizzas',
			loading: pitsaQuery.isLoading,
			value: pitsaQuery.data ? pitsaQuery.data?.length : 0,
		},
		{
			id: 3,
			title: 'Total Products',
			loading: productsQuery.isLoading,
			value: productsQuery.data ? productsQuery.data?.length : 0,
		},
		{
			id: 4,
			title: 'Total Constructors',
			loading: constructorQuery.isLoading,
			value: constructorQuery.data ? constructorQuery.data?.length : 0,
		},
		{
			id: 5,
			title: 'Total Categories',
			loading: categoriesQuery.isLoading,
			value: categoriesQuery.data ? categoriesQuery.data?.length : 0,
		},
		{
			id: 6,
			title: 'Total Banners',
			loading: bannerQuery.isLoading,
			value: bannerQuery.data ? bannerQuery.data?.length : 0,
		},
	]

	return (
		<div>
			<Typography.Title>Dashboard</Typography.Title>
			<Row gutter={[12, 12]}>
				{content.map(item => (
					<Col span={24} key={item.id} lg={8} md={12}>
						<Card hoverable>
							<Statistic
								title={item.title}
								value={item.value}
								valueStyle={{ color: '#3f8600' }}
								prefix={<ArrowUpOutlined />}
							/>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default Dashboard
