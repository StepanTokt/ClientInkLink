import React from "react";
import './AllInformation.css'
import Button from 'react-bootstrap/Button';

const Delivery = () => {
    return (
        <div className="container">
          <div className="sidebar">
            <div
            style={{background:  "linear-gradient(229.99deg, #efc3b0 -26%, #fc8c63 145%)"}}
            >
              <h1>Доставка бесплатная</h1>
              <p>*при заказе от 70 рублей</p>
              <p>P.S: Будет доступно в 2024</p>
            </div>
          </div>
          <div className="main-slide">
    
           
            <div
            style={{backgroundImage: "url('https://aussiedlerbote.de/wp-content/uploads/2020/11/kurerskie-sluzhby-i-poluchateli-ne-vsegda-nahodyat-obshij-yazyk-foto.jpg')"}}
            
            ></div>
          </div>
          
        </div>
      );
};

export default Delivery;
