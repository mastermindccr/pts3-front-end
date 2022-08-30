import React, {useState, useEffect} from 'react';
import {FacebookEmbed} from 'react-social-media-embed'
import '../css/home.css';

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [current, setCurrent] = useState(0);
    const [post, setPost] = useState([]);
    useEffect(() => {
        (async () => {
            const bannerResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getImagesOnBanner`)).json();
            setBanners(bannerResponse);
            const postResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllPostsDetails`)).json();
            setPost(postResponse);
        })();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(()=>{
            setCurrent((current+1)%banners.length);
        }, 300);
        return () => clearInterval(intervalId);
    })

    function renderBanner() {
        return banners.length?
        <img 
            src={`${process.env.REACT_APP_backend_server}/${banners[current]}`}
            alt={current} 
            onError={(e)=>{
                e.target.src = `${process.env.REACT_APP_backend_server}/default.png`;
                e.target.onError = false;
                (async () => {
                    const response = await (await fetch(`${process.env.REACT_APP_backend_server}/getImagesOnBanner`)).json()
                    setBanners(response);
                })();
            }}
        />:
        <div/>
    }

    return <div>
        <div className='banner'>
            {renderBanner()}
        </div>
        <div>
            {post.length?
            <div className='fbPages'>
                {post.map(post => {
                    return <FacebookEmbed url={post.link} width={600} height={500}/>
                })}
            </div>:<div/>}
        </div>
    </div>
    
}