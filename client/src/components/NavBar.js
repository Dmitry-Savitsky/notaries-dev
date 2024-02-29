import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import { Context } from '..';
import {
    ACCOUNTING_ROUTE,
    EMPLOYEES_ROUTE,
    FAQ_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SERVICES_ROUTE,
    MAIN_ROUTE
} from "../utils/consts";
import { CLIENT_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    var isAdmin = decodedToken && decodedToken.role === "Admin";

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.clear();
        isAdmin = false;
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
                                    <>
                                        <Button
                                            className="me-2"
                                            style={{ fontSize: "18px", color: "white" }}
                                            onClick={() => navigate(EMPLOYEES_ROUTE)}
                                            variant='outline-primary'
                                        >
                                            Нотариусы
                                        </Button>
                                        <Button
                                            className="me-2"
                                            style={{ fontSize: "18px", color: "white" }}
                                            onClick={() => navigate(ACCOUNTING_ROUTE)}
                                            variant='outline-primary'
                                        >
                                            Учет услуг
                                        </Button>
                                    </>
                                }
                                {!isAdmin &&
                                    <>
                                        <Button
                                            className="me-2"
                                            style={{ fontSize: "18px", color: "white" }}
                                            onClick={() => navigate(ACCOUNTING_ROUTE)}
                                            variant='outline-primary'
                                        >
                                            Профиль
                                        </Button>
                                    </>
                                }
                                
                                <Button
                                    className="me-2"
                                    style={{ fontSize: "18px", color: "white" }}
                                    onClick={() => navigate(SERVICES_ROUTE)}
                                    variant='outline-primary'
                                >
                                    Услуги
                                </Button>
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
                                    onClick={() => navigate(SERVICES_ROUTE)}
                                    variant='outline-primary'
                                >
                                    Услуги
                                </Button>

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

                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
