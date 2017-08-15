import { pget, ppost } from "utils/request";

// 首页获取所有问题详情
export function submitEva(score) {
  return ppost(`/rise/operation/free/submit/${score}`)
}

