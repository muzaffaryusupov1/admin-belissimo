import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Form, Input, message, Modal, Row } from 'antd'
import { useState } from 'react'
import { isUrlValid } from '../../helpers/helper'
import { IBanner } from '../../helpers/types'
import { createBanner, deleteBanner, getBanner, updateBanner } from '../../service/banner'

const Banner = () => {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)
	const [form] = Form.useForm()
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
				deleteBannerMutation.mutate(id)
			},
			onCancel() {
				console.log('cancel')
			},
		})
	}

	const { data, isLoading } = useQuery<IBanner[], Error>({
		queryKey: ['banner'],
		queryFn: getBanner,
	})

	const handleFinish = (data: IBanner) => {
		if (isUpdate) {
			updateBannerMutation.mutate({ id: isUpdate, updatedBanner: data })
		} else {
			createBannerMutation.mutate(data)
		}
		handleCancel()
	}

	const handleUpdate = (data: IBanner) => {
		setOpen(true)
		setIsUpdate(data.id)
		form.setFieldsValue({ image: data.image })
	}

	const createBannerMutation = useMutation({
		mutationFn: createBanner,
		onSuccess: () => {
			queryClient.invalidateQueries()
			message.success('Banner created was successfully')
			setOpen(false)
			form.resetFields()
		},
		onError: () => {
			message.error('Failed to create category')
		},
	})

	const deleteBannerMutation = useMutation({
		mutationFn: deleteBanner,
		onSuccess: () => {
			queryClient.invalidateQueries()
			form.resetFields()
			message.success('Banner deleted was successfully')
		},
		onError: () => {
			message.error('Failed to delete category')
		},
	})

	const updateBannerMutation = useMutation({
		mutationFn: updateBanner,
		onSuccess: () => {
			queryClient.invalidateQueries()
			message.success('Banner updated was successfully')
		},
		onError: () => {
			message.error('Failed to update category')
		},
	})

	const handleSubmit = () => {
		form.submit()
	}

	const handleCancel = () => {
		setOpen(false)
		setIsUpdate(null)
		form.resetFields()
	}

	return (
		<div>
			<Card extra={<Button onClick={() => setOpen(true)}>+ Add</Button>} loading={isLoading}>
				<Row gutter={6}>
					{data?.map(item => (
						<Card
							hoverable
							style={{ marginLeft: '20px' }}
							className='flex flex-col w-[350px] h-[250px]'
							cover={<img src={item.image} alt='banner' height={200} className='object-contain' />}
							key={item.id}
						>
							<Button
								key={'setting'}
								danger
								style={{ marginTop: '20px', marginRight: '20px' }}
								onClick={() => showDeleteConfirm(item.id)}
							>
								<DeleteOutlined />
							</Button>
							<Button key={'edit'} onClick={() => handleUpdate(item)}>
								<EditOutlined />
							</Button>
						</Card>
					))}
				</Row>
				<Modal
					maskClosable={false}
					onOk={handleSubmit}
					open={open}
					okText={isUpdate ? 'Update' : 'Add'}
					onCancel={handleCancel}
					title={isUpdate ? 'Update Banner' : 'Add Banner'}
					animation={true}
					loading={isLoading}
				>
					<Form form={form} onFinish={handleFinish}>
						<Form.Item
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

export default Banner
