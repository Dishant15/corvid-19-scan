import { useState } from 'react';
import Axios from 'axios'

import get from 'lodash/get'

const MULTISELECT_TYPE_QUES = [
    'symptoms', 'additionalSymptoms', 'underlyingConditions'
]


export const useGetQuestionsData = () => {

    const [api_state, setApiState] = useState({loading : false, fetched : false, error : {}})
    const [data, setData] = useState({})

    // "english","hindi","bangla","telugu","tamil"
    const getApiData = (language='english') => {
        if(api_state.loading) return;

        const url = 'http://ec2-3-7-38-181.ap-south-1.compute.amazonaws.com/v1/api/bot/'
        Axios.post(url, {language})
			.then(res => {
                // console.log(res)
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
                setApiState({loading:false, fetched : true, error : {}})
			})
			.catch(err => {
                console.log(err)
                setApiState({loading:false, fetched : false, error : {}})
            })
            
        setApiState({...api_state, loading:true, error : {}})
    }

    return [api_state, data, getApiData]
}