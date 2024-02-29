import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';
import { Form, Button, Overlay } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userApi';
import { useContext, useState } from 'react';
import { Context } from '../index';
import { LOGIN_ROUTE, SERVICES_ROUTE, REGISTRATION_ROUTE, FAQ_ROUTE } from '../utils/consts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {

  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const target = useRef(null);

  const [ClientName, setName] = useState('');
  const [ClientBirth, setBirthDate] = useState('');
  const [ClientAddress, setAddress] = useState('');
  const [ClientPhone, setPhoneNumber] = useState('');
  const [Role, setRole] = useState('Client');
  const [Email, seEmail] = useState('')
  const [Password, setPassword] = useState('')

  const [show, setShow] = React.useState(false);


  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole === 1 ? 'Client' : 'Admin');
  };


  const click = async () => {
    try {

      if (!Email || !Password || (!isLogin && (!ClientName || !Role || !ClientPhone))) {
        toast.error('Please enter all required information', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      let data;

      if (isLogin) {
        data = await login(Email, Password);
      } else {
        data = await registration(ClientName,
          ClientBirth,
          ClientAddress,
          ClientPhone,
          Role,
          Email,
          Password,);
      }

      localStorage.setItem('isAuth', 'true');
      user.setUser(data);
      user.setIsAuth(true);
      navigate(FAQ_ROUTE);

    }
    catch (error) {
      toast.error('Error', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      if (error.response && error.response.status === 500) {
        setShow(true);
      }
      else if (error.response && error.response.data && error.response.data.message === "Client not found") {
        toast.error('Client not found', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <>
      <Row style={{ width: '100%', height: '80vh', overflowX: 'hidden' }}>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h3 style={{ color: 'GrayText' }}>{isLogin ? 'АВТОРИЗАЦИЯ' : 'РЕГИСТРАЦИЯ'}</h3>
          <Form className='col-5'>
            <Form.Group className="mb-2">
              <Form.Control
                className="mb-2"
                type="email"
                value={Email}
                onChange={e => seEmail(e.target.value)}
                placeholder="Email"
              />
              <Form.Control
                className="mb-2"
                type="password"
                value={Password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
              />
              {!isLogin && (
                <>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    value={ClientName}
                    onChange={e => setName(e.target.value)}
                    placeholder="ClientName"
                  />
                  <Form.Control
                    className="mb-2"
                    type="date"
                    value={ClientBirth}
                    onChange={e => setBirthDate(e.target.value)}
                    placeholder="ClientBirth"
                  />
                  <Form.Control
                    className="mb-2"
                    type="text"
                    value={ClientAddress}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="ClientAddress"
                  />
                  <Form.Control
                    className="mb-2"
                    type="text"
                    value={ClientPhone}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="ClientPhone"
                  />
                  <Dropdown className="mb-2">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {Role === 'Client' ? 'Клиент' : 'Администратор'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleRoleChange('Client')}>Клиент</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRoleChange('Admin')}>Администратор</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
              <Button onClick={click} className='me-2' ref={target} variant="dark">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
              {isLogin ? (
                <>
                  <Form.Text className="me-1" style={{ color: "GrayText" }}>Нет аккаунта?</Form.Text>
                  <NavLink className="text-decoration-none" style={{ color: "brown" }} to={REGISTRATION_ROUTE}>
                    Регистрация
                  </NavLink>
                </>
              ) : (
                <>
                  <Form.Text style={{ color: "GrayText" }} className="me-1">
                    Есть аккаунт?
                  </Form.Text>
                  <NavLink className="text-decoration-none" style={{ color: "brown" }} to={LOGIN_ROUTE}>
                    Войти
                  </NavLink>
                </>
              )}
            </Form.Group>
          </Form>

        </Col>
      </Row>


      <Overlay target={target.current} show={show} placement="bottom">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Ошибка
          </div>
        )}
      </Overlay>

      <ToastContainer />
    </>
  );
}

export default observer(Auth);
