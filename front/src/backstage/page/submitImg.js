import React from 'react';
import '../css/home.css'

export default function SubmitImg(props) {

    async function handleSubmitImg() {
        if(!props.imgFile){
            alert('please select a file!');
            return;
        }
        if(await handleRepeated()) return;
        const formData = new FormData();
        formData.append('img', props.imgFile);
        formData.append('filename', props.imgFile.name);
        await fetch(`${process.env.REACT_APP_backend_server}/submitImg`, {
            method: 'POST',
            body: formData
        });
        document.getElementById('uploadImg').value = '';
        props.setImgFile(null);
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllImgsStatus`)).json();
        props.setImgShow(response);
        props.setFetchedState(response);
        const del = response.map(file => {
            return {...file, show: false};
        })
        props.setImgDelete(del);
    }

    async function handleRepeated() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/checkImgExists`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "name": props.imgFile.name
            })
        })).json()
        if(response === 'repeated'){
            alert('please upload another one!');
            return true;
        }
        alert('upload completed!');
        return false;
    }

    return <div className="submitImg">
            <h1>Submit Pictures</h1>
            <div className='border'>
                <input type="file" id="uploadImg" onChange={event=>props.setImgFile(event.target.files[0])}/>
                {props.imgFile?
                <div>
                    <p>filename: {props.imgFile.name}</p>
                    <p>filetype: {props.imgFile.type}</p>
                    <p>filesize: {props.imgFile.size} bytes</p>
                </div>:<div/>}
                <input type='submit' onClick={()=>handleSubmitImg()}/>
            </div>
        </div>
}