import {
	CloseOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Layout, Menu } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { menuItems } from '../../helpers/menuItems'
import { useAuth } from '../../hooks/useAuth'
import { router } from '../../routes'

const { Header, Sider } = Layout

const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const [active, setActive] = useState(false)
	const location = useLocation()
	const { logout } = useAuth()

	const handleClose = () => {
		setActive(false)
	}

	return (
		<Layout style={{ minHeight: '100%' }}>
			<Sider
				className='max-sm:hidden'
				theme='dark'
				style={{
					minHeight: '100%',
					paddingLeft: '20px',
					paddingRight: '20px',
				}}
				width={280}
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className='w-full h-10 my-3 mx-auto'>
					<img src='/site-logo.svg' alt='site icon' className='w-full h-full' />
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[location.pathname]}
					items={menuItems}
				></Menu>
			</Sider>
			<Drawer
				title='Menu'
				open={active}
				closable
				onClose={handleClose}
				placement='left'
				style={{ background: '#001529', color: 'white' }}
				closeIcon={<CloseOutlined style={{ color: 'white' }} />}
			>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[location.pathname]}
					items={menuItems}
					onClick={handleClose}
				></Menu>
			</Drawer>
			<Layout>
				<Header style={{ background: 'white', padding: '20px 0' }}>
					<div className='flex items-center justify-between pr-6'>
						<Button
							type='text'
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							className='text-base w-16 h-16 text-white custom-button'
						/>
						<Button
							type='text'
							icon={<MenuOutlined />}
							onClick={() => setActive(true)}
							className='text-base w-16 h-16 text-white mobile-button'
						/>
						<Button icon={<LogoutOutlined />} onClick={logout}>
							Log out
						</Button>
					</div>
				</Header>
				<Content className='my-6 mx-4 p-2 min-h-[280px] rounded-lg max-sm:p-0.5 max-sm:mx-1'>
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
