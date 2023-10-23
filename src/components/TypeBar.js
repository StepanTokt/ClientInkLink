import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    // Определяем функцию, которая будет отправлять запрос на сервер при изменении выбранных фильтров
    useEffect(() => {
        fetch(`your/api/endpoint?type=${device.selectedType.id}`)
            .then(response => response.json())
            .then(data => {
                // Обновляем состояние при получении данных с сервера
                device.setDevices(data)
            })
    }, [device.selectedType])

    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{
                        marginLeft: '-100px',
                        width: '300px',
                        cursor: 'pointer',
                        backgroundColor: type.id === device.selectedType.id ? 'black' : 'transparent',
                        color: type.id === device.selectedType.id ? 'white' : 'black'
                    }}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
