import React, {useCallback, useEffect, useState} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ItemInfo from "../../components/item-info";
import ThreeDots from "../../components/loader";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router";

function ItemPage() {

  const itemId = useParams().id;

  const [loading, setLoading] = useState(true);

  const select = useSelector(state => ({
    item: state.item.result,
    amount: state.basket.amount,
    sum: state.basket.sum,
    error: state.item.error
  }));

  const store = useStore();

  useEffect(async () => {
    await store.item.load(itemId);
    setLoading(false);
  }, [itemId]);

  const callbacks = {
    addToBasket: useCallback((item) => store.basket.add(item), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }


  return (
    <Layout head={<h1>{(select.error || loading) ? '' : select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
      {loading 
      ? <ThreeDots/> 
      : 
      (select.error || <ItemInfo item={select.item} onAdd={callbacks.addToBasket}/>)}
    </Layout>
  );
}

export default React.memo(ItemPage);
