import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import FormEdit from "../../components/form-edit";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";

function ArticleEdit() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(async () => {
    await store.get('articleEdit').init(params.id);
    await store.get('categories').init();
    await store.get('countries').init();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.articleEdit.data,
    fields: state.articleEdit.fields,
    countries: state.countries.items,
    categories: state.categories.items,
    waiting: state.articleEdit.waiting,
    deleted: state.articleEdit.deleted,
    error: state.articleEdit.error
  }));
  

  const callbacks = {
    onChange: useCallback(event => store.articleEdit.update(event), [store]),
    onSubmit: useCallback(event => store.articleEdit.submit(event), [store]),
    onDelete: useCallback(() => store.articleEdit.delete(), [store])
  }
  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <FormEdit fields={select.fields} countries={select.countries} categories={select.categories} onChange={callbacks.onChange} onSubmit={callbacks.onSubmit} onDelete={callbacks.onDelete} error={select.error}/>
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
