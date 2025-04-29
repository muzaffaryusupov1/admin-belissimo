import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Col, Form, Input, message, Modal, Row, Space, Table } from 'antd'
import { useState } from 'react'
import { isValidSlug, slugify } from '../../helpers/helper'
import { ICategories } from '../../helpers/types'
import {
	createCategories,
	deleteCategories,
	getCategories,
	updateCategories,
} from '../../service/categories'

const Categories = () => {
	const [form] = Form.useForm()
	const title = Form.useWatch('title', form)
	const queryClient = useQueryClient()
	const [isUpdate, setIsUpdate] = useState<number | null>(null)

	const showDeleteConfirm = (id: number) => {
		Modal.confirm({
			icon: <ExclamationCircleFilled />,
			title: 'Are you sure delete this category?',
			content: 'This action cannot be undone.',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteCategoriesMutation.mutate(id)
			},
			onCancel() {
				console.log('cancel')
			},
		})
	}

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
			render: (item: ICategories) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => handleUpdate(item)} />
					<Button icon={<DeleteOutlined />} danger onClick={() => showDeleteConfirm(item.id)} />
				</Space>
			),
		},
	]

	const handleFinish = (data: ICategories) => {
		if (isUpdate) {
			updateCategoriesMutation.mutate({
				id: isUpdate,
				updatedData: { ...data, navigate: slugify(title) },
			})
		} else {
			createCategoriesMutation.mutate({ ...data, navigate: slugify(title) })
		}
	}

	const handleUpdate = (data: ICategories) => {
		form.setFieldsValue({ id: data.id, title: data.title, slug: data.navigate })
		setIsUpdate(data.id)
	}

	const handleCancel = () => {
		form.resetFields()
		setIsUpdate(null)
	}

	const { data, isLoading } = useQuery<ICategories[], Error>({
		queryKey: ['navigation'],
		queryFn: getCategories,
	})

	const createCategoriesMutation = useMutation({
		mutationFn: createCategories,
		onSuccess: () => {
			form.resetFields()
			queryClient.invalidateQueries({ queryKey: ['navigation'] })
			message.success('Category created was successfully')
		},
		onError: () => {
			message.error('Failed to create category')
		},
	})

	const deleteCategoriesMutation = useMutation({
		mutationFn: deleteCategories,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['navigation'] })
			message.success('Category deleted was successfully')
		},
		onError: () => {
			message.error('Failed to deleted category')
		},
	})

	const updateCategoriesMutation = useMutation({
		mutationFn: updateCategories,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['navigation'] })
			form.resetFields()
			message.success('Category updated was successfully')
		},
		onError: () => {
			message.error('Failed to updated category')
		},
	})

	return (
		<div>
			<Card title='Categories'>
				<Row gutter={[16, 16]}>
					<Col span={8} className='border-r border-solid border-[#f0f0f0]'>
						<Form onFinish={handleFinish} layout='vertical' form={form}>
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
							<Form.Item
								label='Link'
								name='slug'
								rules={[
									{
										type: 'string',
										required: true,
										message: 'Is not slug',
										validator: (_, value) =>
											!value || isValidSlug(value)
												? Promise.resolve()
												: Promise.reject('Invalid slug format'),
									},
								]}
							>
								<Input placeholder='kombo' />
							</Form.Item>
							<Form.Item>
								<Space>
									<Button type='primary' htmlType='submit'>
										Add categories
									</Button>
									{isUpdate && <Button onClick={handleCancel}>Cancel</Button>}
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
