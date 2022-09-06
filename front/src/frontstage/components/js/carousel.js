import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
// import './bootstrap.css'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Carousel(props) {
    function renderBanner() {
        if(props.banners.length)
            return <AutoPlaySwipeableViews enableMouseEvents axis='x-reverse'>
                {props.banners.map((img, index) => {
                    return <img src={`${process.env.REACT_APP_backend_server}/img/${img}`} alt="" key={index} style={{width:'100%'}}/>
                })}
            </AutoPlaySwipeableViews>
    }
    return <div className='banner'>
        {renderBanner()}
    </div>
}