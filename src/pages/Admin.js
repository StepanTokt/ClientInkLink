import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import Basket from "./Basket";
import { Table, Image } from "react-bootstrap";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(orders);
  }, []);

  const handleRemove = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  const toggleOrderStatus = (orderIndex, productIndex) => {
    const newOrders = [...orders];
    const currentStatus = newOrders[orderIndex].products[productIndex].status;
    newOrders[orderIndex].products[productIndex].status = currentStatus === "Готов" ? "В процессе" : "Готов";
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>
      <Table bordered style={{ marginTop: "30px", textAlign: "center" }}>
        <thead style={{ background: "#343a40", color: "#fff" }}>
          <tr>
            <th>#</th>
            {/* <th># Заказа</th> */}
            <th># Товара</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Итоговая цена</th>
            
            <th>Готовность</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, orderIndex) => (
            <React.Fragment key={`order-${orderIndex}`}>
              {orderIndex !== 0 && <tr><td colSpan="9"></td></tr>}
              {order.products.slice(0, -1).map((product, productIndex) => (
                <tr key={`${orderIndex}-${productIndex}`}>
                  {productIndex === 0 && (
                    <td rowSpan={order.products.length - 1}>{orderIndex + 1}</td>
                  )}
                  {/* <td>{orderIndex + 1}</td> */}
                  <td>{productIndex + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.amount}</td>
                  {productIndex === 0 && (
                    <td rowSpan={order.products.length - 1}>{order.sum}</td>
                  )}
                  <td>
                    <Button
                      variant={product.status === "Готов" ? "success" : "warning"} // Изменение цвета кнопки в зависимости от статуса заказа
                      onClick={() => toggleOrderStatus(orderIndex, productIndex)}
                    >
                      {product.status}
                    </Button>
                  </td>
                  {productIndex === 0 && (
                    <td rowSpan={order.products.length - 1}>
                      <Button
                        variant={"outline-danger"}
                        onClick={() => handleRemove(orderIndex)}
                      >
                        Удалить
                      </Button>
                    </td>
                  )}
                  
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};

export default Admin;
