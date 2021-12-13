import React from 'react';
import Main from "./main";
import Basket from "./basket";
import ItemPage from './item-page';
import useSelector from "../utils/use-selector";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/items' element={<Main/>}/>
          <Route path='/items/:id' element={<ItemPage/>}/>
          <Route path='*' element={<Navigate to="/items" />}/>
        </Routes>
        {select.name === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
