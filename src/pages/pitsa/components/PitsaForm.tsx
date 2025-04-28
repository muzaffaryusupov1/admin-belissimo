import { Col, Form, Input, InputNumber, Row } from 'antd'
import { isUrlValid } from '../../../helpers/helper'

const PitsaForm = () => {
	return (
		<Row gutter={16}>
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
							required: true,
							message: 'Input is empty',
							min: 30,
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

export default PitsaForm
