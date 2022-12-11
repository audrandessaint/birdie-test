import React, {useState, useEffect, ReactChild} from 'react';
import CardList from './CardList';
import GeneralObservationCard from './GeneralObservationCard';

export default function GeneralObservationList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('id');
        fetch('http://localhost:8000/general-observation/' + id)
        .then(response => {
            return response.json();
        }).then(data => {
            data.sort((y: any, x: any) => {return new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()});
            setData(data);
        })
    }, []);

    return (
        <CardList>
            {data.map((observation: any): ReactChild => {return <GeneralObservationCard 
                key={observation.timestamp}
                timestamp={observation.timestamp}
                note={observation.note}
            />;})}
        </CardList>
    );
}