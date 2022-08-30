import React, {useEffect, useState} from 'react';
import SubmitImg from './submitImg';
import '../css/home.css'

export default function Backstage() {
    const [imgFile, setImgFile] = useState(null);
    const [imgShow, setImgShow] = useState([]);
    const [fetchedState, setFetchedState] = useState([]);
    const [imgDelete, setImgDelete] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const imgResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllImgsStatus`)).json();
            const postResponse = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllPostsDetails`)).json();
            setPost(postResponse);
            setImgShow(imgResponse);
            setFetchedState(imgResponse);
            const del = imgResponse.map(file => {
                return {...file, show: false};
            })
            setImgDelete(del);
        })();
    }, [])

    async function handleClickRender() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/renderImgs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(imgShow)
        })).json();
        if(response){
            setFetchedState(imgShow);
            alert('render complete!');
        }
    }

    async function handleClickDelete() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/deleteImgs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(imgDelete)
        })).json();
        if(response){
            alert('delete complete!');
        }
        const response2 = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllImgsStatus`)).json();
        setImgShow(response2);
        const del = response2.map(file => {
            return {...file, show: false};
        })
        setImgDelete(del);
    }

    function renderPicChoice() {
        return <div>
            {imgShow.map(file => {
            return <div key={file.name}>
                <input type='checkbox' filename={file.name} checked={file.show} onChange={(e)=>{
                    const next = imgShow.map(obj => {
                        if(e.target.getAttribute('filename')===obj.name)
                            return {...obj, show: !obj.show};
                        return obj;
                    })
                    setImgShow(next);
                }}/>
                <label>{file.name}</label>
            </div>
        })}
        {imgShow?<input type='submit' value="render" onClick={()=>handleClickRender()}/>:<div/>}
        </div>
    }

    function deletePicChoice() {
        return <div>
            {imgDelete.map((file, index) => {
                return <div key={file.name}>
                    <input type='checkbox' filename={file.name} disabled={fetchedState[index].show} onChange={(e)=>{
                        const next = imgDelete.map(obj => {
                            if(e.target.getAttribute('filename')===obj.name)
                                return {...obj, show: !obj.show};
                            return obj;
                        })
                        setImgDelete(next);
                    }}/>
                    <label>{file.name}</label>
                </div> 
            })}
        {imgDelete?<input type='submit' value="delete" onClick={()=>handleClickDelete()}/>:<div/>}
        </div>
    }

    async function handleSubmitPost() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/submitPost`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(post)
        })).json();
        if(response){
            alert('Post sended!')
        }
    }

    function renderPost() {
        return <div className='posts'>
            {post.map((file, index) => {
                return <div key={`post${index}`} className='post'>
                    <label>link{index+1}:</label>
                    <input value={file.link} style={{width: '100%', fontSize: '20px'}} onChange={e=>{
                        let tmp = post.slice();
                        tmp[index].link = e.target.value;
                        setPost(tmp);
                    }}/>
                    <label>type:</label>
                    <select value={post[index].type} onChange={(e)=>{
                        let tmp = post.slice();
                        tmp[index].type = e.target.value;
                        setPost(tmp);
                    }}>
                        <option>post</option>
                        <option>video</option>
                    </select>
                </div>
            })}
            <input type='submit' value='send' onClick={()=>handleSubmitPost()}/>
        </div>
    }

    return <div>
        <SubmitImg 
            imgFile={imgFile} 
            setImgFile={setImgFile} 
            setImgShow={setImgShow}
            setFetchedState={setFetchedState}
            setImgDelete={setImgDelete}
        />

        <div className='renderAndDelete'>
            <div className="chooseImg">
                {imgShow.length?<p>render which pictures?</p>:<div/>}
                {renderPicChoice()}
            </div>
            <div className="chooseImg">
                {imgDelete.length?<p>delete which pictures?</p>:<div/>}
                {deletePicChoice()}
            </div>
        </div>
        {renderPost()}
    </div>
}