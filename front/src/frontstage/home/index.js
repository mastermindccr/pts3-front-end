/*global FB*/

import React, {useState, useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper/MobileStepper';
import './index.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [post, setPost] = useState([]);
    useEffect(() => {
        (async () => {
            const bannerResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getImgsOnBanner`)).json();
            setBanners(bannerResponse);
            const postResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllPostsDetails`)).json();
            setPost(postResponse);
        })();
    }, []);

    useEffect(()=>{
        window.fbAsyncInit = function() {
            //SDK loaded, initialize it
            FB.init({
                version: 'v11.0'
            });
            setTimeout(()=>{FB.XFBML.parse()}, 100)
        };
    
        //load the JavaScript SDK
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/zh_TW/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })

    function renderBanner() {
        if(banners.length)
            return <AutoPlaySwipeableViews enableMouseEvents axis='x-reverse'>
                {banners.map((img, index) => {
                    return <img src={`${process.env.REACT_APP_backend_server}/img/${img}`} alt="" key={index} style={{width:'100%'}}/>
                })}
            </AutoPlaySwipeableViews>
    }

    return <div>
        <div className='banner'>
            {renderBanner()}
        </div>
        <div>
            {post.length?
            <div className='fbPages'>
                {post.map((post, index) => {
                    return <div><div class="fb-page" href={post} tabs="timeline" width="500" height="500" key={index}></div></div>
                })}
            </div>:null}
        </div>
    </div>
}