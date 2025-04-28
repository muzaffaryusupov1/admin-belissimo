import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Drawer, Form, Image, message, Modal, Space, Table } from 'antd'
import { useState } from 'react'
import { IProducts } from '../../helpers/types'
import { createPitsa, deletePitsa, getPitsa, updatePitsa } from '../../service/pitsa'
import PitsaForm from './components/PitsaForm'

const Pitsa = () => {
	const [pitsaOpen, setPitsaOpen] = useState(false)
	const [form] = Form.useForm()
	const queryClient = useQueryClient()
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
				deleteMutationPitsa.mutate(id)
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
			render: (item: IProducts) => (
				<Space>
					<Button icon={<EditOutlined />} title='Update' onClick={() => handleUpdate(item)} />
					<Button
						icon={<DeleteOutlined />}
						title='Delete'
						danger
						onClick={() => showDeleteConfirm(item.id)}
					/>
				</Space>
			),
		},
	]

	const closePitsaModal = () => {
		setPitsaOpen(false)
	}

	const handleCancel = () => {
		setPitsaOpen(false)
		setIsUpdate(null)
		form.resetFields()
	}

	const { data, isLoading } = useQuery({
		queryKey: ['pizza'],
		queryFn: getPitsa,
	})

	const handleUpdate = (data: IProducts) => {
		form.setFieldsValue({
			title: data.title,
			description: data.description,
			price: data.price,
			image: data.image,
		})
		setIsUpdate(data.id)
		setPitsaOpen(true)
	}

	const handleFinish = (data: IProducts) => {
		if (isUpdate) {
			updateMutationPitsa.mutate({ id: isUpdate, updatedData: data })
		} else {
			pitsaCreate.mutate(data)
		}
		handleCancel()
	}

	const pitsaCreate = useMutation({
		mutationFn: createPitsa,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['pizza'] })
			message.success('Item created was successfully')
			form.resetFields()
			closePitsaModal()
		},
		onError: () => {
			message.error('Failed to create item')
		},
	})

	const deleteMutationPitsa = useMutation({
		mutationFn: deletePitsa,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['pizza'] })
			message.success('Item deleted was successfully')
		},
		onError: () => {
			message.error('Failed to delete item')
		},
	})

	const updateMutationPitsa = useMutation({
		mutationFn: updatePitsa,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['pizza'] })
			message.success('Item updated was successfully')
		},
		onError: () => {
			message.error('Failed to update item')
		},
	})

	const handleSubmit = () => {
		form.submit()
	}

	return (
		<div>
			<Card title='Pizza' extra={<Button onClick={() => setPitsaOpen(true)}>+ Add</Button>}>
				<Table dataSource={data} columns={columns} loading={isLoading} rowKey='id' />
				<Drawer
					onClose={closePitsaModal}
					title={isUpdate ? 'Update pizza' : 'Add pizza'}
					open={pitsaOpen}
					width={800}
					extra={<Button onClick={handleSubmit}>{isUpdate ? 'Update' : 'Add'}</Button>}
				>
					<Form layout='vertical' form={form} onFinish={handleFinish}>
						<PitsaForm />
					</Form>
				</Drawer>
			</Card>
		</div>
	)
}

export default Pitsa
