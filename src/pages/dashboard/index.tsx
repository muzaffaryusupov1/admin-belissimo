import { useQueries } from '@tanstack/react-query'
import { Card, Col, Row, Skeleton, Typography } from 'antd'
import { IContentDashbord } from '../../helpers/types'
import { getBanner, getKombo, getProducts } from '../../service'
import getCategories from '../../service/categories'
const Dashboard = () => {
	const result = useQueries({
		queries: [
			{
				queryKey: ['combos'],
				queryFn: getKombo,
			},
			{
				queryKey: ['products'],
				queryFn: getProducts,
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
	const productsQuery = result[1]
	const categoriesQuery = result[2]
	const bannerQuery = result[3]

	const content: IContentDashbord[] = [
		{
			id: 1,
			title: 'Combos',
			loading: komboQuery.isLoading,
			value: komboQuery.data ? komboQuery.data?.length : 0,
		},
		{
			id: 2,
			title: 'Products',
			loading: productsQuery.isLoading,
			value: productsQuery.data ? productsQuery.data?.length : 0,
		},
		{
			id: 3,
			title: 'Categories',
			loading: categoriesQuery.isLoading,
			value: categoriesQuery.data ? categoriesQuery.data?.length : 0,
		},
		{
			id: 4,
			title: 'Banner',
			loading: bannerQuery.isLoading,
			value: bannerQuery.data ? bannerQuery.data?.length : 0,
		},
	]

	return (
		<div>
			<Typography.Title>Dashboard</Typography.Title>
			<Row gutter={[12, 12]}>
				{content.map(item => (
					<Col span={6} key={item.id}>
						<Card>
							<Typography.Title level={3}>{item.title}</Typography.Title>
							<Skeleton active paragraph={false} loading={item.loading}>
								<Typography.Paragraph style={{ fontSize: '18px' }}>
									{item.value}
								</Typography.Paragraph>
							</Skeleton>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default Dashboard
