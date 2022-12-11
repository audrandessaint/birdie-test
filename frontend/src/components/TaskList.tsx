import React, {useState, useEffect, ReactChild} from 'react';
import CardList from './CardList';
import TaskCard from './TaskCard';

export default function TaskList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('id');
        fetch('http://localhost:8000/task-completed/' + id)
        .then((response) => {
            return response.json();
        }).then((data) => {
            data.sort((y: any, x: any) => {return new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()});
            setData(data);
        })
    }, []);

    return (
        <CardList>
            {data.map((task: any, index: number,): ReactChild => {return <TaskCard 
                key={index}
                timestamp={task.timestamp}
                definition={task.description}
                note={task.note}
            />;})}
        </CardList>
    );
}