import { ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Col, Drawer, Form, Image, message, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { IProducts } from '../../helpers/types'
import { createPitsa, deletePitsa, getPitsa, updatePitsa } from '../../service/pitsa'
import PitsaForm from './components/PitsaForm'

const { Meta } = Card

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
			<Card
				title='Pizza'
				extra={<Button onClick={() => setPitsaOpen(true)}>+ Add</Button>}
				loading={isLoading}
			>
				<Row gutter={[16, 16]}>
					{data?.map(item => (
						<Col span={24} key={item.id} lg={8} xl={6} md={12}>
							<Card loading={isLoading} hoverable>
								<Image src={item.image} alt={`constructor-img${item.id}`} />
								<Meta title={item.title} description={`${item.price.toLocaleString()} so'm`} />
								<Space className='mt-5'>
									<Button onClick={() => handleUpdate(item)}>Update</Button>
									<Button danger onClick={() => showDeleteConfirm(item.id)}>
										Delete
									</Button>
								</Space>
							</Card>
						</Col>
					))}
				</Row>

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
