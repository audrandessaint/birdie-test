import React, {useState, useEffect} from 'react';
import './TaskCard.css';

interface Props {
    timestamp: string;
    definition: string;
    note: string;
}
export default function TaskCard({timestamp, definition, note}: Props) {
    const [dateFormat, setDateFormat] = useState("");

    useEffect(() => {
        const date = new Date(timestamp);
        setDateFormat(date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString());
    }, [timestamp]);

    return (
        <div className="task-card">
            <div className="task-card-date">
                {dateFormat}
            </div>
            <div className="task-card-content">
                <div className="task-card-definiton">
                    {definition}
                </div>
                <div className="task-card-note">
                    {note}
                </div>
            </div>
        </div>
    )
};