import axios from "axios";
import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      totalCount: 0,
      limit: 10,
      page: 1,
      error: ''
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(page = 1){
    try {
      const skip = this.getState().limit * (page - 1);
      let url = `/api/v1/articles?limit=${this.getState().limit}&skip=${skip}`;
      
      if (this.getState().totalCount == 0) {
        url += '&fields=items(*),count';
      }

      const response = await axios.get(url);
      
      this.setState({
        ...this.getState(),
        items: response.data.result.items,
        totalCount: this.getState().totalCount || response.data.result.count,
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
