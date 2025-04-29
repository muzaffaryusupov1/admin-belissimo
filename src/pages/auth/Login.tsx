import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input } from 'antd'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { LoginInput } from '../../helpers/types'

const Login = () => {
	const [form] = Form.useForm()
	const { isLoading, login } = useAuth()

	const navigate = useNavigate()

	const handleFinish = (data: LoginInput) => {
		login(data)
		navigate('/')
		form.submit()
	}

	return (
		<div className='h-full flex items-center justify-center'>
			<Card title='Login' style={{ width: 300 }}>
				<Form
					name='normal_login'
					initialValues={{
						remember: true,
					}}
					onFinish={handleFinish}
					form={form}
				>
					<Form.Item
						name='username'
						rules={[{ required: true, message: 'Please enter your name' }]}
					>
						<Input prefix={<UserOutlined />} placeholder='Name' />
					</Form.Item>
					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Please enter your password' }]}
					>
						<Input prefix={<LockOutlined />} placeholder='password' type='password' />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' style={{ width: '100%' }} loading={isLoading}>
							Login
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}

export default Login
