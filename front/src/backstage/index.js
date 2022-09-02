import React, {useEffect, useState} from 'react';
import SubmitImg from './components/submitImg';
import ImgChoices from './components/imgChoices';
import Post from './components/post';

export default function Home() {
    const [imgFile, setImgFile] = useState(null);
    const [imgStatus, setImgStatus] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const imgResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
            const postResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/public/posts`)).json();
            setPost(postResponse);
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
        <Post
            post={post}
            setPost={setPost}
        />
    </div>
}