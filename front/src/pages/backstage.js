import React, {useState} from 'react';

export default function Backstage() {
    const [imageFile, setImageFile] = useState(null);

    async function handleSubmit() {
        const response = await fetch('https://5000-cs-901156777793-default.cs-asia-east1-jnrc.cloudshell.dev/submit', {
            method: 'POST',
            body: imageFile
        });
        console.log(await response.json());
        return;
    }

    return <div>
        <h1>Submit A File</h1>
        <input type="file" onChange={event=>setImageFile(event.target.files[0])}/>
        {imageFile?
        <div>
            <p>filename: {imageFile.name}</p>
            <p>filetype: {imageFile.type}</p>
            <p>filesize: {imageFile.size} bytes</p>
        </div>
        :<div/>}
        <input type='submit' onClick={async()=>await handleSubmit()}/>
    </div>
}