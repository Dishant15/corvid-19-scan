import { useState } from 'react';
import Axios from 'axios'

import get from 'lodash/get'

const MULTISELECT_TYPE_QUES = [
    'symptoms', 'additionalSymptoms', 'underlyingConditions'
]


export const useGetQuestionsData = () => {

    const [api_state, setApiState] = useState({loading : false, fetched : false, error : {}})
    const [data, setData] = useState({})
    const [results, setResults] = useState({})

    // "english","hindi","bangla","telugu","tamil"
    const getApiData = (language='english') => {
        if(api_state.loading) return;

        const url = 'http://aived.in/v1/api/bot/'
        Axios.post(url, {language})
			.then(res => {
                // console.log(res.data)
                // create question list
                let questions = get(res, 'data.bot.messages', {})
                let confirm_text = get(res, 'data.bot.selectedText', 'confirm')
                let que_list = []
                let default_ans = '';
                for(const que in questions) {
                    let que_type;
                    if(que === 'age') {
                        que_type = 'text'
                    } else {
                        if(MULTISELECT_TYPE_QUES.indexOf(que) === -1) {
                            que_type = 'single'
                        } else {
                            que_type = 'multi'
                            default_ans = []
                        }
                    }
                    const current_que = {
                        ...questions[que],
                        que_type, ans : default_ans,
                        ans_selected : false,
                        q_key: que, confirm_text
                    }

                    que_list.push(current_que)
                }
                setData(que_list)
                setResults(res.data.risk)
                setApiState({loading:false, fetched : true, error : {}})
			})
			.catch(err => {
                console.log(err)
                setApiState({loading:false, fetched : false, error : {}})
            })
            
        setApiState({...api_state, loading:true, error : {}})
    }

    return [api_state, data, getApiData, results]
}


export const useStateApiData = () => {
    const [api_state, setApiState] = useState({ loading: false, fetched: false, error: {} })
    const [data, setData] = useState({})

    const getApiData = () => {
        if (api_state.loading) return;

        const url = 'https://api.rootnet.in/covid19-in/stats/latest'

        Axios.get(url).then(res => {
            // console.log("res => data", res.data)
            setData(res.data)
            setApiState({ loading: false, fetched: true, error: {} })
        }).catch(err => {
            // console.log("res => err", err)
            setApiState({ loading: false, fetched: false, error: {} })
        })

        setApiState({ ...api_state, loading: true, error: {} })
    }

    return [api_state, data, getApiData]
}