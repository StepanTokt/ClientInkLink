import React from "react";
import './AllInformation.css'
import Button from 'react-bootstrap/Button';

const Delivery = () => {
    return (
        <div className="container">
          <div className="sidebar">
          <div
          style={{background: "linear-gradient(215.32deg, #c76a81 -1%, #ff3737 124%) "}}
        >
            <h1>Контакты</h1>
            <p>A1: +375-(29)-909-10-15</p>
            <p>г.Гродно, ул.Карского 33</p>
         </div>
          </div>
          <div className="main-slide">
    
           
            <div
        style={{backgroundImage: "url('https://png.pngtree.com/png-vector/20190804/ourlarge/pngtree-mailbox-mail-love-letter-letterbox-flat-color-icon-vector-png-image_1649804.jpg')"}}
  
        ></div>
          </div>
          
        </div>
      );
};

export default Delivery;
