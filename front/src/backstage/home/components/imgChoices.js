import React from 'react';
import './imgChoices.css'

export default function ImgChoices(props) {
    async function handleClick(action) {
        const sendData = action==='render'?props.imgRender:props.imgDelete;
        const response = await (await fetch(`${process.env.REACT_APP_backend_server}/${action}Imgs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(sendData)
        })).json();
        if(response==='good'){
            alert(`${action} complete!`);
        }
        else{
            alert('invalid timestamp!')
            return;
        }

        const response2 = await (await fetch(`${process.env.REACT_APP_backend_server}/getAllImgsStatus`)).json();
        props.setImgRender(response2);
        const del = response2.map(file => {
            return {...file, show: false};
        })
        props.setImgDelete(del);
        props.setFetchedState(response2);
    }

    function showImageChoice(action) {
        const obj = action==='render'?props.imgRender:props.imgDelete;
        const set_obj = action==='render'?props.setImgRender:props.setImgDelete;
        return <div>
            {obj.map((file, index) => {
                let disabled = action==='render'?false:props.fetchedState[index].show;

                return(
                    <div className="file" key={file.name}>
                        <input type='checkbox' filename={file.name} checked={file.show} disabled={disabled} onChange={(e)=>{
                            const next = obj.map(img => {
                                if(e.target.getAttribute('filename')===img.name){
                                    return {...img, show: !img.show};
                                }    
                                return img;
                            })
                            set_obj(next);
                        }}/>
                        <label>{file.name}</label>
                        {action==='render'?<div>
                            <div>
                                <label>start: </label>
                                <input type='datetime-local' value={file.start} filename={file.name} onChange={(e)=>{
                                console.log(e.target.value);
                                const next = obj.map(img => {
                                    if(e.target.getAttribute('filename')===img.name){
                                        return {...img, start: e.target.value};
                                    }   
                                    return img;
                                })
                                set_obj(next);
                            }}/></div>
                            <div>
                                <label>end:</label>
                                <input type='datetime-local' value={file.end} filename={file.name} onChange={(e)=>{
                                const next = obj.map(img => {
                                    if(e.target.getAttribute('filename')===img.name){
                                        return {...img, end: e.target.value};
                                    }   
                                    return img;
                                })
                                set_obj(next);
                            }}/></div>
                        </div>:null}
                    </div>
                )
        })}
        {obj?<input type='submit' value={action} onClick={()=>handleClick(action)}/>:<div/>}
        </div>
    }

    return <div className='renderAndDelete'>
            <div className="chooseImg">
                {props.imgRender.length?<p>render which pictures?</p>:<div/>}
                {showImageChoice('render')}
            </div>
            <div className="chooseImg">
                {props.imgDelete.length?<p>delete which pictures?</p>:<div/>}
                {showImageChoice('delete')}
            </div>
        </div>
}