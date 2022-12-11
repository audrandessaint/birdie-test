import React, { useState } from 'react';
import './LoginPageForm.css';

interface Props {
    login: (id: string) => void;
};

export default function LoginPageForm({login}: Props) {
    const [input, setInput] = useState("");
    const handleChange = (event: any) => {
        setInput(event.target.value)
    }
    
    return (
        <div className="login-page-form">
            <div>
                <label htmlFor="client-id-input">Client ID:</label>
                <input type="text" id="client-id-input" name="client-id-input" value={input} onChange={handleChange} required></input>
            </div>
            <a className="login-page-button"
               onClick={() => login(input)}>Login</a>
        </div>
    )
};