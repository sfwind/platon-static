import { pget, ppost } from "../../utils/request";

export function loadArticleCertainDate(date){
  date = date.replace(/-/g, '')
  return pget(`/rise/bible/load/article/certain/${date}`, {pageId:1});
}

export function loadArticle(date){
  date = date.replace(/-/g, '')
  return pget(`/rise/bible/load/article/${date}`, {pageId:1});
}

export function disLike(articleId){
  return ppost(`/rise/bible/disfavor/article/${articleId}`);
}

export function like(articleId){
  return ppost(`/rise/bible/favor/article/${articleId}`);
}

export function loadScore(){
  return pget(`/rise/bible/open/load/score`);
}

export function loadUserScore(riseId, date){
  return pget(`/rise/bible/guest/load/score`, {riseId, date});
}

export function firstOpen(){
  return ppost(`/rise/bible/open/bible`);
}

export function openArticle(articleId){
  return ppost(`/rise/bible/open/article/${articleId}`);
}
