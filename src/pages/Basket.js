import React, { useContext, useState, useEffect } from 'react';
import { Table, Image } from 'react-bootstrap';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { createBasket, updateBasketItems } from '../http/basketApi';
import Button from 'react-bootstrap/Button';

const Basket = () => {
const { user } = useContext(Context);
const navigate = useNavigate();
const [products, setProducts] = useState(
JSON.parse(localStorage.getItem('productsId')) || []
);
const [order, setOrder] = useState([]);
const [adminBasketData, setAdminBasketData] = useState({});
let sum = 0;
let basketId = JSON.parse(localStorage.getItem('basketId'));
console.log(localStorage)
useEffect(() => {
const initialProducts = JSON.parse(localStorage.getItem('productsId')) || [];
setProducts(initialProducts);
    
const handleStorageChange = () => {
  const updatedProducts = JSON.parse(localStorage.getItem('productsId')) || [];
  setProducts(updatedProducts);
};

window.addEventListener('storage', handleStorageChange);

return () => window.removeEventListener('storage', handleStorageChange);
}, []);


  function removeProduct(id) {
    const newProducts = products.filter((prod) => prod.id !== id);
    localStorage.setItem("productsId", JSON.stringify(newProducts));
    localStorage.removeItem("basketId"); // удалить `basketId` из localStorage

    setProducts(newProducts);
  }


  function handleChangeAmount(item, amount) {
    amount = Math.max(amount, 1); // минимальное значение равно 1
    const index = products.findIndex((prod) => prod.id === item.id);
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], amount };
    setProducts(newProducts);
  }


  function basket(item) {
    
    const basketData = { id: item.id, name: item.name, price: item.price, img: item.img, amount: 1 };
    
    // получаем все товары из localStorage
    const products = JSON.parse(localStorage.getItem('productsId')) || [];
    
    // добавляем к каждому товару свойства name и price
    const productsWithData = products.map((product) => {
      const { id, name, price, img, amount } = product;
      return { id, name, price, img, amount, productName: item.name, productPrice: item.price };
    });
    

    if (products.length === 0) {
      alert("Пожалуйста, добавьте товары в корзину")
      return
      }

    // добавляем все товары в массив products в adminBasketData
    const adminBasketData = {
      products: [...productsWithData, basketData],
      sum: sum,
    };
  
    const basketId = localStorage.getItem('basketId');
    if (!basketId) {
      createBasket(basketData)
        .then((response) => {
          const newBasketId = response.data.id;
          localStorage.setItem('basketId', JSON.stringify(newBasketId));
        })
        .catch((error) => console.log(error));
    } else {
      updateBasketItems(basketId, basketData)
        .then(() => console.log('Item added to basket'))
        .catch((error) => console.log(error));
    }
  
    addOrder(adminBasketData);
  }
  
  function addOrder(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('basketId');
    localStorage.removeItem('productsId');
    setOrder(orders);
  
    alert('Заказ оформлен, вы его можете забрать в любой день у нас в магазине');
    const { location } = window;
    location.reload();
  }

  
  



  return (
    <>
      {products.length === 0 && <div class="alert alert-warning">Пожалуйста, добавьте товары в корзину</div>}
      <h2 style={{textAlign: 'center'}}>Cart</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th >Amount</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) =>
            <tr key={item.id}>
              <td>{index+1}</td>
              <td >
                <Image 
                  width={100}
                  height={100}
                  src={process.env.REACT_APP_API_URL + item.img}
                />
              </td>
              <td>{item.name}</td>
              <td>
                <div style={{marginLeft:'-20px', display: 'flex', alignItems: 'center' }}>
                  <Button variant="success" onClick={() => handleChangeAmount(item, item.amount - 1)}>-</Button>
                  <input
                    type="number"
                    min="1"
                    style={{ width: '40px', margin: '0 5px', textAlign: 'center' }}
                    value={item.amount}
                    onChange={(e) => handleChangeAmount(item, +e.target.value)}
                  />
                  <Button  variant="success"  onClick={() => handleChangeAmount(item, item.amount + 1)}>+</Button>
                </div>
              </td>

              <td>{item.sum = item.amount * item.price} руб.</td>
              <td>
                <Button 
                  variant="danger" 
                  onClick={() => removeProduct(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr> 
          )}
          <tr>
            {products.forEach(item=>sum+=item.sum)}
            <div>Сумма заказа: {sum} руб.</div>
            <Button 
              style={{textAlign: 'center', backgroundColor: 'black', color: 'white'}} 
              variant={"outline-dark"} 
              onClick={() => basket({ ...adminBasketData, status: 'pending' })}
            >
              
              Оформить заказ
            </Button>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Basket;
