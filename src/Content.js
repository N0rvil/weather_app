import React from 'react';
import './content.css';

const Content = (props) => {
    return (
        <div className="content">
            <div className="content__city">{props.city}</div>
            <div className="content__img-box"><img className="content__img" alt="img" src={props.weatherIcon} /></div>
            <div className="content__info">
                <div className="content__temperature">{props.temperature}</div>
                <div className="content__line"></div>
                <div className="content__weather">{props.weatherDescription}</div>
            </div>
        </div>
    );
};

export default Content;