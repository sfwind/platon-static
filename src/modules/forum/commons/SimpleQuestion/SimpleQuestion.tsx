import * as React from "react"
import "./SimpleQuestion.less"

interface SimpleQuestionProps {
    title: string;
    follow: number;
    answer: number;
    onclickFunc?: object;
}
export default class SimpleQuestion extends React.Component<SimpleQuestionProps, any> {

    constructor() {
        super()
    }

    render() {
        const {
            title, follow, answer, onclickFunc = () => {}
        } = this.props;

        return (
            <div className="simple-question" onClick={()=>onclickFunc()}>
                <div className="question-topic">{title}</div>
                <div className="question-info">
                    <span>{follow}{'人关注，'}</span><span>{answer}{'个回答'}</span>
                </div>
            </div>
        )
    }

}
