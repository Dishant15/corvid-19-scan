import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'

import "./Navbar.scss";

export default ({tab, setTab}) => {

    return (
        <div className='sidebar-wrapper'>

            <div className={`sb-pill ${tab === 1 ? 'active' : ''}`} 
                onClick={() => setTab(1)} >

                <div className='sb-pill-content'>
                    <div className='sb-pill-icn'>
                        <FontAwesomeIcon icon={faQuestion} />
                    </div>
                    <div className='sb-pill-txt'>
                        Q and A
                    </div>
                </div>
            </div>

            <div className={`sb-pill ${tab === 2 ? 'active' : ''}`} 
                onClick={() => setTab(2)} >

                <div className='sb-pill-content'>
                    <div className='sb-pill-icn'>
                        <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <div className='sb-pill-txt'>
                        Upload
                    </div>
                </div>
            </div>

            <div className={`sb-pill ${tab === 3 ? 'active' : ''}`} 
                onClick={() => setTab(3)} >

                <div className='sb-pill-content'>
                    <div className='sb-pill-icn'>
                        <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <div className='sb-pill-txt'>
                        Analytics
                    </div>
                </div>
            </div>

        </div>
    )
}