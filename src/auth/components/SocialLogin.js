import React from 'react'

import { 
    FB_BTN, GOOGLE_BTN,
} from '../../constants';

export default ({setApiState}) => {

    return (
        <div class="social-media-wrapper">

            <div class="social-btn-wrapper">
                <img src={GOOGLE_BTN} alt=""/>
            </div>

            <div class="social-btn-wrapper">
                <img src={FB_BTN} alt=""/>
            </div>

        </div>
    )
}