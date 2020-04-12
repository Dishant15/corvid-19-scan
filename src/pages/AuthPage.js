import React from 'react'
import { get } from "lodash";

import LoginPage from "../auth/pages/LoginPage";

import PageNotFound from '../others/PageNotFound'

import { BLUR_BG } from '../constants'

import './AuthPage.scss'

export default (props) => {

    /**
     * Parent : 
     *      App
     * 
     * Renders: 
     *      LoginPage
     */

    const auth_type = get(props, 'match.params.auth_type', 'login')
    const from_route = get(props, 'location.state.from.pathname')
    
    let page;
    
    switch (auth_type) {
        case 'login':
            page = <LoginPage from_route={from_route} />;
            break;

        default:
            return <PageNotFound />
    }

    return (
        <React.Fragment>
            <div className="auth-fixed-bg">
                <img src={BLUR_BG} alt=""/>
            </div>    
            <div className="auth-body-wrapper">
                <div className="auth-card">
                    {page}
                </div>
            </div>
        </React.Fragment>
    )
}