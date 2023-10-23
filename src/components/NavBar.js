import React, { useContext,useState, useEffect } from 'react';
import { Context } from '../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import {
  ADMIN_ROUTE,
  ALL_INFORMATION,
  BASKET_ROUTE,
  CONTACTS,
  DELIVERY,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts';
import Button from 'react-bootstrap/Button';
import './NavBar.css';
import Basket from '../pages/Basket';
const NavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('user');
    localStorage.removeItem('productsId');
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { role, ...rest } = JSON.parse(storedUser);
      user.setUser(rest);
      user.setIsAuth(true);
      user.setRole(role);
    }
  }, [user]);


  const handleItemClick = () => {
    window.location.reload();
  };

  return (
    <Navbar bg="black" variant="dark">
      <Container>
        <NavLink
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '24px',
            marginLeft: '-95px',
          }}
          to={SHOP_ROUTE}
        >
          ИнкЛинк
        </NavLink>

        {user.isAuth && user.Role === 'ADMIN' ? (
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={"outline-light"}
              style={{ marginRight: '15px' }}
              onClick={() => navigate(ALL_INFORMATION)}
            >
              О Нас
            </Button>
            <Button
              variant={"outline-light"}
              style={{ marginRight: '15px' }}
              onClick={() => navigate(DELIVERY)}
            >
              Доставка
            </Button>
            <Button
             variant={"outline-light"}
              onClick={() => navigate(CONTACTS)}
            >
              Контакты
            </Button>
            <Button
              variant={"outline-light"}
              style={{ marginRight: '0px', marginLeft: '15px' }}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ Панель
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => {
                logOut();
                navigate(LOGIN_ROUTE);
              }}
              style={{ marginRight: '-100px', marginLeft: '15px' }}
            >
              Выйти
            </Button>
          </Nav>
        ) : user.isAuth && user.Role === 'USER' ? (
          <Nav className="ml-auto" style={{ color: 'white' }}>
            
            <Button
              variant={"outline-light"}
              style={{ marginRight: '15px', width:"60px"}}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              <FaShoppingCart></FaShoppingCart>
              
            </Button>
            <Button
              variant={"outline-light"}
              style={{ marginRight: '15px' }}
              onClick={() => navigate(ALL_INFORMATION)}
            >
              О Нас
            </Button>
            <Button
              variant={"outline-light"}
              style={{ marginRight: '15px' }}
              onClick={() => navigate(DELIVERY)}
            >
              Доставка
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(CONTACTS)}
            >
              Контакты
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => {
                logOut();
                navigate(LOGIN_ROUTE);
              }}
              style={{ marginRight: '-100px', marginLeft: '15px' }}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav>
            <Button
              style={{ marginRight: '-100px', marginLeft: '15px' }}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
          
        )}
              {/* <Basket cartItems={cartItems} /> */}
      </Container>








    </Navbar>
  );
};

export default NavBar;
