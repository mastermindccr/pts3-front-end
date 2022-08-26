import React, {useState, useEffect} from 'react';

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        (async () => {
            const response = await (await fetch('http://localhost:5000/getImagesOnBanner')).json()
            setBanners(response);
        })();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(()=>{
            setCurrent((current+1)%banners.length);
        }, 200);
        return () => clearInterval(intervalId);
    })

    return <div>
        {banners.length?<img src={`http://localhost:5000/${banners[current]}`}alt={current}/>:<div/>}
        <div class="fb-page" 
        data-href="https://www.facebook.com/Daily-updates-on-Muuuuusic-106710361490079"
        data-width="380" 
        data-hide-cover="false"
        data-show-facepile="false"></div>
    </div>
}