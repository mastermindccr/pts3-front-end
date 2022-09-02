import React, {useEffect, useState} from 'react';
import SubmitImg from './components/submitImg';
import ImgChoices from './components/imgChoices';
import FanPages from './components/fanPages';

export default function Home() {
    const [imgFile, setImgFile] = useState(null);
    const [imgStatus, setImgStatus] = useState([]);
    const [fanPages, setFanPages] = useState([]);

    useEffect(() => {
        (async () => {
            const imgResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
            const fanPagesResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/public/fanPages`)).json();
            setFanPages(fanPagesResponse);
            setImgStatus(imgResponse);
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