import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import star from '../assets/star.png';
import ImageZoom from "react-image-zoom";
import { createGlobalStyle } from 'styled-components';
import {fetchOneDevice} from "../http/deviceAPI";
import Basket from './Basket';
import {Link} from 'react-router-dom';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {setOneBasket} from "../store/DeviceStore"
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {
  BASKET_ROUTE,
} from '../utils/consts';
const DevicePage = observer (() => {
    const {device} = useContext(Context)
    const [item,setItem] = useState({info: []})
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
      fetchOneDevice(id).then(data => setItem(data))
    }, [])
    
    function basket(){
      
      device.setOneBasket({id:item.id,name:item.name,price:item.price,img:item.img,amount:1});
      localStorage.setItem('productsId', JSON.stringify(device.basket));
    }



    const [zoomImg, setZoomImg] = useState(process.env.REACT_APP_API_URL + item.img);
    

    const rowStyle = {
      background: 'linear-gradient(to bottom, #444444, #666666)',
      color: 'white',
      fontSize: '18px',
      padding: '10px',
      marginLeft: '5px',
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.4)'
    };
        
    const h1Style = {
      marginBottom: '20px',
      marginLeft: '50px',
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
    };
    
    const colStyle = {
      
      padding: '20px'
    };
    
    const whiteBoxStyle = {
      backgroundColor: 'white',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
      padding: '20px',
      marginTop: '40px',
      marginLeft: '290px'
    };

    const BigWhiteBoxStyle = {
      backgroundColor: 'white',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
      padding: '20px',
      marginTop: '40px',
      marginBottom: '40px'
    };

    return (
      <Container className="mt-3" style={BigWhiteBoxStyle} >
          <Row >
              <Col md={4}>
                  <h2 style={{marginLeft: '50px'}}>Title: {item.name}</h2>
                  <ImageZoom
          width={500}
          height={500}
          
          zoomWidth={500}
          img={process.env.REACT_APP_API_URL + item.img}
          zoomImg={zoomImg}
        />
        <div style={{ marginTop: "20px", display: "flex" }}>
          <Image
            border={2}
            width={100}
            height={100}
            src={process.env.REACT_APP_API_URL + item.img}
            onClick={() => setZoomImg(process.env.REACT_APP_API_URL + item.img)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          
        </div>
      </Col>
      <Col md={7} style={colStyle}>
<Row style={whiteBoxStyle}>
  <h1 style={h1Style}>Характеристики</h1>
  {item.info && item.info.map((info) =>
    <Row key={info.id} style={rowStyle}>
      {info.title}: {info.description}
    </Row>
  )}
  <Row md={7}>
    <h3 style={{marginTop:'100px', marginLeft:'40px'}}>Price from: {item.price} руб.</h3>
              {!item.isOutOfStock && (
                <Button variant={"outline-dark"} onClick={basket}>
                  Добавить в корзину
                </Button>
              )}
    <Button
              variant={"outline-dark"}
              style={{ marginLeft: '160px', width:"60px", marginTop:"10px"}}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              <FaShoppingCart></FaShoppingCart>
              
    </Button>
  </Row>
</Row>
</Col>
              
          </Row>
          <Row className="d-flex align-items-center">
            <div >
               <h2>Rating: {item.rating} <Image width={20} height={20} src={star} /></h2>
               
            </div>
              
          </Row>
          
      </Container>
  );
});



export default DevicePage;