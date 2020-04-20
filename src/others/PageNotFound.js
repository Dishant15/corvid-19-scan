import React from 'react'
import { useHistory } from 'react-router-dom'
import { BLUR_BG, CHECK_ICON } from '../constants';

import LoadingButton from './LoadingButton'

export default (props) => {

	/**
	 * Parent :
	 *      AuthPage
	 * 
	 */
	const history = useHistory()
	
	return (
		<React.Fragment>
			<div class="auth-fixed-bg">
                <img src={BLUR_BG} alt="" />
            </div>    
            <div class="auth-body-wrapper">
                <div class="auth-card">
					<div>
						<div className="logo-wrapper">
							<div>LOGO</div>
						</div>
						<div class="placeholder-img">
							<img src={CHECK_ICON} className="responsive-img" alt=""/>
						</div>
						<div className="form-content-margin">
							<div className="title accent-text bold">Page Not Found</div>
							<div className="sub-title accent-text">Sorry! we can't seem to find the page you were looking for. Please visit the Home Page</div>

							<div className="btn-wrapper" style={{ paddingTop: '5rem'}}>
								<LoadingButton 
									class="btn primary-color-btn"
									onClick={() => history.push('/')}
									label="Go To Home"
									loading={false}
								/>
							</div>
							<div className="btn-wrapper" style={{ paddingBottom : '8rem'}}>
								<LoadingButton 
									class="btn primary-color-btn"
									onClick={() => {}}
									label="Logout"
									loading={false}
								/>
							</div>
						</div>
					</div>
                </div>
            </div>
		</React.Fragment>
	)
}