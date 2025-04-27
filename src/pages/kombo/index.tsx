import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Image, Space, Table } from 'antd'
import { IKombo } from '../../helpers/types'
import { getKombo } from '../../service'

const Kombo = () => {
	const columns = [
		{
			title: 'Image',
			dataIndex: 'image',
			render: (image: string) => (
				<Image src={image} width={150} height={70} style={{ objectFit: 'contain' }} />
			),
		},
		{
			title: 'Name',
			dataIndex: 'title',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: (price: number) => <span>{price.toLocaleString()} so'm</span>,
		},
		{
			title: 'More',
			render: () => (
				<Space>
					<Button icon={<EditOutlined />} title='Update' />
					<Button icon={<DeleteOutlined />} title='Delete' danger />
				</Space>
			),
		},
	]

	const { data, isLoading } = useQuery<IKombo[], Error>({
		queryKey: ['combos'],
		queryFn: getKombo,
	})

	return (
		<div>
			<Card title='Kombo' extra={<Button>+ Add</Button>}>
				<Table dataSource={data} loading={isLoading} columns={columns} rowKey={'id'} />
			</Card>
		</div>
	)
}

export default Kombo
