import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Drawer, Form, Image, message, Modal, Space, Table } from 'antd'
import { useState } from 'react'
import { IProducts } from '../../helpers/types'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../service/products'
import ProductsForm from './components/ProductsForm'

const Products = () => {
	const [productsOpen, setProductsOpen] = useState(false)
	const [form] = Form.useForm()
	const queryClient = useQueryClient()
	const [isUpdate, setIsUpdate] = useState<number | null>(null)

	const showDeleteConfirm = (id: number) => {
		Modal.confirm({
			icon: <ExclamationCircleFilled />,
			title: 'Are you sure delete this product?',
			content: 'This action cannot be undone.',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteMutationProducts.mutate(id)
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

	const closeProductsModal = () => {
		setProductsOpen(false)
	}

	const { data, isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	})

	const handleCancel = () => {
		setProductsOpen(false)
		setIsUpdate(null)
		form.resetFields()
	}

	const productFinish = (data: IProducts) => {
		if (isUpdate) {
			updateMutationProduct.mutate({
				id: isUpdate,
				updatedProduct: data,
			})
		} else {
			productCreate.mutate(data)
		}
		handleCancel()
	}

	const handleUpdate = (data: IProducts) => {
		form.setFieldsValue({
			title: data.title,
			description: data.description,
			price: data.price,
			image: data.image,
			slug: data.slug,
		})
		setIsUpdate(data.id)
		setProductsOpen(true)
	}

	const productCreate = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			message.success('Product created was successfully')
			form.resetFields()
			closeProductsModal()
		},
		onError: () => {
			message.error('Failed to create product')
		},
	})

	const deleteMutationProducts = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			message.success('Product deleted was successfully')
		},
		onError: () => {
			message.error('Failed to delete product')
		},
	})

	const updateMutationProduct = useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			message.success('Product updated was successfully')
		},
		onError: () => {
			message.error('Failed to update product')
		},
	})

	const handleSubmit = () => {
		form.submit()
	}

	return (
		<div>
			<Card title='Products' extra={<Button onClick={() => setProductsOpen(true)}>+ Add</Button>}>
				<Table
					dataSource={data}
					columns={columns}
					loading={isLoading}
					rowKey='id'
					bordered
					scroll={{ x: 'max-content' }}
				/>
				<Drawer
					onClose={closeProductsModal}
					title={isUpdate ? 'Update product' : 'Add product'}
					open={productsOpen}
					width={800}
					extra={<Button onClick={handleSubmit}>{isUpdate ? 'Update' : 'Add'}</Button>}
				>
					<Form layout='vertical' form={form} onFinish={productFinish}>
						<ProductsForm />
					</Form>
				</Drawer>
			</Card>
		</div>
	)
}

export default Products
