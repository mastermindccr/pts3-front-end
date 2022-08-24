import React, {useState} from 'react';

export default function Backstage() {
    const [imageFile, setImageFile] = useState(null);

    async function handleSubmit() {
        if(!imageFile){
            alert('please select a file!');
            return;
        }
        if(await handleRepeated()) return;
        const formData = new FormData();
        formData.append('img', imageFile);
        const response = await (await fetch('http://localhost:5000/submit', {
            method: 'POST',
            body: formData
        })).json();
        if(response) console.log(response);
        return;
    }

    async function handleRepeated () {
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

    return <div>
        <h1>Submit A File</h1>
        <input type="file" onChange={event=>setImageFile(event.target.files[0])}/>
        {imageFile?
        <div>
            <p>filename: {imageFile.name}</p>
            <p>filetype: {imageFile.type}</p>
            <p>filesize: {imageFile.size} bytes</p>
        </div>:<div/>}
        <input type='submit' onClick={async()=>await handleSubmit()}/>
    </div>
}