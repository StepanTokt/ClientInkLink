import React from "react";
// import './AllInformation.css'
import Button from 'react-bootstrap/Button';

const AllInformation = () => {
  return (
    <div >
      <div className="sidebar">
      <div
        style={{background: " linear-gradient(220.16deg, #727271 -8%, #000000  138%)"}}
        >
          <h1>О нас</h1>
          <p>Марка года 2022</p>
          <p>Новое здание по адресу: Гродно, ул.Карского, 33</p>
          <p>Работаем на рынке Гродненской области с 1998 года</p>
        </div>
        <div
         style={{background: "linear-gradient(229.99deg, #f8fbfb -26%, #793b0c 145%)", height:"100vh"}} 
        
      >
        <h1>Причины работать с нами</h1>
        <p>Самый большой ассортимент канцтоваров</p>
        <p>Торговый Зал самообслуживания</p>
        <p>Бумага XEROX по самым низким ценам </p>
        <p>Скидки для постоянных клиентов</p>
        <p>Низкие цены</p>
      </div>
        
        
        <div
        style={{background: "linear-gradient(221.87deg, #e0bea7 1%, #6682d4 128%)", height:"100vh"}}
        >
          <h1>Основные направления</h1>
          <p>Канцелярские товары</p>
          <p>Расходные материалы</p>
          <p>Калькуляторы Citizen, Casio</p>
          <p>Копировальная Техника</p>
        </div>
       
      </div>
      <div className="main-slide">
        <div
        style={{backgroundImage: "url('https://s0.rbk.ru/v6_top_pics/media/img/8/50/755851591762508.png')"}}
          
        ></div>
       
       
        
        <div
        style={{backgroundImage: "url('http://tutfon.ru/wallpapers/image.raw?view=image&type=orig&id=14243')" , height:"100vh"}}
       
        ></div>
         <div
        style={{backgroundImage: "url('https://phonoteka.org/uploads/posts/2023-04/1680362777_phonoteka-org-p-estetika-kantselyariya-art-krasivo-1.jpg')", height:"100vh"}}
          
        ></div>
      </div>
      
    </div>
  );
};

export default AllInformation;
