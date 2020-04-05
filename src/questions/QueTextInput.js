import React, { useState } from 'react'

export default ({index, question, ans, ans_selected, placeholder, buttonText,info, setAns}) => {

    const [text, setText] = useState(ans)

    return (
        <div className='que-pill'>
            {Boolean(info) &&
                <div className='que-question'>{info}</div>
            }
            <div className='que-question'>{question}</div>
            {ans_selected ?
                <div className='que-options-wrapper text'>
                    <div className='que-option selected'>
                        {ans}
                    </div>
                </div>
                :
                <div className='que-options-wrapper text'>
                    <input placeholder={placeholder} name='age' value={text}
                        onChange={(e) => setText(e.target.value)} />
                    <button onClick={() => setAns(index, text)}>
                        {buttonText}
                    </button>
                </div>
            }
        </div>
    )
}