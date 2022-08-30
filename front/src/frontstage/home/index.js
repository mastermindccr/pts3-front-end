import React, {useState, useEffect} from 'react';
import {FacebookEmbed} from 'react-social-media-embed';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
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

    function renderBanner() {
        if(banners.length)
            return <AutoPlaySwipeableViews enableMouseEvents axis='x-reverse'>
                {banners.map((img, index) => {
                    return <img src={`${process.env.REACT_APP_backend_server}/${img}`} alt="" key={index} style={{width:'100%'}}/>
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
                    return <FacebookEmbed url={post} width={500} height={500} key={index}/>
                })}
            </div>:<div/>}
        </div>
    </div>
}