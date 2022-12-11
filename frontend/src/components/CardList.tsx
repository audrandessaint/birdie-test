import React, {useState, useEffect, ReactChild, ReactChildren} from 'react';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import './CardList.css';

interface Props {
    children: ReactChild[];
}

export default function CardList({children}: Props) {
    return (
        <ul className="card-list">
            {children.map((child: ReactChild, index: number) => <li className="card-list-item" key={index}>{child}</li>)}
        </ul>
    );
};