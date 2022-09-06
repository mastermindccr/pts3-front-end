import '../css/fanPages.css'


export default function fanPages(props) {
    return <div class="container">
        <div class="container">
            <div class="row" style={{display:'flex', flexWrap: 'wrap', padding:'3px'}}>
                {props.fanPages.map((page, index) => {
                    return <div class="col-md-4 col-sm-4" style={{marginBottom: '50px'}}>
                        <strong class="tittle"></strong>
                        <div class="buttona">
                            <div className="fb-page" href={page} tabs="timeline" width="500" height="500" key={index}></div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}