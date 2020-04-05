import React, { useState } from 'react';

import { useGetQuestionsData } from "../utils/data";
import QueSingleSelect from '../questions/QueSingleSelect';
import QueList from '../questions/QueList';

const FIRST_QUE = {
    question: "Hello, Please tell us which language you'd like to take this test in:",
    options: [
        {text :"English", value : 'english'}, 
        {text :"हिन्दी", value : 'hindi'}, 
        {text : "తెలుగు", value : 'bangla'}, 
        {text : "বাংলা", value : 'telugu'},
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

    const [api_state, data, getApiData] = useGetQuestionsData()

    const [language, setLanguage] = useState('engish')
    const [ans_selected, setAnsSelected] = useState(false)

    const selectLanguage = (_, lang) => {
        setLanguage(lang)
        setAnsSelected(true)
        getApiData(lang)
    }

    return (
        <div>
            <div className="que-title">This is questions</div>
            <QueSingleSelect 
                question={FIRST_QUE.question} options={FIRST_QUE.options}
                ans={language} ans_selected={ans_selected}
                setAns={selectLanguage}
            />
            {api_state.loading && 'Loading ....'}
            {api_state.fetched &&
                <QueList data={data} />
            }
        </div>
    )
}