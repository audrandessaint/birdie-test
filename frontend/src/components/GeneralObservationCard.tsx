import React, {useState, useEffect} from 'react';

interface Props {
    timestamp: string;
    note: string;
}

export default function GeneralObservationCard({timestamp, note}: Props) {
    const [dateFormat, setDateFormat] = useState("");

    useEffect(() => {
        const date = new Date(timestamp);
        setDateFormat(date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString());
    }, [timestamp]);

    return (
        <div className="general-observation-card">
            <div className="general-observation-card-date">
                {dateFormat}
            </div>
            <div className="general-boservation-card-content">
                {note}
            </div>
        </div>
    )
};