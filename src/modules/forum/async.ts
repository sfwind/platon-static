import { pget, ppost } from "utils/request";

export function getAllQuestions(page) {
  if(!page) page = 1
  return pget(`/forum/question/load/list`, { page })
}
