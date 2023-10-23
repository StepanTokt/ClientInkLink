import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
        ]
        this._brands = [
        ]
        this._devices = [
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 12
        this._basket = [];
        makeAutoObservable(this, {
            selectedType: false,
            selectedBrand: false, // указываем, что selectedType - вычисляемое значение, которое не нужно наблюдать
          });
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setBasket(basket){
        this._basket = basket || []
    }
    setOneBasket(basket) {
        let flag = true;
        this._basket.forEach((item) =>{
            if(item.id === basket.id){
                item.amount += 1;
                flag = false;
            }
        })
        flag && this._basket.push(basket);
    }
    

    setSelectedType(type) {
    if (this.selectedType === type) {
        this.selectedType = {}
    } else {
        this.selectedType = type
        this.setPage(1)
        }
    }
    setSelectedBrand(brand) {
        if (this.selectedBrand === brand) {
            this.selectedBrand = {}
        } else {
            this.selectedBrand = brand
            this.setPage(1)
            }
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    set selectedType(value) { // добавляем метод доступа `set` для свойства `selectedType`
        this._selectedType = value;
      }
      set selectedBrand(value) { // добавляем метод доступа `set` для свойства `selectedType`
        this._selectedBrand = value;
      }
      get basket() {
        return this._basket;
      }
    
}