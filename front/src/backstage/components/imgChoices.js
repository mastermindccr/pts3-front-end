import React from 'react';
import './imgChoices.css'

export default function ImgChoices(props) {
    async function handleClick() {
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(props.imgStatus)
        })).json();
        if(response==='good'){
            alert('complete!');
        }
        else{
            alert('invalid timestamp!')
            return;
        }

        const response2 = await (await fetch(`${process.env.REACT_APP_backend_server}/admin/imgs`)).json();
        props.setImgStatus(response2);
    }

    function showImageChoices(action) {
        return <div>
            {props.imgStatus.map((file, index) => {
                let disabled = action==='render'?(file.show===2?true:false):(file.show===1?true:false);
                let checked = action==='render'?(file.show===1?true:false):(file.show===2?true:false);
                return(
                    <div className="file" key={file.uuid}>
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
                                <label>start: </label>
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
                                <label>end:</label>
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
                                <label>order:</label>
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
                    {props.imgStatus.length?<p>render which pictures?</p>:<div/>}
                    {showImageChoices('render')}
                </div>
                <div className="chooseImg">
                    {props.imgStatus.length?<p>delete which pictures?</p>:<div/>}
                    {showImageChoices('delete')}
                </div>
            </div>
            {props.imgStatus.length?<input style={{margin: '0 auto'}} type='submit' value='submit' onClick={()=>handleClick()}/>:null}
        </div>
    )
}