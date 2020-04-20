import React, { Component } from 'react';
import Axios from "axios"
import {get} from 'lodash'

import UploadScanBlock from "../components/UploadScanBlock"

import './UploadScan.scss'
import { UPLOAD_SCAN_URL } from '../constants';

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
			blob: null,
			loading: false
		}
	}

	onSubmit = (e) => {
		e.preventDefault()
		const url = UPLOAD_SCAN_URL

		const { blob } = this.state
		const { onComplete } = this.props

		const $form = document.getElementById("scan-form")
		let data = new FormData($form)
		data.append("name", 'demo')
        data.append("lat", 12)
        data.append("long", 12)
        data.append("age", 25)
		data.append('image', blob, blob.name)

		this.setState({ loading: true })
		Axios({
			method: 'post',
			url,
			headers: {
				'content-type': 'multipart/form-data',
			},
			data
		})
			.then(res => {
				// get result
				let result = 1;
				if(get(res ,'data.result', '') == " Covid ") {
					result = 2
				}
				this.setState({ loading: false })
				// set parent state
				if(onComplete) onComplete(result)
			})
			.catch(err => {
				console.log(err.response)
				this.setState({ loading: false })
			})
	}

	setCropImage = (image_blob) => {
		this.setState({ croppedImageUrl: image_blob })
	}

	setBlob = (blob) => {
		this.setState({ blob })
	}

	render = () => {
		const { loading } = this.state

		return (
			<form id="scan-form" className="upload-scan-wrapper">
				<UploadScanBlock 
					setCropImage={this.setCropImage}
					setBlob={this.setBlob}
					onAnalyse={this.onSubmit}
					is_analysing={loading}
				/>
			</form>
		)
	}
}