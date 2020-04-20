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

    const onComplete = (que_list) => {
        console.log("onComplete -> que_list", que_list)
        setShowResults(true)
        // calculate total score
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
                <Result data={results} />
            }
        </div>
    )
}