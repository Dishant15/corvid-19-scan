import React, {useState, useCallback} from 'react'
import { useHistory, Link } from 'react-router-dom'

import Urls from '../../UrlConfig';

import SocialLogin from "../components/SocialLogin";
import ErrorBlock from "../../others/ErrorBlock"
import LoadingButton from '../../others/LoadingButton'

export default ({from_route}) => {
    /**
     * Parent :
     *      AuthPage
     * 
     * All private route will redirect users to this page if he is not logged
     * Check all other conditions and check where logged user needs to go first
     * Show login form only if he is not logged
     */

    // this can be email or username
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [api_state, setApiState] = useState({loading: false, errors: {}})

    const history = useHistory()

    const loginUser = useCallback((e) => {
        if(e) e.preventDefault();
        history.push('/')
    }, [])

    return (
        <form onSubmit={loginUser}>
            <div className="logo-wrapper">
                <div>LOGO</div>
            </div>
            <div className="form-content-margin">
                <div className="title accent-text bold">Welcome</div>
                <div className="sub-title accent-text">Welcome corvid-19-scan, enter details and press on Sign In to continue</div>

                <div className="wrapper">
                    <input name='username' placeholder='Enter Username' type='text' 
                        className="auth-input"
                        onChange={({ target }) => setUsername(target.value)} 
                        value={username}
                    />
                    <ErrorBlock
                        field="username"
                        error={api_state.errors} />
                    <ErrorBlock
                        field="email"
                        error={api_state.errors} />
                </div>

                <div className="wrapper">
                    <input name='password' placeholder='Enter Password' type='password'
                        className="auth-input"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                    <ErrorBlock
                        field="password"
                        error={api_state.errors}
                    />
                    <ErrorBlock
						field="__all__"
						error={api_state.errors} />
                </div>
                <div className="tiny-url accent-text">
                    Forget Password ? 
                    <Link className="bold text-link" to={Urls.getForgotPassPage()}> Click here</Link>
                </div>
                <div className="btn-wrapper">
                    <LoadingButton 
                        className="btn primary-color-btn" 
                        onClick={loginUser}
                        loading={api_state.loading}
                        label="LogIn"
                    />

                    <div className="tiny-url accent-text center">
                        Don't Have an Account ? 
                        <Link className="bold text-link light" to={Urls.getAuthPages('signup')}> Sign up</Link>
                    </div>
                </div>
            </div>

            <SocialLogin setApiState={setApiState} />
        </form>
    )
}