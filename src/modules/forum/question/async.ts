import { pget, ppost } from "../../../utils/request";

export function loadTag() {
    return pget('/forum/question/tag/load');
}

export function loadQuestionByTag(tag){
    return pget(`/forum/question/search/${tag}`);
}

export function submitQuestion(param){
    return ppost(`/forum/question/submit`, param);
}
