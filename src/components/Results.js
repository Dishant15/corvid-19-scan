import React from 'react';
import {get} from 'lodash'

const getRiskType = (risk) => {
    if(risk === 1) return ['low', 'lowRecommendations']
    else if(risk === 2) return ['medium', 'mediumRecommendations']
    else if(risk === 3) return ['high', 'highRecommendations']
}

export default ({data, risk}) => {

    const [risk_type, risk_recom] = getRiskType(risk)
    const recom = get(data, risk_recom, {})
    
    return (
        <div id="results">
            <div className='header'>
                {data.header_title} : <b>{data[risk_type]}</b>
            </div>

            <div className='recom-wrapper'>
                <div className='recom-title'>
                    {recom.title}
                </div>
                {recom.list.map((item, ind)=> {
                    return (
                        <div className='recom-content' key={ind}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}