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
        }));
        try{
            if(response.json()){
                alert('送出成功!');
            }
            else{
                alert('送出失敗，請刷新頁面後再重試一次!');
            }
        }
        catch(e){
            alert('伺服器錯誤!');
        }

    }

    return <div className='fanPages'>
        {props.fanPages.map((file, index) => {
            return <div key={`fanPage${index}`} className='fanPage'>
                <label>連結{index+1}：</label>
                <input value={file} style={{width: '100%', fontSize: '20px'}} onChange={e=>{
                    let tmp = props.fanPages.slice();
                    tmp[index] = e.target.value;
                    props.setFanPages(tmp);
                }}/>
            </div>
        })}
        <input type='submit' value='送出' onClick={()=>{handleSubmitFanPages()}}/>
    </div>
}