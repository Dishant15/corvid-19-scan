import React, { Component } from 'react';
import Axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faChartLine } from '@fortawesome/free-solid-svg-icons'

import UploadScanBlock from "../components/UploadScanBlock"

import './UploadScan.scss'

export default class UploadScan extends Component {

	/**
	 * Parent :
	 * 		Container
	 * Render :
	 * 		UploadScanBlock
	 */

	constructor(props){
		super(props)
		this.state = {
			croppedImageUrl: null,
		}
	}

	onSubmit = (e) => {
		e.preventDefault()
		const url = "http://3.7.38.181/v1/api/uploaddata/"

		const $form = document.getElementById("scan-form")
		const data = new FormData($form)

		Axios({
			method: 'post',
			url,
			headers: {
				'content-type': 'multipart/form-data',
			},
			data
		})
			.then(res => {
            	console.log("UploadScan -> onSubmit -> res", res)
			})
			.catch(err => {
				console.log(err.response)
			})
	}

	setCropImage = (image_blob) => {
		this.setState({ croppedImageUrl: image_blob })
	}

	render = () => {
		const { croppedImageUrl } = this.state

		return (
			<div className="upload-scan-wrapper">
				{croppedImageUrl ? 
					<form id="scan-form" className="crop-wrapper">
						<div>
							<input name="name" placeholder="name"/>
						</div>
						<div>
							<input name="lat" placeholder="lat"/>
						</div>
						<div>
							<input name="long" placeholder="long"/>
						</div>
						<div>
							<input name="age" placeholder="age"/>
						</div>
						<img name="image" className="cropperd-image" src={croppedImageUrl} alt="crop"/>
		
						<div className="action-wrapper">
		
							<div className="action">
								<button className="btn accent-btn"
									onClick={this.onSubmit}
									>
										<FontAwesomeIcon icon={faChartLine} />
										Analyse
								</button>
							</div>
		
							<div className="action">
								<button className="btn accent-secondary-btn" 
									onClick={() => this.setState({ croppedImageUrl: null })}>
										<FontAwesomeIcon icon={faUndoAlt} />
										Crop Again
								</button>
							</div>
		
						</div>
					</form>
					:
					<UploadScanBlock setCropImage={this.setCropImage}/>
				}
			</div>
		)
	}
}