import React, { useState } from 'react';

import { useGetQuestionsData } from "../utils/data";
import QueSingleSelect from '../questions/QueSingleSelect';
import QueList from '../questions/QueList';
import Result from '../components/Results'

import './Questions.scss'

const FIRST_QUE = {
    question: "Hello, Please tell us which language you'd like to take this test in:",
    options: [
        {text :"English", value : 'english'}, 
        {text :"हिन्दी", value : 'hindi'}, 
        {text : "বাংলা", value : 'bangla'}, 
        {text : "తెలుగు", value : 'telugu'},
        {text : "தமிழ்", value : 'tamil'}
    ]
}

/**
 * Select language
 * Hit api to get data in that language
 * Show loading
 * On success create a list of questions
 * add empty ans to questions
 * 
 * render que list with given data
 */
export default () => {

    const [api_state, data, getApiData, results] = useGetQuestionsData()

    const [language, setLanguage] = useState('engish')
    const [ans_selected, setAnsSelected] = useState(false)

    const [show_results, setShowResults] = useState(false)
    const [risk, setRisk] = useState('')

    const selectLanguage = (_, lang) => {
        setLanguage(lang)
        setAnsSelected(true)
        getApiData(lang)
    }

    const onComplete = (que_list, scan_result) => {
        // scan_result : 0 | 1 | 2
        let curr_risk_index = 0

        for (let index = 0; index < que_list.length; index++) {
            const que = que_list[index];
            if(que.q_key == 'age') continue;

            if(que.que_type === 'single') {
                let curr_ans = Boolean(Number(que.ans)) ? Number(que.ans) : 0
                curr_risk_index = curr_risk_index + curr_ans
            } else {
                // get from multi question
                for (let a_ind = 0; a_ind < que.ans.length; a_ind++) {
                    const ans = que.ans[a_ind];
                    let curr_ans = Boolean(Number(ans)) ? Number(ans) : 0
                    curr_risk_index = curr_risk_index + curr_ans
                }
            }
        }
        // calculate total score
        if(scan_result == 2) {
            // Covid
            if(curr_risk_index > 10) {
                // High risk
                setRisk(3)
            }
            else { // Medium risk
                setRisk(2)
            }
        } else {
            if(curr_risk_index < 10) {
                setRisk(1)
            } else if (curr_risk_index < 15) {
                setRisk(2)
            } else {
                setRisk(3)
            }
        }
        setShowResults(true)
    }

    return (
        <div className='que-container'>
            <QueSingleSelect 
                question={FIRST_QUE.question} options={FIRST_QUE.options}
                ans={language} ans_selected={ans_selected}
                setAns={selectLanguage}
            />
            {api_state.loading && 'Loading ....'}
            {api_state.fetched &&
                <QueList data={data} onComplete={onComplete} />
            }

            {show_results &&
                <Result data={results} risk={risk} />
            }
        </div>
    )
}