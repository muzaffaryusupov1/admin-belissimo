import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { LoginInput } from '../../helpers/types'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../loading'
const { Paragraph } = Typography

const Login = () => {
	const [form] = Form.useForm()
	const { isLoading, login, error } = useAuth()

	const navigate = useNavigate()

	const handleFinish = async (data: LoginInput) => {
		console.log(data)

		await login(data)
		navigate('/')
	}

	return (
		<>
			{isLoading && (
				<div className='fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center'>
					<Loader />
				</div>
			)}
			<div className='h-full flex w-full'>
				<div className='bg-blue-500 w-[60%] login-bg flex items-center justify-center relative'>
					<div className='relative z-20'>
						<Typography.Title level={1} style={{ color: 'white' }}>
							Bellissimo Pizza
						</Typography.Title>
						<Paragraph style={{ color: 'white', fontSize: '16px' }} className='my-5'>
							Bellissimo Pizza - Free pizza delivery in Tashkent
						</Paragraph>
						<Button variant='solid' color='blue'>
							<a href='https://belissimo-clone.vercel.app/' target='_blank'>
								Web-Site
							</a>
						</Button>
					</div>
				</div>
				<div className='flex items-center justify-center mx-auto'>
					<div>
						{error && <Alert message={error} type='error' showIcon closable />}
						<Card style={{ width: 400, marginTop: '20px', border: '1px solid #f3d3ff' }} hoverable>
							<Typography.Title level={4} style={{ marginBottom: '4px' }}>
								Hello!
							</Typography.Title>

							<Paragraph style={{ fontSize: '16px' }}>Sign Up to Get Started</Paragraph>
							<Form
								name='normal_login'
								initialValues={{
									remember: true,
								}}
								onFinish={handleFinish}
								form={form}
							>
								<Form.Item
									name='name'
									rules={[{ required: true, message: 'Please enter your name' }]}
								>
									<Input prefix={<UserOutlined />} placeholder='Name' />
								</Form.Item>
								<Form.Item
									name='password'
									rules={[{ required: true, message: 'Please enter your password' }]}
								>
									<Input prefix={<LockOutlined />} placeholder='Password' type='password' />
								</Form.Item>
								<Form.Item>
									<Button
										type='primary'
										htmlType='submit'
										style={{ width: '100%' }}
										loading={isLoading}
									>
										Login
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
