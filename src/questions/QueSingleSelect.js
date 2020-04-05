import React from "react";

import find from 'lodash/find'
import get from 'lodash/get'

export default ({index, question, options, ans, ans_selected, setAns}) => {

    let answer;
    if(ans_selected) {
        answer = find(options, ['value', ans])
    }

    return (
        <div className='que-pill'>
            <div className='que-question'>{question}</div>
            {ans_selected ?
                <div className='que-options-wrapper'>
                    <div className='que-option selected'>
                        {get(answer, 'text', '')}
                    </div>
                </div>
                :
                <div className='que-options-wrapper'>
                    {options.map((option, i) => {
                        return (
                            <div key={i} onClick={() => setAns(index, option.value)}
                                className='que-option'>
                                
                                {option.text}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}