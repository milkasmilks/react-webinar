export default function getPagesArray(totalCount, limit){
  const pagesCount =  Math.ceil(totalCount / limit);
  const pagesArray = [];
  for (let i = 0; i < pagesCount; i++) {
    pagesArray.push(i + 1);
  }
  return pagesArray;
}