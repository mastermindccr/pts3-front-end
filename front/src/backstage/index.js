import React, {useEffect, useState} from 'react';
import SubmitImg from './components/submitImg.js';
import ImgChoices from './components/imgChoices.js';
import FanPages from './components/fanPages.js';

export default function Home() {
    const [imgFile, setImgFile] = useState(null); // file selected 
    const [imgStatus, setImgStatus] = useState([]); // status about all submitted images
    const [fanPages, setFanPages] = useState([]); // URLs of the three fan pages

    // fetch initial infos from the back end server
    useEffect(() => {
        document.title = '公視三台後台';
        (async () => {
            let imgResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
            imgResponse = imgResponse.map((file, index)=>{return {...file, color: index}});
            setImgStatus(imgResponse);

            let fanPagesResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/public/fanPages`)).json();
            setFanPages(fanPagesResponse);
            
        })();
    }, [])

    return <div>
        <SubmitImg 
            imgFile={imgFile}
            setImgFile={setImgFile}
            imgStatus={imgStatus}
            setImgStatus={setImgStatus}
        />
        <ImgChoices
            imgStatus={imgStatus}
            setImgStatus={setImgStatus}
        />
        <FanPages
            fanPages={fanPages}
            setFanPages={setFanPages}
        />
    </div>
}