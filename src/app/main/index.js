import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {

  const select = useSelector(state => ({
    items: state.catalog.items,
    totalCount: state.catalog.totalCount,
    limit: state.catalog.limit,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    error: state.catalog.error
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load();
  }, []);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((item) => store.basket.add(item), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    changePage: useCallback((page) => store.catalog.load(page), [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
      {select.error ||
      <>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination onChange={callbacks.changePage} limit={select.limit} totalCount={select.totalCount} currentPage={select.page}/>
      </>
      }
    </Layout>
  );
}

export default React.memo(Main);
