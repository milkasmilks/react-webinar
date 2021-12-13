import axios from "axios";
import getPagesArray from "../../utils/get-pages-array";
import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      totalCount: 0,
      pagesArray: [],
      page: 1,
      error: ''
    };
  }

  /**
   * Загрузка списка товаров
   */
  async preload() {
    try {
      const response = await axios.get(`/api/v1/articles?limit=10&skip=0&fields=items(*),count`);
      
      this.setState({
        ...this.getState(),
        items: response.data.result.items,
        totalCount: response.data.result.count,
        pagesArray: getPagesArray(response.data.result.count, 10),
        page: 1
      });
    } catch(e) {
      this.setState({
        error: 'Товары не найдены'
      });
    }
  }

  async load(page = 1, limit = 10){
    try {
      const skip = limit * (page - 1);

      const response = await axios.get(`/api/v1/articles?limit=${limit}&skip=${skip}`);
      
      this.setState({
        ...this.getState(),
        items: response.data.result.items,
        page: page
      });
    } catch (e) {
      this.setState({
        error: 'Товары не найдены'
      });
    }
  }
}

export default CatalogStore;
