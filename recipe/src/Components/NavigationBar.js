import React from 'react';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './CSSComponents/NavigationBar.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router';
import logo from '../Image/Logo.png';

export const NavigationBar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [user, setUser] = useState(undefined);
	const navigate = useNavigate();
	const logoStyle = {
		width: '50px',
		height: '50px', 
		marginLeft: "50px"
	};

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				navigate('/');
			}
		});
	}, []);

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="md"
				bg="dark"
				variant="dark"
				sticky="top"
				className={scrolled ? 'scrolled' : ''}
			>
				<Navbar.Brand href="/homepage">
					<div>
						<img src={logo} alt="Logo" style={logoStyle} />
					</div>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav
							style={{
								color: 'white',
								marginRight: '10px',
								fontWeight: 'bold',
								marginTop: '8px',
							}}
						>
							Welcome, {user?.displayName}
						</Nav>
						<Dropdown align="end">
							<Dropdown.Toggle
								variant="light"
								id="profile-dropdown"
								style={{
									// Updated inline styling for the profile circle
									backgroundColor: '#653030',
									borderRadius: '50%',
									width: '40px',
									height: '40px',
									padding: '0',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginRight: '20px',
								}}
							>
								<i className="fa fa-user" style={{ color: 'white' }} />
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="/profile">Profile</Dropdown.Item>
								<Dropdown.Item onClick={() => signOut(auth)}>
									Sign Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default NavigationBar;
