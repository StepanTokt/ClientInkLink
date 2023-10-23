import {$authHost, $host} from "./index";

export const createBasket = async (basket) => {
    console.log(basket);
    const {data} = await $authHost.post('api/basket', basket)
    return data;
}

export const updateBasketItems = async (basketId, basketItems) => {
    const { data } = await $authHost.put(`api/basket/${basketId}`, basketItems);
    return data;
  }
  