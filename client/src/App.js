
import './App.css';
import React, { useEffect, useState } from "react";
import Allroutes from "../src/Allroutes"
import Navbar from './Components/Navbar/Navbar.jsx';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Drawerslidebar from '../src/Components/Leftsidebar/Drawerslidebar.jsx'
import Createeditchannel from './Pages/Channel/Createeditchannel.jsx';
import Videoupload from './Pages/Videoupload/Videoupload.jsx';
import { fetchallchannel } from './action/channeluser.js';
import { getallvideo } from './action/video.js';
import { getallcomment } from './action/comment.js';
import { getallhistory } from './action/history.js';
import { getalllikedvideo } from './action/likedvideo.js';
import { getallwatchlater } from './action/watchlater.js';
function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({
    display: "none"
  });

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchallchannel())
    dispatch(getallvideo())
    dispatch(getallcomment())
    dispatch(getallhistory())
    dispatch(getalllikedvideo())
    dispatch(getallwatchlater())
  }, [dispatch])



  const toggledrawer = () => {
    if (toggledrawersidebar.display === "none") {
      settogledrawersidebar({
        display: "flex",
      });
    } else {
      settogledrawersidebar({
        display: "none",
      });
    }
  }
  const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
  const [videouploadpage, setvideouploadpage] = useState(false);
  return (
    <Router>
      {
        videouploadpage && <Videoupload setvideouploadpage={setvideouploadpage} />
      }

      {editcreatechanelbtn && (
        <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />
      )}
      <Navbar seteditcreatechanelbtn={seteditcreatechanelbtn} toggledrawer={toggledrawer} />
      <Drawerslidebar toggledraw={toggledrawer} toggledrawersidebar={toggledrawersidebar} />
      <Allroutes seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage} />
    </Router>
  );
}

export default App;
