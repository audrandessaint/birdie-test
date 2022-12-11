import React, {useState, useEffect} from 'react';
import './LoginPage.css';

import { useNavigate } from 'react-router-dom';
import BirdieLogo from '../../assets/images/birdie-logo.svg';
import LoginPageForm from '../../components/LoginPageForm';

interface Props {
    clientIDList: Array<string>;
}

export default function LoginPage() {
    const [idList, setIdList] = useState<string[]>([]);
    
    useEffect(() => {
        fetch('http://localhost:8000/care-recipients')
        .then((response: Response) => {
            return response.json();
        }).then((data) => {
            const result: Array<string> = [];
            data.forEach((element: {care_recipient_id: string}) => {
                result.push(element.care_recipient_id);
            });
            setIdList(result);
        })
    }, []);

    const navigate = useNavigate();
    const login = (id: string) => {
        if (idList.includes(id)) {
            localStorage.setItem('id', id);
            navigate("/homepage");
        }
    }
    return (
        <div className="login-page">
            <div>
                <img id="login-page-birdie-logo" src={BirdieLogo} alt="Birdie logo" />
            </div>
            <LoginPageForm login={login}/>
            <div className="login-page-info">
                <div className="login-page-disclaimer">This site was not created by Birdie, it was created as part of an evaluation exercise. Valid IDs are:</div>
                <ul className="login-page-id-list"> 
                {idList.map((id: string) => 
                    <li key={id}>{id}</li>
                )}
                </ul>
            </div>
        </div>
    );
};