import React from 'react'
import "./Leftsidebar.css"
import shorts from "./shorts.png";
import Chat from '../Leftsidebar/Chat.jsx';
import {AiOutlineHome} from "react-icons/ai"
import { MdOutlineSubscriptions, MdOutlineVideoLibrary} from "react-icons/md"
import { BiChat } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
const Leftsidebar = () => {
  return (
    <div className="container_leftSidebar">
       {/* Home */}
    <NavLink to={'/'} className="icon_sidebar_div">
        <AiOutlineHome size={22} className='icon_sidebar'/>
        <div className="text_sidebar_icon">Home</div>
    </NavLink>

     {/* Chat (Replaced Explore) */}
      <NavLink to={'/Chat'} className="icon_sidebar_div">
        <BiChat size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Chat</div>
      </NavLink>

    <NavLink to={"/Shorts"} className="icon_sidebar_div">
        <img src={shorts} width={22} className="icon_sidebar"/>
        <div className="text_sidebar_icon">Shorts</div>
      </NavLink>
    <div className="icon_sidebar_div">
        <MdOutlineSubscriptions size={22} className='icon_sidebar'/>
        <div className="text_sidebar_icon" style={{fontSize:"12px"}}>Subscription</div>
    </div>
    <NavLink to={'/Library'} className="icon_sidebar_div">
        <MdOutlineVideoLibrary size={22} className='icon_sidebar'/>
        <div className="text_sidebar_icon">Library</div>
    </NavLink>
</div>

  )
}

export default Leftsidebar
