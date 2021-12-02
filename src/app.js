import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Popup from "./components/popup";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  const [cartAmount, setCartAmount] = useState(0);
  const [cartSum, setCartSum] = useState(0);

  const callbacks = {
    onAddItem: useCallback((item) => store.addItem(item), [store]),
    onUpdateCartAmount: useCallback(() => {
      setCartAmount(cartAmount + 1);
    }, [cartAmount, setCartAmount]),
    onUpdateCartSum: useCallback((item) => {
      setCartSum(cartSum + item.price);
    }, [cartSum, setCartSum])
  };


  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cartSum={cartSum} cartAmount={cartAmount}/>
      <List items={store.getState().items}
            onAddItem={callbacks.onAddItem}
            onUpdateCartSum={callbacks.onUpdateCartSum}
            onUpdateCartAmount={callbacks.onUpdateCartAmount}
      />
      <Popup cartItems={store.getState().cartItems} cartAmount={cartAmount} cartSum={cartSum}/>
    </Layout>
  );
}

export default App;