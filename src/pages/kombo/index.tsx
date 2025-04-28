import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Drawer, Form, Image, message, Modal, Space, Table } from 'antd'
import 'antd/dist/reset.css'
import { useState } from 'react'
import { slugify } from '../../helpers/helper'
import { IKombo, IKomboInput } from '../../helpers/types'
import { createKombo, deleteKombo, getKombo, updateKombo } from '../../service/kombo'
import KomboForm from './components/KomboForm'

const Kombo = () => {
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [form] = Form.useForm()
	const title = Form.useWatch('title', form)
	const [isUpdate, setIsUpdate] = useState<number | null>(null)

	const showDeleteConfirm = (id: number) => {
		Modal.confirm({
			icon: <ExclamationCircleFilled />,
			title: 'Are you sure delete this item?',
			content: 'This action cannot be undone.',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteMutation.mutate(id)
			},
			onCancel() {
				console.log('cancel')
			},
		})
	}

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
			render: (item: IKombo) => (
				<Space>
					<Button icon={<EditOutlined />} title='Update' onClick={() => handleEdit(item)} />
					<Button
						icon={<DeleteOutlined />}
						title='Delete'
						danger
						onClick={() => showDeleteConfirm(item.id)}
						loading={deleteMutation.isPending}
					/>
				</Space>
			),
		},
	]

	const { data, isLoading } = useQuery<IKombo[], Error>({
		queryKey: ['combos'],
		queryFn: getKombo,
	})

	const handleCancel = () => {
		setIsModalOpen(false)
		setIsUpdate(null)
		form.resetFields()
	}

	const handleOpen = () => {
		setIsModalOpen(true)
	}

	const handleSubmit = () => {
		form.submit()
	}

	const handleEdit = (item: IKombo) => {
		form.setFieldsValue({
			title: item.title,
			description: item.description,
			price: item.price,
			oldPrice: item.oldPrice,
			showOldPrice: item.showOldPrice,
			discount: item.discount,
			image: item.image,
		})
		setIsUpdate(item.id)
		setIsModalOpen(true)
	}

	const mutation = useMutation<IKombo, Error, IKomboInput>({
		mutationFn: createKombo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['combos'] })
			message.success('Item created was successfully')

			setIsModalOpen(false)
			form.resetFields()
		},
		onError: () => {
			message.error('Failed to create item')
		},
	})

	const handleFinish = (data: IKombo) => {
		if (isUpdate) {
			updateMutation.mutate({ id: isUpdate, updatedData: { ...data, slug: slugify(title) } })
		} else {
			mutation.mutate({ ...data, slug: slugify(title) })
		}
		handleCancel()
	}

	const deleteMutation = useMutation({
		mutationFn: deleteKombo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['combos'] })
			message.success('Item deleted successfully!')
		},
		onError: () => {
			message.error('Failed to delete item!')
		},
	})

	const updateMutation = useMutation({
		mutationFn: updateKombo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['combos'] })
			message.success('Item updated was successfully!')
		},
		onError: () => {
			message.error('Failed to update item!')
		},
	})

	return (
		<div>
			<Card title='Kombo' extra={<Button onClick={handleOpen}>+ Add</Button>}>
				<Table dataSource={data} loading={isLoading} columns={columns} rowKey={'id'} />

				<Drawer
					title={isUpdate ? 'Update product' : 'Add product'}
					onClose={handleCancel}
					open={isModalOpen}
					width={800}
					extra={<Button onClick={handleSubmit}>{isUpdate ? 'Update' : 'Add'}</Button>}
				>
					<Form layout='vertical' form={form} onFinish={handleFinish}>
						<KomboForm />
					</Form>
				</Drawer>
			</Card>
		</div>
	)
}

export default Kombo
