import { useQuery } from '@tanstack/react-query'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { useState } from 'react'
import { isUrlValid } from '../../../helpers/helper'
import { ICategories } from '../../../helpers/types'
import { getCategories } from '../../../service/categories'

const ProductsForm = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	const handleChange = (value: string) => {
		console.log(`selected ${value}`)
		setSelectedCategory(value)
		console.log(selectedCategory)
	}

	const { data, isLoading } = useQuery<ICategories[], Error>({
		queryKey: ['navigation'],
		queryFn: getCategories,
	})

	return (
		<Row gutter={16}>
			<Col span={24}>
				<Form.Item
					label='Category'
					name={'slug'}
					rules={[
						{
							required: true,
							message: 'Input is empty',
						},
					]}
				>
					<Select
						loading={isLoading}
						style={{ width: '100%' }}
						onChange={handleChange}
						options={data
							?.filter(item => item.navigate !== 'combo' && item.navigate !== 'pitsa')
							.map(item => ({
								value: item.navigate,
								label: item.title,
							}))}
					/>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item
					label='Title'
					name={'title'}
					rules={[
						{
							required: true,
							message: 'Input is empty',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item
					label='Description'
					name={'description'}
					rules={[
						{
							message: 'Input is empty',
						},
					]}
				>
					<Input.TextArea rows={4} />
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item
					label='Price'
					name={'price'}
					rules={[
						{
							required: true,
							message: 'Input is empty',
						},
					]}
				>
					<InputNumber style={{ width: '100%' }} controls={false} />
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item
					label='Image'
					name={'image'}
					rules={[
						{
							required: true,
							validator: (_, value) =>
								!value || isUrlValid(value)
									? Promise.resolve()
									: Promise.reject('Invalid URL format'),
						},
					]}
				>
					<Input type='url' />
				</Form.Item>
			</Col>
		</Row>
	)
}

export default ProductsForm
