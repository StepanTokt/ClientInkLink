import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Card, Row } from 'react-bootstrap';
import './BrandBar.css'; // Подключаем файл стилей

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="brand-bar">
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          className={`brand-button ${brand.id === device.selectedBrand.id ? 'active' : ''}`}
          onClick={() => device.setSelectedBrand(brand)}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
