import StoreModule from "../module";

class ArticleEditStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      fields: {
        title: '',
        description: '',
        countryId: '',
        categoryId: '',
        edition: 0,
        price: 0
      },
      waiting: true,
      error: '',
      deleted: false
    };
  }

  async init(id){
    this.updateState({
      waiting: true,
      data: {}
    });
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        deleted: false,
        fields: {
          title: json.result.title,
          description: json.result.description,
          countryId: json.result.maidIn._id,
          categoryId: json.result.category._id,
          edition: json.result.edition,
          price: json.result.price
        },
        waiting: false
      });

    } catch (e){
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

  update(event){
    const newFields = {
      ...this.getState().fields,
      [event.currentTarget.name] : event.currentTarget.value
    }
    this.updateState({
      fields: newFields,
    });
  }

  async submit(event) {
    event.preventDefault();

    const fields = this.getState().fields;
    const newData = {
      ...this.getState().data,
      title: fields.title,
      description: fields.description,
      price: fields.price,
      maidIn: {
        _id: fields.countryId
      },
      edition: fields.edition,
      category: {
        _id: fields.categoryId
      }
    }

    this.edit(newData);
  }

  async edit(data) {
    this.updateState({
      error: ' ',
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${data._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })

      const json = await response.json();
      if (json.error) {
        this.updateState({
          error: json.error.message + ': ' + json.error.data.issues[0].path + ' ' + json.error.data.issues[0].message,
        });
        throw new Error(json.error);
      }
      this.updateState({
        data: data
      });
    } catch(e) {
    } finally {
      this.updateState({
        waiting: false
      });
    }
  }

  async delete() {
    this.updateState({
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${this.getState().data._id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      const json = await response.json();
      
      if (json.error) {
        this.updateState({
          error: json.error.message + ': ' + json.error.data.issues[0].path + ' ' + json.error.data.issues[0].message,
        });
        throw new Error(json.error);
      }

      this.updateState({
        deleted: true
      });
    } catch (e) {
    } finally {
      this.updateState({
        waiting: false
      });
    }
    
  }
}

export default ArticleEditStore;
