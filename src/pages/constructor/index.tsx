import { ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	Input,
	InputNumber,
	message,
	Modal,
	Row,
	Space,
} from 'antd'
import { useState } from 'react'
import { isUrlValid } from '../../helpers/helper'
import { IConstructor } from '../../helpers/types'
import {
	createConstructor,
	deleteConstructor,
	getConstructor,
	updateConstructor,
} from '../../service/constructor'

const { Meta } = Card

const Constructor = () => {
	const [open, setOpen] = useState(false)
	const [form] = Form.useForm()
	const queryClient = useQueryClient()
	const [isUpdate, setIsUpdate] = useState<number | null>(null)

	const showDeleteConfirm = (id: number) => {
		Modal.confirm({
			icon: <ExclamationCircleFilled />,
			title: 'Are you sure delete this constructor?',
			content: 'This action cannot be undone.',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteConstructorMutation.mutate(id)
			},
			onCancel() {
				console.log('cancel')
			},
		})
	}

	const { data, isLoading } = useQuery({
		queryKey: ['constructor'],
		queryFn: getConstructor,
	})

	const handleCancel = () => {
		setOpen(false)
		form.resetFields()
		setIsUpdate(null)
	}

	const handleEdit = (data: IConstructor) => {
		form.setFieldsValue({
			title: data.title,
			image: data.image,
			price: data.price,
		})
		setOpen(true)
		setIsUpdate(data.id)
	}

	const handleFinish = (data: IConstructor) => {
		if (isUpdate) {
			updateConstructorMutation.mutate({ id: isUpdate, updatedData: data })
		} else {
			createConstructorMutation.mutate(data)
		}
		handleCancel()
	}

	const createConstructorMutation = useMutation({
		mutationFn: createConstructor,
		onSuccess: () => {
			queryClient.invalidateQueries()
			setOpen(false)
			form.resetFields()
			message.success('Constructor created was successfully')
		},
		onError: () => {
			message.error('Failed to create constructor')
		},
	})

	const deleteConstructorMutation = useMutation({
		mutationFn: deleteConstructor,
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
	})

	const updateConstructorMutation = useMutation({
		mutationFn: updateConstructor,
		onSuccess: () => {
			queryClient.invalidateQueries()
			setOpen(false)
			form.resetFields()
			message.success('Constructor updated was successfully')
		},
		onError: () => {
			message.error('Failed to update constructor')
		},
	})

	const handleSubmit = () => {
		form.submit()
	}

	return (
		<div>
			<Card
				variant='borderless'
				title='Constructors'
				extra={<Button onClick={() => setOpen(true)}>+ Add</Button>}
			>
				<Row gutter={[16, 16]}>
					{data?.map(item => (
						<Col span={24} lg={8} xl={6} md={12} key={item.id}>
							<Card loading={isLoading} hoverable>
								<Image src={item.image} alt={`constructor-img${item.id}`} />
								<Meta title={item.title} description={`${item.price.toLocaleString()} so'm`} />
								<Space className='mt-5'>
									<Button onClick={() => handleEdit(item)}>Update</Button>
									<Button danger onClick={() => showDeleteConfirm(item.id)}>
										Delete
									</Button>
								</Space>
							</Card>
						</Col>
					))}
				</Row>
				<Modal
					maskClosable={false}
					open={open}
					okText={isUpdate ? 'Update' : 'Add'}
					onCancel={handleCancel}
					title={isUpdate ? 'Update Constructor' : 'Add Constructor'}
					animation={true}
					loading={isLoading}
					onOk={handleSubmit}
				>
					<Form form={form} onFinish={handleFinish}>
						<Form.Item
							label='Title'
							name='title'
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input placeholder='Title' />
						</Form.Item>
						<Form.Item
							label='Price'
							name='price'
							rules={[
								{
									required: true,
								},
							]}
						>
							<InputNumber placeholder='Price' controls={false} style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item
							label='Image'
							name='image'
							rules={[
								{
									required: true,
									validator: (_, value) => {
										if (isUrlValid(value)) {
											return Promise.resolve()
										}
										return Promise.reject(new Error('Invalid URL format'))
									},
								},
							]}
						>
							<Input placeholder='Image' />
						</Form.Item>
					</Form>
				</Modal>
			</Card>
		</div>
	)
}

export default Constructor
