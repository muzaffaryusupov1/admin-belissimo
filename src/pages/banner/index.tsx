import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Row } from 'antd'
import { IBanner } from '../../helpers/types'
import { getBanner } from '../../service/banner'

const Banner = () => {
	const { data, isLoading } = useQuery<IBanner[], Error>({
		queryKey: ['banner'],
		queryFn: getBanner,
	})

	return (
		<div>
			<Card extra={<Button>+ Add</Button>} loading={isLoading}>
				<Row gutter={[6, 46]}>
					{data?.map(({ id, image }) => (
						<Card
							hoverable
							className='flex flex-col w-[400px] h-[300px]'
							cover={<img src={image} alt='banner' height={200} className='object-contain' />}
							key={id}
						>
							<Button key={'setting'} danger style={{ marginTop: '20px', marginRight: '20px' }}>
								<DeleteOutlined />
							</Button>
							<Button key={'edit'}>
								<EditOutlined />
							</Button>
						</Card>
					))}
				</Row>
			</Card>
		</div>
	)
}

export default Banner
