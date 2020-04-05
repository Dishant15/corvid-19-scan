import React from 'react';

import Analytics from "../pages/Analytics";
import Questions from "../pages/Questions";
import UploadScan from "../pages/UploadScan";

import "./Container.scss";

export default ({tab}) => {

    let content;
    if(tab === 1) {
        content = <Questions />
    } else if(tab === 2) {
        content = <UploadScan />
    } else if(tab === 3) {
        content = <Analytics />
    }

    return (
        <div className='App-container'>
            {content}
        </div>
    )
}