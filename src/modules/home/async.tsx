import { pget, ppost } from '../../utils/request'

export function loadLandingPageData () {
  return pget('/rise/landing/load')
}

export function loadAllLives () {
  return pget('/rise/landing/load/lives')
}

export function loadAllActivities () {
  return pget('/rise/landing/load/activities')
}

export function loadShuffleArticles () {
  return pget('/rise/landing/load/shuffle/articles')
}
