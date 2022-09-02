import React from 'react';
import './submitImg.css';

export default function SubmitImg(props) {

    async function handleSubmitImg() {
        if(!props.imgFile){
            alert('please select a file!');
            return;
        }
        if(handleRepeated()) return;
        const formData = new FormData();
        formData.append('img', props.imgFile);
        await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs/${props.imgFile.name}`, {
            method: 'POST',
            body: formData
        });
        document.getElementById('uploadImg').value = '';
        props.setImgFile(null);
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
        props.setImgStatus(response);
    }

    function handleRepeated() {
        for(let i in props.imgStatus){
            if(props.imgStatus[i].name===props.imgFile.name){
                alert('please upload another one!');
                return true;
            }
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