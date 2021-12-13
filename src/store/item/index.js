import axios from "axios";
import StoreModule from "../module";

class ItemStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      result: {
        title: '',
        description: '',
        madeIn: '',
        category: '',
        edition: '',
        price: 0,
      }, 
      error: ''
    };
  }

  // /**
  async load(id){
    try {
      const response = await axios.get(`/api/v1/articles/${id}`);
      const dataResult = response.data.result;

      const madein = await axios.get(`/api/v1/countries/${dataResult.maidIn._id}`);
      const category = await axios.get(`/api/v1/categories/${dataResult.category._id}`);

      this.setState({
        result: {
          _id: id,
          title: dataResult.title,
          description: dataResult.description,
          madeIn: madein.data.result.title,
          category: category.data.result.title,
          edition: dataResult.edition,
          price: dataResult.price
        }
      });
    } catch(e) {
      this.setState({
        error: 'Товар не найден'
      });
    }
  }

}

export default ItemStore;
