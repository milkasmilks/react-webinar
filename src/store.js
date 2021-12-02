class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Подписчики на изменение state
    this.listners = [];
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Выбор state
   * @return {*}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {*}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister(this.state);
    }
  }

  // Действия приложения.
  // @todo
  // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
  // Может быть как модуль (расширение) для Store

  /**
   * Создание записи
   */
  createItem() {
    const code = Math.max(0, ...this.state.items.map(item => item.code)) + 1;
    this.setState({
      items: this.state.items.concat({
        code,
        title: 'Новая запись №'+code
      })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected
          };
        }
        return item;
      })
    });
  }

  addItem(item) {
    if (!this.state.cartItems.find(cartItem => cartItem.item.code == item.code)) {
      const cartCode = Math.max(0, ...this.state.cartItems.map(cartItem => cartItem.cartCode)) + 1;
      this.setState({
        items: this.state.items,
        cartItems: this.state.cartItems.concat({
          cartCode,
          item,
          amount: 1,
        }),
      });
    } else {
      this.setState({
        items: this.state.items,
        cartItems: this.state.cartItems.map(cartItem => {
          if (cartItem.item.code === item.code){
            return {
              cartCode: cartItem.cartCode,
              item: cartItem.item,
              amount: cartItem.amount + 1,
            };
          }
          return cartItem;
        }),
      });
    }
  }
}

export default Store;