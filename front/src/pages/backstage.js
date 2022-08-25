import React, {useEffect, useState} from 'react';
import '../css/backstage.css'

export default function Backstage() {
    const [imageFile, setImageFile] = useState(null);
    const [imageShow, setImageShow] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await (await fetch('http://localhost:5000/getImagesURL')).json()
            setImageShow(response);
        })();
    }, [])

    async function handleImgShow() {
        setImageShow(await (await fetch('http://localhost:5000/getImagesURL')).json());
    }

    async function handleSubmit() {
        if(!imageFile){
            alert('please select a file!');
            return;
        }
        if(await handleRepeated()) return;
        const formData = new FormData();
        formData.append('img', imageFile);
        await fetch('http://localhost:5000/submit', {
            method: 'POST',
            body: formData
        });
        document.getElementById('uploadImage').value = '';
        setImageFile(null);
        await handleImgShow();
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
        const response = await (await fetch('http://localhost:5000/render', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(imageShow)
        })).json();
        if(response){
            alert('render completed!');
        }
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

    return <div>
        <div className="submitPic">
            <h1>Submit A File</h1>
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
        <div className="choosePic">
            {imageShow.length?<p>render which pictures?</p>:<div/>}
            {renderPicChoice()}
        </div>
    </div>
}