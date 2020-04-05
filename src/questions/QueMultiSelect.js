import React, {useState} from "react";

import find from 'lodash/find'
import get from 'lodash/get'

export default ({index, question, options, ans, ans_selected, setAns}) => {

    const [selAns, setSelAns] = useState([])

    const handleSelectedAns = (value) => {
        if(!Boolean(value)) {
            // user selected none of this
            setAns(index, [value])
        }

        let curr_ans = [...selAns]
        const ind = curr_ans.indexOf(value)

        if(ind === -1) {
            curr_ans.push(value)
        } else {
            curr_ans.splice(ind, 1)
        }

        setSelAns(curr_ans)
    }

    let answer = '';
    if(ans_selected) {
        for (let index = 0; index < ans.length; index++) {
            const match = find(options, ['value', ans[index]])
            
            if(index === 0) {
                answer = get(match, 'text' , '')
            } else {
                answer = answer + ', ' + get(match, 'text' , '')
            }
        }
    }

    return (
        <div className='que-pill'>
            <div className='que-question'>{question}</div>
            {ans_selected ?
                <div className='que-option selected'>
                    {answer}
                </div>
                :
                <div className='que-options-wrapper'>
                    {options.map((option, i) => {
                        const is_selected = selAns.indexOf(option.value) !== -1

                        return (
                            <div key={i} onClick={() => handleSelectedAns(option.value)}
                                className={`que-option ${is_selected ? 'active' : ''}`}>
                                
                                {option.text}
                            </div>
                        )
                    })}
                    <div onClick={() => setAns(index, selAns)}
                        className='que-option confirm'>
                        
                        Confirm
                    </div>
                </div>
            }
        </div>
    )
}