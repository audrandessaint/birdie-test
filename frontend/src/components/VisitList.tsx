import React, {useState, useEffect, ReactChild} from 'react';
import CardList from './CardList';
import VisitCard from './VisitCard';

export default function VisitList() {
    const [data, setData] = useState([]);
    return (
        <CardList>
            {data.map((visit: any): ReactChild => {return <VisitCard />;})}
        </CardList>
    );
}