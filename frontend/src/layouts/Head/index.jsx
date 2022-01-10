import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import $ from "jquery";
import "jquery-syotimer";

import { connectorLocalStorageKey, injectedConnector, walletconnect} from "../../utils/connectors"

// import './script.js'
import './navbar.css'
import {NavbarLogo} from '../../utils/allImgs'
import {Addshrink} from '../../utils'
import Preloader from '../../components/Preloader'
import UserIcon from "../../assets/img/icons/user.png";
import data from '../../data/data-layouts/data-Head.json'

function Head(props){
    const { Title, connectAccount } = props;
    const {account, deactivate} = useWeb3React();
    const [userProfile, setUserProfile] = useState(undefined)
    useEffect(() => {        
        if (!userProfile && account){
          getUser()
        }        
    }, [account])

    function getUser(){
        axios.get(`/api/user/${account ? account : ""}`)
        .then(res => {
          setUserProfile(res.data.user)                
        })
    }

    function signOut() {        
        deactivate(injectedConnector)  
        deactivate(walletconnect)     
        window.localStorage.setItem(connectorLocalStorageKey, "");
    }

    function connectWallet(){
        if (!account) {
            connectAccount();
        } else {
            signOut();
        }
    }  

    useEffect(() => {
        Addshrink()
    },[window.pageYOffset])

  return(
    <>
        <Preloader Title={Title} />
        <nav className="navbar navbar-expand-lg navbar-white fixed-top dark-background" id="banner">
            <div className="container">
                <NavLink className="navbar-brand" to="/"><span><img src={NavbarLogo} alt="logo" /></span></NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">Explore</NavLink>
                            <div className="dropdown-menu">
                                {data[0].explore && data[0].explore.map((item , i) => (
                                    <NavLink key={i} className="dropdown-item" to={item.path}>{item.title}</NavLink>    
                                ))}
                            </div>
                        </li>
                        <li className="nav-item" style={{display: account? '':'none'}}>
                            <NavLink className="nav-link" to="/activity">Activity</NavLink>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">More</NavLink>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to="/how-it-work">How it works</NavLink> 
                                <a href={"https://zer0-53733.medium.com/"} target="_blank" className="dropdown-item">Blog</a>
                                <NavLink className="dropdown-item" to="/contact">Suggest feature</NavLink>
                                <a href={"https://docs.thexdao.org/"} target="_blank" className="dropdown-item">Docs</a>
                                <hr style={{marginBottom:'0.3rem'}}></hr>

                                <ul className="social-links">
                                    <li><a href="https://twitter.com/THEXDAO" target="_blank"><span className="fa fa-twitter"></span></a></li>
                                    <li><a href="https://t.me/thexfoundationdiscussion" target="_blank"><span className="fa fa-telegram"></span></a></li>								
                                    <li><a href="https://www.youtube.com/channel/UCtoxfcsfAF5RJEMOUr1cdyw" target="_blank"><span className="fa fa-youtube-play"></span></a></li>                   		
                                    <li><a href="https://github.com/X0-Foundation/Cyberswap" target="_blank"><span className="fa fa-github"></span></a></li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a href={"https://swap.thexdao.com/#/swap?outputCurrency=0x68F7880F7af43a81bEf25E2aE83802Eb6c2DdBFD"} target="_blank" className="nav-link">Buy HTZ</a>                           
                        </li>

                        <li className="nav-item" style={{display: account? '':'none'}}>
                            <NavLink className="nav-link" to="/createitem">Create</NavLink>
                        </li>                       

                        <div className="nav-user-img-container" style={{display: account? '':'none'}}>
                            <NavLink to={`/profile/${account}`}>
                                <img src={userProfile && userProfile.profilePic ? userProfile.profilePic : UserIcon } alt="" />
                            </NavLink>
                        </div>

                        <li className="lh-55px" onClick={() => { connectWallet()}}>
                            <div className="btn login-btn ml-15" >{account? 'Disconnect' : 'Connect Wallet'}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Head