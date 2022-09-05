import React from 'react';
import './submitImg.css';

export default function SubmitImg(props) {

    async function handleSubmitImg() {
        if(!props.imgFile){
            alert('請選擇一個檔案!');
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
        let response = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
        response = response.map((file, index) => {
            return {...file, color: index};
        })
        props.setImgStatus(response);
    }

    function handleRepeated() {
        for(let i in props.imgStatus){
            if(props.imgStatus[i].name===props.imgFile.name){
                alert('檔案重複，請選擇另一個檔案!');
                return true;
            }
        }
        const idx = props.imgFile.name.lastIndexOf('.');
        const extension = props.imgFile.name.slice(idx+1);
        if(extension!=='jpg' && extension!=='jpeg' && extension!=='png'){
            alert('請確認副檔名是否為 jpg, jpeg 或 png!');
            return true;
        }
        alert('上傳完成!');
        return false;
    }

    return <div className="submitImg">
            <h1>上傳圖片</h1>
            <div className='border'>
                <input type="file" id="uploadImg" onChange={event=>props.setImgFile(event.target.files[0])}/>
                {props.imgFile?
                <div>
                    <p>檔案名稱: {props.imgFile.name}</p>
                    <p>檔案格式: {props.imgFile.type}</p>
                    <p>檔案大小: {(props.imgFile.size/(10**6)).toFixed(2)}MB</p>
                </div>:<div/>}
                <input type='submit' onClick={()=>handleSubmitImg()}/>
            </div>
        </div>
}