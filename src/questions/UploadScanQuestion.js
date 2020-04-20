import React, {useState} from 'react'
import UploadScan from "../pages/UploadScan";
import QueSingleSelect from './QueSingleSelect';

const UPLOAD_QUE = {
    question: "Will you like to upload X-ray of your chest for better results ?",
    options: [
        {text :"Yes", value : 1}, 
        {text :"No", value : 0}, 
    ]
}

const UPLOAD_RESULT_QUE = {
    question: "Chest X-ray AI result :",
    options: [ 
        {text : "Not Uploaded", value : 0},
        {text : "Normal", value : 1},
        {text : "Covid", value : 2},
    ]
}

export default (props) => {
    /**
     * 3 step process :
     * 
     * Step 1 :
     * User selects if he wants to upload a scan or not
     * - show Question block ; upload_scan : 0, ans_selected : false
     * 
     * Step 2 :
     * User selects Yes; upload_scan : 1, ans_selected : true
     * - show UploadScan component
     * 
     * User selects No; upload_scan : 0, ans_selected : true
     * - show results
     * 
     * Step 3 :
     * After user uploaded scan show result in given answer
     */

    const [upload_scan, setUploadScan] = useState(0)
    const [ans_selected, setAnsSelected] = useState(false)

    const [got_result, setGotResult] = useState(0)

    const onUploadEnd = (ans) => {
        setGotResult(ans)
        props.onComplete(ans)
    }

    const onUserAnswerSelect = (_ ,ans) => {
        setUploadScan(ans)
        setAnsSelected(true)
        // if ans in No show results
        if(!Boolean(ans)) {
            onUploadEnd(ans)
        }
    }

    if(ans_selected) {
        // Step 2
        if(upload_scan) {
            // user selected Yes
            if(got_result) {
                // Step 3
                return (
                    <div className='que-container'>
                        <QueSingleSelect
                            question={UPLOAD_RESULT_QUE.question} options={UPLOAD_RESULT_QUE.options}
                            ans={got_result} ans_selected={true} setAns={() => {}}
                        />
                    </div>
                )
            } else {
                return <UploadScan onComplete={onUploadEnd} />
            }
        } else {
            // user selected No
            return (
                <div className='que-container'>
                    <QueSingleSelect
                        question={UPLOAD_RESULT_QUE.question} options={UPLOAD_RESULT_QUE.options}
                        ans={0} ans_selected={true} setAns={() => {}}
                    />
                </div>
            )
        }
    } else {
        // Step 1
        return (
            <div className='que-container'>
                <QueSingleSelect
                    question={UPLOAD_QUE.question} options={UPLOAD_QUE.options}
                    ans={upload_scan} ans_selected={ans_selected} setAns={onUserAnswerSelect}
                />
            </div>
        )
    }
}