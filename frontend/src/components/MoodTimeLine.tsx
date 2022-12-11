import React, {useState, useEffect} from 'react';
import './MoodTimeLine';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function MoodTimeLine() {
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'Mood',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },]
    });
    const [options, _] = useState({responsive: true,
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
            display: true,
            text: 'Timeline of moods',
            },
        },
    });

    useEffect(() => {
        const id = localStorage.getItem('id');
        fetch('http://localhost:8000/mood/' + id)
        .then(response => {
            return response.json();
        }).then(data => {
            data.sort((x: any, y: any) => {return new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()});
            console.log(data);
            setData({
                labels: data.map((element: {timestamp: string; mood: number;}) => {
                    const date = new Date(element.timestamp);
                    return date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
                }),
                datasets: [
                    {
                        label: 'Mood',
                        data: data.map((element: {timestamp: string, mood: number;}) => 
                            element.mood),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            });
        })
    }, []);

    return (
        <div className="mood-time-line">
            <Line options={options} data={data} />
        </div>
    );
};