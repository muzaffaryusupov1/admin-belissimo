import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { menuItems } from '../../helpers/menuItems'
import { router } from '../../routes'
const { Header, Sider } = Layout
const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const location = useLocation()

	return (
		<Layout>
			<Sider style={{ background: 'white' }} trigger={null} collapsible collapsed={collapsed}>
				<div className='w-full h-10 my-3 mx-auto'>
					<img src='/site-logo.svg' alt='site icon' className='w-full h-full' />
				</div>
				<Menu
					theme='light'
					mode='inline'
					defaultSelectedKeys={[location.pathname]}
					items={menuItems}
				></Menu>
			</Sider>
			<Layout>
				<Header style={{ background: 'white', padding: '20px 0' }}>
					<div className='flex items-center justify-between pr-6'>
						<Button
							type='text'
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							className='text-base w-16 h-16'
						/>
						<Button icon={<LogoutOutlined />}>Log out</Button>
					</div>
				</Header>
				<Content className='my-6 mx-4 p-6 min-h-[280px] bg-white rounded-lg'>
					<Routes>
						{router.map(item => (
							<Route path={item.path} key={item.id} element={item.component} />
						))}
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default AppLayout
