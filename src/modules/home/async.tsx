import requestProxy from '../../components/requestproxy/requestProxy'

export function loadLandingPageData () {
  return requestProxy.getProxy('/rise/landing/load')
}

export function loadAllLives () {
  return requestProxy.getProxy('/rise/landing/load/lives')
}

export function loadAllActivities () {
  return requestProxy.getProxy('/rise/landing/load/activities')
}

export function loadShuffleArticles () {
  return requestProxy.getProxy('/rise/landing/load/shuffle/articles')
}
