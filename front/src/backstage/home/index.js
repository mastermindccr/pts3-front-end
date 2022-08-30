import React, {useEffect, useState} from 'react';
import SubmitImg from './components/submitImg';
import ImgChoices from './components/imgChoices';
import Post from './components/post';

export default function Home() {
    const [imgFile, setImgFile] = useState(null);
    const [imgRender, setImgRender] = useState([]);
    const [fetchedState, setFetchedState] = useState([]);
    const [imgDelete, setImgDelete] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const imgResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllImgsStatus`)).json();
            const postResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllPostsDetails`)).json();
            setPost(postResponse);
            setImgRender(imgResponse);
            setFetchedState(imgResponse);
            const del = imgResponse.map(file => {
                return {...file, show: false};
            })
            setImgDelete(del);
        })();
    }, [])

    return <div>
        <SubmitImg 
            imgFile={imgFile} 
            setImgFile={setImgFile} 
            setImgRender={setImgRender}
            setFetchedState={setFetchedState}
            setImgDelete={setImgDelete}
        />
        <ImgChoices
            imgRender={imgRender}
            setImgRender={setImgRender}
            fetchedState={fetchedState}
            setFetchedState={setFetchedState}
            imgDelete={imgDelete}
            setImgDelete={setImgDelete}
        />
        <Post
            post={post}
            setPost={setPost}
        />
    </div>
}