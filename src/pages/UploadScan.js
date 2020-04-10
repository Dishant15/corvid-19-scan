import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';

import './UploadScan.scss'
import 'react-image-crop/lib/ReactCrop.scss';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg'

export default class UploadScan extends Component {

	constructor(props){
		super(props)
		this.state = {
			imgSrc: null,
			croppedImageUrl: null,
			crop: {
				unit: '%',
			}
		}
	}

	handleFileSelect = (event) => {
		const selected_image = event.target.files[0]
		if(selected_image) {
			this.setState({ imgSrc: URL.createObjectURL(selected_image) })
		}
	}

	handleOnCropChange = (crop) => {
		this.setState({crop})
	}

	onImageLoaded = image => {
		this.imageRef = image;
	};

	onCropClick = () => {
		this.makeClientCrop(this.state.crop)
	}

	onCropCancleClick = () => {
		this.setState({ imgSrc: null, 
			croppedImageUrl: null,
			crop: {
				unit: '%',
			}
		})
	}

	makeClientCrop = async (crop) => {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(
										this.imageRef,
										crop,
										'newFile.jpeg'
									);
			this.setState({ croppedImageUrl });
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
			blob.name = fileName;
			window.URL.revokeObjectURL(this.fileUrl);
			this.fileUrl = window.URL.createObjectURL(blob);
			resolve(this.fileUrl);
			}, 'image/jpeg');
		});
	}

	render = () => {
		const { imgSrc, crop, croppedImageUrl } = this.state

		return (
			<div className="upload-scan-wrapper">
				{imgSrc ?
					<div>
						<ReactCrop 
							src={imgSrc} 
							crop={crop}
							onImageLoaded={this.onImageLoaded}
							onChange={this.handleOnCropChange}/>
						<button onClick={this.onCropClick}>Crop</button>
						<button onClick={this.onCropCancleClick}>Cancle</button>						
					</div>
					:
					<div className="upload-block">
						<div>
							<input type='file' 
								accept={acceptedFileTypes} 
								multiple={false} 
								onChange={this.handleFileSelect} 
							/>
						</div>
					</div>
				}
				{croppedImageUrl && 
					<div>
						<img src={croppedImageUrl} alt="crop"/>
						<button onClick={() => this.setState({ croppedImageUrl: null })}>Re-Crop</button>
						<button>Done</button>
					</div>}
			</div>
		)
	}
}