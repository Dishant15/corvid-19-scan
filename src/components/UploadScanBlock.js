import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faCropAlt, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import 'react-image-crop/lib/ReactCrop.scss';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg'

export default class UploadScanBlock extends Component {

	/**
	 * Parent :
	 * 		UploadScan
	 */

	constructor(props){
		super(props)
		this.state = {
			imgSrc: null,
			crop: {
				unit: '%',
			}
		}
	}

	//////////////////////////////////////
	// 		step 1 - Upload image 		//
	/////////////////////////////////////

	handleFileSelect = (event) => {
		const selected_image = event.target.files[0]
		if(selected_image) {
			this.setState({ imgSrc: URL.createObjectURL(selected_image) })
		}
	}

	//////////////////////////////////////
	// 		step 2 - crop image 		//
	/////////////////////////////////////


	handleOnCropChange = (crop) => {
		this.setState({crop})
	}

	onImageLoaded = image => {
		this.imageRef = image;
	};

	onCropClick = () => {
		this.makeClientCrop(this.state.crop)
	}

	onSkipClick = () => {
		this.props.setCropImage(this.state.imgSrc)
	}

	onCropCancleClick = () => {
		this.setState({ imgSrc: null, 
			crop: {
				unit: '%',
			}
		})
		this.props.setCropImage(null)
	}

	//////////////////////////////////////
	// 			util functions 		 	//
	// make image from crop dimentions //
	/////////////////////////////////////

	makeClientCrop = async (crop) => {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(
										this.imageRef,
										crop,
										'newFile.jpeg'
									);
			this.props.setCropImage(croppedImageUrl)
		}
	}

	getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob(blob => {
			if (!blob) {
				//reject(new Error('Canvas is empty'));
				console.error('Canvas is empty');
				return;
			}
			
			this.props.setBlob(blob)
			blob.name = fileName;
			window.URL.revokeObjectURL(this.fileUrl);
			this.fileUrl = window.URL.createObjectURL(blob);
			resolve(this.fileUrl);
			}, 'image/jpeg');
		});
	}

	render = () => {
		const { imgSrc, crop } = this.state
		
		if(imgSrc) { // step 2 - crop image
			return (
				<div className="crop-wrapper">
					<ReactCrop 
						src={imgSrc} 
						crop={crop}
						onImageLoaded={this.onImageLoaded}
						onChange={this.handleOnCropChange}/>

					<div className="action-wrapper">

						<div className="action">
							<button className="btn accent-btn" 
								onClick={this.onCropClick}>
									<FontAwesomeIcon icon={faCropAlt} />
									Crop
							</button>
						</div>

						<div className="action">
							<button className="btn accent-light-btn" 
								onClick={this.onSkipClick}>
									<FontAwesomeIcon icon={faArrowRight} />
									Skip
							</button>
						</div>

						<div className="action">
							<button className="btn accent-secondary-btn" 
								onClick={this.onCropCancleClick}>
									<FontAwesomeIcon icon={faTimes} />
									Cancle
							</button>
						</div>

					</div>
				</div>
			)
		} else {
			return ( //step 1 - Upload image
				<>
					<div className="title">Upload X-ray</div>
					<div className="desc">Upload chest X-ray and get result by AI</div>
					<div className="upload-block">
						<div className="upload-button">
							<button className="btn accent-secondary-btn">
								<FontAwesomeIcon icon={faPaperclip} />
								Select Image
							</button>
							<input type='file' 
								accept={acceptedFileTypes} 
								multiple={false} 
								onChange={this.handleFileSelect} 
							/>
						</div>
					</div>
				</>
			)
		}
	}
}