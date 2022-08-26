import React, {useState, useEffect} from 'react';
import '../css/home.css';

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
        }, 300);
        return () => clearInterval(intervalId);
    })

    function renderBanner() {
        return banners.length?
        <img 
            src={`http://localhost:5000/${banners[current]}`}
            alt={current} 
            onError={(e)=>{
                e.target.src = `http://localhost:5000/default.png`;
                e.target.onError = false;
                (async () => {
                    const response = await (await fetch('http://localhost:5000/getImagesOnBanner')).json()
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
        <div className='fbPages'>
            <div 
                className="fb-video"
                data-href="https://fb.watch/f8eB6ymMwj/" 
                data-width="500"
                data-show-text="true"
            />
            <div 
                className="fb-post" 
                data-href="https://www.facebook.com/NorthDistrictTrafficConcernGroupHK/posts/pfbid02vAssmYoCkhoFB6YkSsF52SozewjLz3m1JmKLzJAYFGiZGSxfWMYEUGcxxSXE93Xel?__cft__[0]=AZVBzx0CHTck4FI1qz72P8dCNW-8Jl7qdTUVu6jQR7xyaqgxPWkiz22-B0rcJ7_9213lcxgKg2iO4O37N8Gge_45W877T1zI87u3H5XK3W0jTzeP4beUkTnRxOJyMSnmeTJV4m75PXaXmjOdPdGERbO2Jb6oTJidxeKVO98UTfNY86s1GRYkVjp3lqfE4A5ixdo&__tn__=%2CO%2CP-R" 
                data-width="500"
                data-show-text="true"
            />
            <div 
                className="fb-post" 
                data-href="https://www.facebook.com/PTS1997/posts/pfbid02U6KPvbicqWbN86VMq33pWU1g9paBQK9ySQ9T5WjNF8h3k8xjMGhuNUfKLwhkLVEyl?__cft__[0]=AZWQKUvbfYD9wJx2jraVbiwUUJEOyrameyJnyTSqQpRdhdS7vUOxEPxBinp0GXXkI3DyvplSubpbXVIu0IqT4oU6VVwzFsl6oZqLDCfQM9yy6nhpOV_X-mKAy8vnX9MDMvqJphL4A1yEL0AZ2XiH1C3bijYwd6ee6mUZAkfPC_2NGc7S6INLQv6nZz8arNTpROM&__tn__=%2CO%2CP-R" 
                data-width="500"
                data-show-text="true"
            />
        </div>
        
    </div>
}