import StoreModule from "../module";

class BasketStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      sum: 0,
      amount: 0,
      unicAmount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param id {*}
   */
  add(item){
    let unicAmount = this.getState().unicAmount;
    // Ищем товар в корзие, чтобы увеличить его количество.
    let exists = false;
    const items = this.getState().items.map(i => {
      // Искомый товар
      if (i._id === item._id) {
        exists = true;
        return {...i, amount: i.amount + 1};
      }
      return i
    });

    if (!exists) {
      // Если товар не был найден в корзине, то добавляем его из каталога
      items.push({...item, amount: 1, basketIndex: unicAmount + 1});
      unicAmount++;
    }

    // Считаем суммы
    let amount = 0;
    let sum = 0;
    for (const item of items){
      amount += item.amount;
      sum += item.price * item.amount;
    }


    // Установка состояние basket
    this.setState({
      items,
      amount,
      sum,
      unicAmount
    });
  }

}

export default BasketStore;
