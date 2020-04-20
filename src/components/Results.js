import React from 'react';
import {get} from 'lodash'

import './Results.scss'

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
				<div className="header-content">
					<div className="content left">{data.header_title}</div>
					<div className="content right">
						<div className={`status-block ${risk_type}`}>{data[risk_type]}</div>
					</div>
				</div>
			</div>

			<div className='recom-wrapper'>
				<div className='recom-title'>
					{recom.title}
				</div>

				{recom.list.map((item, ind)=> {
					return (
						<div className='recom-content' key={ind}>
							<div>{ind+1}.</div>
							<div dangerouslySetInnerHTML={{__html : item }} />
						</div>
					)
				})}
			</div>
		</div>
	)
}