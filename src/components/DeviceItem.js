import React, { useState, useEffect } from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { useContext } from 'react';
import { Context } from '../index';


const DeviceItem = ({ device, onDelete  }) => {
  const { user } = useContext(Context);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const handleStockButtonClick = () => {
    setIsOutOfStock(!isOutOfStock);
  };

  const handleDeleteClick = () => {
    onDelete(device.id);
};
  
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

  const handleItemClick = () => {
    if (!isOutOfStock) {
      navigate(DEVICE_ROUTE + '/' + device.id);
    }
  };

  const handleZoomClick = (e) => {
    if (e.target.id === "zoom-link") {
      setIsZoomed(true);
    }
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };


  useEffect(() => {
    // Проверяем, есть ли сохраненное состояние в localStorage при загрузке компонента
    const storedIsOutOfStock = localStorage.getItem(`device_${device.id}_isOutOfStock`);
    if (storedIsOutOfStock) {
      setIsOutOfStock(JSON.parse(storedIsOutOfStock));
    }
  }, []);

  useEffect(() => {
    // Сохраняем состояние в localStorage при его изменении
    localStorage.setItem(`device_${device.id}_isOutOfStock`, JSON.stringify(isOutOfStock));
  }, [isOutOfStock, device.id]);

  const cardStyle = {
    width: 205,
    cursor: 'pointer',
    borderWidth: '2px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: 'white',
    padding: '15px',
    marginBottom: '20px',
  };

  const titleStyle = {
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const descriptionStyle = {
    color: '#555',
    fontSize: '14px',
    marginBottom: '10px',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#666',
  };

  const starStyle = {
    width: '18px',
    height: '18px',
    marginLeft: '5px',
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "9999",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const zoomedImgStyle = {
    maxWidth: "70%",
    maxHeight: "70%",
    objectFit: "contain"
  };

  return (
    <>
      <Col md={3} className={"mt-3"} onClick={handleZoomClick}>
        <Card style={cardStyle} border={"light"}>
        <Image
        width={175}
        height={175}
        src={process.env.REACT_APP_API_URL + device.img}
        onClick={handleItemClick}
        />
          <div style={titleStyle}>
            {device.name}
            <span id="zoom-link" style={{fontSize: '13px'}}>Увеличить</span>
          </div>
          <div style={{color:"black", fontSize:"14px", marginBottom:"5px"}}>Price: {device.price} руб.</div>
          <div style={ratingStyle}>
            {device.rating}
            <Image style={starStyle} src={star} />
          </div>
          {user?.Role === 'ADMIN' && (
            <button style={{backgroundColor:"white", marginTop:"10px"}} onClick={handleStockButtonClick}>
              {isOutOfStock ? "Нет на складе" : "В наличии"}
            </button>
          )}
          {user?.Role !== 'ADMIN' && (
            <button style={{backgroundColor:"white", marginTop:"10px"}}>
              {isOutOfStock ? "Нет на складе" : "В наличии"}
            </button>
          )}
          
        </Card>
      </Col>
      {isZoomed && (
        <div style={overlayStyle} onClick={handleZoomClose}>
          <Image
            style={zoomedImgStyle}
            src={process.env.REACT_APP_API_URL +device.img}
            alt={device.name}
          />
        </div>
      )}
    </>
  );
};

export default DeviceItem;
