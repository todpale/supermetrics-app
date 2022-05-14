import React, {FC, ReactElement, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

import { ajax } from "../helpers/api";
import { getCookie, setCookie } from "../helpers/cookies";
import { API_URL, INVALID_EMAIL, REQUIRED_FIELD } from "../helpers/constants";
import { valid } from "../helpers/common";

interface State {
    name: string;
    email: string;
}

const Auth: FC = (): ReactElement => {

    const navigate = useNavigate()

    const [data, setData] = useState<State>({
        name: '',
        email: ''
    })
    const [goToPosts, setGoToPosts] = useState(false)
    const [errors, setErrors] = useState<State>({
        name: '',
        email: ''
    })

    useEffect(() => {
        const token = getCookie('sl_token')
        if (typeof token !== 'undefined') {
            navigate('/posts')
        }
    }, [])

    useEffect(() => {
        if (goToPosts) {
            /**
             * I'm really sorry for this solution.
             * I couldn't have a time to find out why useNavigate hook started a loop reloading of page
             */
            window.location.href = '/posts'
        }
    }, [goToPosts])

    useEffect(() => {
        setErrors({
            name: !valid(data.name) ? REQUIRED_FIELD : '',
            email: !valid(data.email) ? INVALID_EMAIL : ''
        })
    }, [data])

    /**
     * Fields validation
     */
    const validateFields = () => valid(data.name) && valid(data.email, 'email')

    /**
     * Make authentication
     */
    const goAuth = async () => {
        if (validateFields()) {
            const res = await ajax(`${API_URL}/register`, {
                client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
                email: data.email,
                name: data.name
            })
            if (res.status === 200) {
                const { sl_token } = res.data.data
                setCookie('sl_token', sl_token)
                setGoToPosts(true)
            }
        }
    }

    return (
        <div className="auth">
            <p className="auth-title">
                Login
            </p>
            <div className="auth-control">
                <label>
                    <span>Name</span>
                    <input
                        type="text"
                        value={ data.name }
                        name="name"
                        className={ errors.name !== '' ? 'error' : '' }
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                    <span className="error-text">
                        { errors.name }
                    </span>
                </label>
            </div>
            <div className="auth-control">
                <label>
                    <span>Email</span>
                    <input
                        type="email"
                        value={ data.email }
                        name="email"
                        className={ errors.email !== '' ? 'error' : '' }
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <span className="error-text">
                        { errors.email }
                    </span>
                </label>
            </div>
            <div className="auth-button">
                <button
                    type="button"
                    onClick={() => goAuth()}
                >
                    Go
                </button>
            </div>
        </div>
    )
}

export default Auth
