import React from 'react';
import './post.css'

export default function Post(props) {

    async function handleSubmitPost() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/submitPost`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(props.post)
        })).json();
        if(response){
            alert('Post sended!')
        }
    }

    return <div className='posts'>
        {props.post.map((file, index) => {
            return <div key={`post${index}`} className='post'>
                <label>link{index+1}:</label>
                <input value={file.link} style={{width: '100%', fontSize: '20px'}} onChange={e=>{
                    let tmp = props.post.slice();
                    tmp[index].link = e.target.value;
                    props.setPost(tmp);
                }}/>
                <label>type:</label>
                <select value={props.post[index].type} onChange={(e)=>{
                    let tmp = props.post.slice();
                    tmp[index].type = e.target.value;
                    props.setPost(tmp);
                }}>
                    <option>post</option>
                    <option>video</option>
                </select>
            </div>
        })}
        <input type='submit' value='send' onClick={()=>handleSubmitPost()}/>
    </div>
}