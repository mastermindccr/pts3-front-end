import icon1 from '../images/icon1.png';
import icon2 from '../images/icon2.png';
import logo from '../images/logo.png';
import '../css/bootstrap.css';
import '../css/header.css';

export default function Header() {
    return(
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <a href='/'>
                    <img src={logo} align="left" height="50" style={{paddingBottom: '5px', paddingTop: '5px', marginTop: 0}} alt=""/>
                </a>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="true">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item dropdown" >
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href role="button" aria-expanded="false" style={{color: 'white'}}>
                                <img src={icon1} alt="" style={{marginBottom: '5px', marginRight: '4px'}}/>
                                    關於公視3台
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="about.html">如何收看</a></li>
                                <li><a className="dropdown-item" href="QA.html">QA</a></li>
                                <li>
                                    <a className="dropdown-item" href="table.html">全台有線系統必載<br/>
                                    公視3台頻位表
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="page-scroll" href="http://web.pts.org.tw/php/programX/main.php?XCHANNEL=HD" style={{color: 'white'}}>
                                <img src={icon2} alt="" style={{marginBottom: '5px', marginRight: '4px'}}/>
                                節目表
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}