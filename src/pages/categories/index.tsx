import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { ICategories } from '../../helpers/types'
import { getCategories } from '../../service/categories'

const Categories = () => {
	const [form] = Form.useForm()

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
		},
		{
			title: 'Nomi',
			dataIndex: 'title',
		},
		{
			title: 'Link',
			dataIndex: 'navigate',
		},

		{
			title: "Qo'shimcha",
			render: () => (
				<Space>
					<Button icon={<EditOutlined />} />
					<Button icon={<DeleteOutlined />} danger />
				</Space>
			),
		},
	]

	const { data, isLoading } = useQuery<ICategories[], Error>({
		queryKey: ['navigation'],
		queryFn: getCategories,
	})

	return (
		<div>
			<Card title='Categories'>
				<Row gutter={[16, 16]}>
					<Col span={8} className='border-r border-solid border-[#f0f0f0]'>
						<Form layout='vertical' form={form}>
							<Form.Item
								label='Name'
								name='title'
								rules={[
									{
										type: 'string',
										required: true,
										message: 'Is not url',
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item label='Link' name='slug'>
								<Input placeholder='kombo' disabled />
							</Form.Item>
							<Form.Item>
								<Space>
									<Button type='primary' htmlType='submit'>
										Add categories
									</Button>
									<Button>Cancel</Button>
								</Space>
							</Form.Item>
						</Form>
					</Col>
					<Col span={16}>
						<Table dataSource={data} loading={isLoading} columns={columns} rowKey={'id'} />
					</Col>
				</Row>
			</Card>
		</div>
	)
}

export default Categories
