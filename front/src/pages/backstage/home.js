import React, {useEffect, useState} from 'react';
import '../css/backstage.css'

export default function Backstage() {
    const [imageFile, setImageFile] = useState(null);
    const [imageShow, setImageShow] = useState([]);
    const [fetchedState, setFetchedState] = useState([]);
    const [imageDelete, setImageDelete] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const imageResponse = await (await fetch('http://localhost:5000/getAllImagesStatus')).json();
            const postResponse = await (await fetch('http://localhost:5000/getAllPostsDetails')).json();
            setPost(postResponse);
            setImageShow(imageResponse);
            setFetchedState(imageResponse);
            const del = imageResponse.map(file => {
                return {...file, show: false};
            })
            setImageDelete(del);
        })();
    }, [])

    async function handleSubmit() {
        if(!imageFile){
            alert('please select a file!');
            return;
        }
        if(await handleRepeated()) return;
        const formData = new FormData();
        formData.append('img', imageFile);
        await fetch('http://localhost:5000/submitImage', {
            method: 'POST',
            body: formData
        });
        document.getElementById('uploadImage').value = '';
        setImageFile(null);
        const response = await (await fetch('http://localhost:5000/getAllImagesStatus')).json();
        setImageShow(response);
        setFetchedState(response);
        const del = response.map(file => {
            return {...file, show: false};
        })
        setImageDelete(del);
    }

    async function handleRepeated() {
        const response = await (await fetch('http://localhost:5000/checkImageExists', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": imageFile.name
            })
        })).json()
        if(response === 'repeated'){
            alert('please upload another one!');
            return true;
        }
        alert('upload completed!');
        return false;
    }

    async function handleClickRender() {
        const response = await (await fetch('http://localhost:5000/renderImages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(imageShow)
        })).json();
        if(response){
            setFetchedState(imageShow);
            alert('render complete!');
        }
    }

    async function handleClickDelete() {
        const response = await (await fetch('http://localhost:5000/deleteImages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(imageDelete)
        })).json();
        if(response){
            alert('delete complete!');
        }
        const response2 = await (await fetch('http://localhost:5000/getAllImagesStatus')).json();
        setImageShow(response2);
        const del = response2.map(file => {
            return {...file, show: false};
        })
        setImageDelete(del);
    }

    function renderPicChoice() {
        return <div>
            {imageShow.map(file => {
            return <div key={file.name}>
                <input type='checkbox' filename={file.name} checked={file.show} onChange={(e)=>{
                    const next = imageShow.map(obj => {
                        if(e.target.getAttribute('filename')===obj.name)
                            return {...obj, show: !obj.show};
                        return obj;
                    })
                    setImageShow(next);
                }}/>
                <label>{file.name}</label>
            </div>
        })}
        {imageShow?<input type='submit' value="render" onClick={()=>handleClickRender()}/>:<div/>}
        </div>
    }

    function deletePicChoice() {
        return <div>
            {imageDelete.map((file, index) => {
                return <div key={file.name}>
                    <input type='checkbox' filename={file.name} disabled={fetchedState[index].show} onChange={(e)=>{
                        const next = imageDelete.map(obj => {
                            if(e.target.getAttribute('filename')===obj.name)
                                return {...obj, show: !obj.show};
                            return obj;
                        })
                        setImageDelete(next);
                    }}/>
                    <label>{file.name}</label>
                </div> 
            })}
        {imageDelete?<input type='submit' value="delete" onClick={()=>handleClickDelete()}/>:<div/>}
        </div>
    }

    function renderPost() {
        return post.map((file, index) => {
            return <div className='post'>
                <label>link{index+1}:</label>
                <input value={file.link} style={{width: '100%', fontSize: '20px'}}/>
                <label>type:</label>
                <select>
                    <option>post</option>
                    <option>video</option>
                </select>
            </div>
        })
        
    }

    return <div>
        <div className="submitPic">
            <h1>Submit Pictures</h1>
            <div className='border'>
                <input type="file" id="uploadImage" onChange={event=>setImageFile(event.target.files[0])}/>
                {imageFile?
                <div>
                    <p>filename: {imageFile.name}</p>
                    <p>filetype: {imageFile.type}</p>
                    <p>filesize: {imageFile.size} bytes</p>
                </div>:<div/>}
                <input type='submit' onClick={()=>handleSubmit()}/>
            </div>
        </div>
        <div className='renderAndDelete'>
            <div className="choosePic">
                {imageShow.length?<p>render which pictures?</p>:<div/>}
                {renderPicChoice()}
            </div>
            <div className="choosePic">
                {imageDelete.length?<p>delete which pictures?</p>:<div/>}
                {deletePicChoice()}
            </div>
        </div>
        {renderPost()}
    </div>
}