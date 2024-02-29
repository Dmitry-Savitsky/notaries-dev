import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import { Context } from '..';
import { COMPANY_ROUTE, SERVICES_ROUTE, FAQ_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { CLIENT_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const isAdmin = decodedToken && decodedToken.role === "Admin";

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.clear();
        navigate(MAIN_ROUTE);
    }

    return (
        <Navbar bg="secondary" expand="lg" variant="dark" className="mb-4">
            <Container>
                <Navbar.Brand>
                    <NavLink
                        style={{ fontSize: "24px", color: "white", textDecoration: "none" }}
                        to={MAIN_ROUTE}
                    >
                        Notariuses
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {localStorage.getItem('isAuth') ?
                            <>
                                {isAdmin &&
                                    <Button
                                        className="me-2"
                                        style={{ fontSize: "18px", color: "white" }}
                                        onClick={() => navigate(COMPANY_ROUTE)}
                                        variant='outline-primary'
                                    >
                                        Панель компании
                                    </Button>
                                }
                                {!isAdmin &&
                                    <Button
                                        className="me-2"
                                        style={{ fontSize: "18px", color: "white" }}
                                        onClick={() => navigate(CLIENT_ROUTE)}
                                        variant='outline-primary'
                                    >
                                        Профиль
                                    </Button>
                                }
                                <Button
                                    className="me-2"
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => navigate(FAQ_ROUTE)}
                                    variant='outline-primary'
                                >
                                    FAQ
                                </Button>
                                <Button
                                    className="me-2"
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => navigate(SERVICES_ROUTE)}
                                    variant='outline-primary'
                                >
                                    Услуги
                                </Button>
                                <Button
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => logout()}
                                    variant='outline-primary'
                                >
                                    Выйти
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    className="me-2"
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => navigate(FAQ_ROUTE)}
                                    variant='outline-primary'
                                >
                                    FAQ
                                </Button>
                                <Button
                                    className="me-2"
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => navigate(LOGIN_ROUTE)}
                                    variant='outline-primary'
                                >
                                    Авторизация
                                </Button>
                                <Button
                                    className="me-2"
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => navigate(SERVICES_ROUTE)}
                                    variant='outline-primary'
                                >
                                    Услуги
                                </Button>
                                
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
