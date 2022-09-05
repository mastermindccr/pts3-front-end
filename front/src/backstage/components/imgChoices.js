import React from 'react';
import './imgChoices.css'

export default function ImgChoices(props) {
    function checkValidTime() {
        const d = new Date();
        let invalid = [];
        for(let i in props.imgStatus){
            if(props.imgStatus[i].show===1 && new Date(props.imgStatus[i].end)<=d){
               invalid.push(props.imgStatus[i].name);
            }
        }
        if(invalid.length){
            alert(`請檢查下列的圖片時間是否正確：${'\n'+invalid.join('\n')}`)
            return false;
        }
        return true;
    }

    async function handleClick() {
        if(!checkValidTime()) return;
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(props.imgStatus)
        })).json();
        try{
            if(response==='good'){
                alert('送出成功!');
                let response = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
                response = response.map((file, index) => {
                    return {...file, color: index};
                })
                props.setImgStatus(response);
            }
            else{
                alert('時間格式錯誤!');
            }
        }
        catch(e){
            alert('伺服器錯誤!');
        }

        const imgStatus = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
        props.setImgStatus(imgStatus);
    }

    function showImageChoices(action) {
        return <div>
            {props.imgStatus.map((file, index) => {
                let disabled = action==='render'?(file.show===2?true:false):(file.show===1?true:false);
                let checked = action==='render'?(file.show===1?true:false):(file.show===2?true:false);
                return(
                    <div className="file" key={file.uuid} style={{
                        backgroundColor: `rgb(${(file.color*83)%255},${(120+(file.color*59))%255},${255-(file.color*47)%255}, 0.4)`,
                        minHeight: '140px'}}>
                        <input type='checkbox' uuid={file.uuid} checked={checked} disabled={disabled} onChange={(e)=>{
                            const next = props.imgStatus.map(img => {
                                if(e.target.getAttribute('uuid')===img.uuid){
                                    if(action==='render')
                                        return {...img, show: (file.show===0?1:0)};
                                    else
                                        return {...img, show: (file.show===0?2:0)};
                                }    
                                return img;
                            })
                            props.setImgStatus(next);
                        }}/>
                        <label>{file.name}</label>
                        {action==='render'?<div>
                            <div>
                                <label className='tag'>開始時間：</label>
                                <input type='datetime-local' value={file.start} uuid={file.uuid} onChange={(e)=>{
                                    const next = props.imgStatus.map(img => {
                                        if(e.target.getAttribute('uuid')===img.uuid){
                                            return {...img, start: e.target.value};
                                        }   
                                        return img;
                                    })
                                    props.setImgStatus(next);
                                }}/>
                            </div>
                            <div>
                                <label className='tag'>結束時間：</label>
                                <input type='datetime-local' value={file.end} uuid={file.uuid} onChange={(e)=>{
                                    const next = props.imgStatus.map(img => {
                                        if(e.target.getAttribute('uuid')===img.uuid){
                                            return {...img, end: e.target.value};
                                        }   
                                        return img;
                                    })
                                    props.setImgStatus(next);
                                }}/>
                            </div>
                            <div>
                                <label className='tag'>順序：</label>
                                <input type='number' value={file.order} uuid={file.uuid} onChange={(e)=>{
                                    const next = props.imgStatus.map(img => {
                                        if(e.target.getAttribute('uuid')===img.uuid){
                                            return {...img, order: e.target.value};
                                        }   
                                        return img;
                                    })
                                    props.setImgStatus(next);
                                }}
                                onKeyDown={(e)=>{
                                    if(e.key==='Enter'){
                                        const idx = e.target.value>props.imgStatus.length-1?props.imgStatus.length-1:(e.target.value<1)?0:e.target.value-1;
                                        let next = props.imgStatus.slice();
                                        next.splice(index, 1);
                                        next.splice(idx, 0, file);
                                        next = next.map((value, key)=>{
                                            return {...value, order: key+1};
                                        })
                                        props.setImgStatus(next);
                                    }
                                }}/>
                            </div>
                        </div>:null}
                    </div> 
                )
            })}
        </div>
    }

    return (
        <div className='block'>
            <div className='renderAndDelete'>
                <div className="chooseImg">
                    {props.imgStatus.length?<p>輸出哪些圖片?</p>:<div/>}
                    {showImageChoices('render')}
                </div>
                <div className="chooseImg">
                    {props.imgStatus.length?<p>刪除哪些圖片?</p>:<div/>}
                    {showImageChoices('delete')}
                </div>
            </div>
            {props.imgStatus.length?<input style={{marginTop: '10px', marginBottom: '10px'}} type='submit' value='提交' onClick={()=>handleClick()}/>:null}
        </div>
    )
}