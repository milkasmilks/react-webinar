import StoreModule from "../module";
import getCategoriesOptions from "../../utils/get-categories-options";
import getCategoriesTree from "../../utils/get-categories-tree";

class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items : [],
    };
  }

  async init(){
    const response = await fetch(`api/v1/categories?limit=*&fields=_id,parent,title`);
    const json = await response.json();

    const categoriesTree = getCategoriesTree(json.result.items);
    const categoriesOptions = getCategoriesOptions(categoriesTree);

    this.setState ({
      items: categoriesOptions
    });
  }
}

export default CategoriesStore;


