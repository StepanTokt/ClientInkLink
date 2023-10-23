import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    // Проверка на наличие символа '@'
    if (email.includes('@')) {
      return true;
    } else {
      return false;
    }
  }

  const validatePassword = (password) => {
    // Проверка на минимальную длину пароля и наличие минимум одной буквы любого регистра
    // if (password.length >= 6 && password.match(/[a-zA-Z]/)) 
    if (password.length >= 6 )
    {
      return true;
    } else {
      return false;
    }
  }
  

  const click = async () => {
    try {
      if (!validateEmail(email)) {
        setError('Некорректный email. Email должен содержать символ "@"');
        return;
      }

      if (!validatePassword(password)) {
        setError('Некорректный пароль. Пароль должен состоять минимум из 6 символов');
        return;
      }

      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(user)
      user.setIsAuth(true)
      if (email === "stepan_tokt_admin@mail.ru") {
        user.setRole("ADMIN");
      } else {
        user.setRole("USER");
      }

      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
    className="d-flex justify-content-center align-items-center"
    style={{ height: window.innerHeight - 54 }}
  >
    <Card style={{ width: 600 }} className="p-5">
      <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"} </h2>
      <Form className="d-flex flex-column">
        <Form.Group className="mt-3">
          <Form.Control
            placeholder="Введите ваш email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            isInvalid={email !== '' && !validateEmail(email)} // Add isInvalid prop to highlight the field if email is invalid
          />
          {email !== '' && !validateEmail(email) && (
            <Form.Control.Feedback type="invalid">Некорректный email. Email должен содержать символ "@"</Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            isInvalid={password !== '' && !validatePassword(password)} // Add isInvalid prop to highlight the field if password is invalid
          />
          {password !== '' && !validatePassword(password) && (
            <Form.Control.Feedback type="invalid">Некорректный пароль. Пароль должен состоять минимум из 6 символов и 1 буквы</Form.Control.Feedback>
          )}
        </Form.Group>
        {error && <p className="text-danger mt-2">{error}</p>}
        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
          <Button
            variant={"outline-dark"}
            onClick={click}
            disabled={!validateEmail(email) || !validatePassword(password)} // Disable button if email or password is invalid
          >
            {isLogin ? 'Войти' : 'Регистрация'}
          </Button>

            {isLogin ?
              <div className='mt-3'>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
              </div>
              :
              <div className='mt-3'>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            }
          </Row>
        </Form>
      </Card>
    </Container>
  );
})

export default Auth;
