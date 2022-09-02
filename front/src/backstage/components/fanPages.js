import React from 'react';
import './fanPages.css'

export default function FanPages(props) {

    async function handleSubmitFanPages() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/fanPages`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(props.fanPages)
        })).json();
        if(response){
            alert('FanPages sended!')
        }
    }

    return <div className='fanPages'>
        {props.fanPages.map((file, index) => {
            return <div key={`fanPage${index}`} className='fanPage'>
                <label>link{index+1}:</label>
                <input value={file} style={{width: '100%', fontSize: '20px'}} onChange={e=>{
                    let tmp = props.fanPages.slice();
                    tmp[index] = e.target.value;
                    props.setFanPages(tmp);
                }}/>
            </div>
        })}
        <input type='submit' value='send' onClick={()=>{handleSubmitFanPages()}}/>
    </div>
}