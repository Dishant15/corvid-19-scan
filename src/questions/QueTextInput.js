import React, { useState } from 'react'

export default ({index, question, ans, ans_selected, placeholder, buttonText, setAns}) => {

    const [text, setText] = useState(ans)

    return (
        <div className='que-pill'>
            <div className='que-question'>{question}</div>
            {ans_selected ?
                <div className='que-option selected'>
                    {ans}
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