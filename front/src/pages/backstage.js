import React, {useState} from 'react';

export default function Backstage() {
    const [imageFile, setImageFile] = useState(null);

    async function handleSubmit() {
        const response = await fetch('https://5000-1d93dc6a-02b4-4f81-8035-4ffd3bf1ddee.cs-asia-east1-jnrc.cloudshell.dev/submit', {
            method: 'POST',
            credentials: 'include',
            body: "Hello"
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