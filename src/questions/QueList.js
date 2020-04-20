import React from "react";
import QueTextInput from "./QueTextInput";
import QueSingleSelect from "./QueSingleSelect";
import QueMultiSelect from "./QueMultiSelect";
import UploadScanQuestion from "./UploadScanQuestion";

export default class QueList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            question_list : props.data,
            current_ind : 0
        }
    }

    // for text and single select questions
    handleAnsSelect = (index, ans) => {
        const {question_list, current_ind} = this.state
        const new_list = [...question_list]

        new_list[index] = {
            ...new_list[index],
            ans, ans_selected : true
        }

        this.setState({question_list : new_list, current_ind : current_ind + 1 })
    }

    // called by UploadScanQue, set Scan result
    onComplete = (scan_result) => {
        // scan_result : 0 | 1 | 2
        const {onComplete} = this.props
        const {question_list} = this.state
        // pass question_list to parent
        onComplete(question_list, scan_result)
    }

    render = () => {
        const {question_list, current_ind} = this.state

        return (
            <div>
                {question_list.map((que_data, i) => {
                    // don't render next questions till this one is answered
                    if(i > current_ind) {
                        return null;
                    }

                    const {que_type, question, ans, ans_selected, options, q_key} = que_data

                    if(que_type === 'text') {
                        return <QueTextInput index={i} key={q_key}
                                    question={question} ans={ans} ans_selected={ans_selected}
                                    placeholder={que_data.placeholder} buttonText={que_data.buttonText} info={que_data.info}
                                    setAns={this.handleAnsSelect}
                                />
                    } else if (que_type === 'single') {
                        return <QueSingleSelect index={i} key={q_key}
                                    question={question} ans={ans} ans_selected={ans_selected}
                                    options={options} setAns={this.handleAnsSelect}
                                />
                    } else {
                        return <QueMultiSelect index={i} key={q_key} confirm_text={que_data.confirm_text}
                                    question={question} ans={ans} ans_selected={ans_selected}
                                    options={options} setAns={this.handleAnsSelect}
                                />
                    }
                })}
                <UploadScanQuestion onComplete={this.onComplete} />
                {current_ind >= question_list.length &&
                    <></>
                }
            </div>
        )
    }
}