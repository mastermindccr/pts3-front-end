/*global FB*/

import React, {useState, useEffect} from 'react';
import Header from './components/js/header';
import Carousel from './components/js/carousel';
import FanPages from './components/js/fanPages';
import Footer from './components/js/footer';
import logo from './components/images/3logo.png';
import './index.css';

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [fanPages, setFanPages] = useState([]);
    useEffect(() => {
        document.title = '公視三台首頁';
        (async () => {
            const bannerResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/public/banners`)).json();
            setBanners(bannerResponse);
            const fanPagesResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/public/fanPages`)).json();
            setFanPages(fanPagesResponse);
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

    return <div>
        <Header/>
        <Carousel banners={banners}/>
        <div className='container'>
            <h1 style={{textAlign: 'center', marginBottom: '-12px', textShadow: 'rgba(255, 255, 255, 1) 0px 0px 6px'}}>
                <img src={logo} height="100" alt=""/>
            </h1>
            <br/>
            <div class="row">
                <p style={{fontSize: '20px', margin: '20px 0', lineHeight: '2em'}}>我國在政府數位政策的推動下，公共電視無線高畫質頻道「公視HD」，於2012年7月正式全面啟動。這是國內第一個「免付費」的無線高畫質頻道，自105年7月6日起公視HD頻道改版為「公視3台」。每日播出時間為上午06:00至凌晨02:00，只要家中具備支援高畫質訊號的電視機，再加上高畫質數位電視接收機與天線，即可立即體驗HD頻道所帶來的驚人魅力！</p>
            </div>
            <FanPages fanPages={fanPages}/>
        </div>
        <Footer/>
    </div>
}