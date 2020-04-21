import React, { useState } from 'react';
import Select from 'react-select';

import { get } from 'lodash'

import useAnalyticsInfo from './useAnalyticsInfo'

import './Analytics.scss'

export default () => {

	const { api_state, summary, getRegionalList, getRegionDetails } = useAnalyticsInfo()

	const [selectedState, setState] = useState({label: "Gujarat", value: "Gujarat"})
	const region_details = getRegionDetails(selectedState.value)

	return (
		<div className="analytics-page">
			<div className="state-wrapper">
				<div className="col title">Select State</div>
				<div className="col">
					<Select classNamePrefix="select"
						value={selectedState}
						onChange={(state) => setState(state)}
						options={getRegionalList()}
					/>
				</div>
			</div>
			<div className="analytics">
				<div className="data-wrapper">
					<div className="data-table-title">{selectedState.value}</div>
					<div className="data-table">
						<div className="data-row">
							<div className="data-col">Total Confirmed</div>
							<div className="data-col">{get(region_details, 'totalConfirmed', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Confirmed Indian</div>
							<div className="data-col">{get(region_details, 'confirmedCasesIndian', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Confirmed Foreign</div>
							<div className="data-col">{get(region_details, 'confirmedCasesForeign', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Deaths</div>
							<div className="data-col">{get(region_details, 'deaths', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Discharged</div>
							<div className="data-col">{get(region_details, 'discharged', ' -- ')}</div>
						</div>
					</div>
				</div>
				<div className="data-wrapper">
					<div className="data-table-title">India</div>
					<div className="data-table">
						<div className="data-row">
							<div className="data-col">Total Confirmed</div>
							<div className="data-col">{get(summary, 'total', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Confirmed Indian</div>
							<div className="data-col">{get(summary, 'confirmedCasesIndian', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Confirmed Foreign</div>
							<div className="data-col">{get(summary, 'confirmedCasesForeign', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Confirmed But Location Unknown</div>
							<div className="data-col">{get(summary, 'confirmedButLocationUnidentified', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Deaths</div>
							<div className="data-col">{get(summary, 'deaths', ' -- ')}</div>
						</div>
						<div className="data-row">
							<div className="data-col">Discharged</div>
							<div className="data-col">{get(summary, 'discharged', ' -- ')}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}