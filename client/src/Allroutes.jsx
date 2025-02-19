import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search'
import Videopage from './Pages/Videopage/Videopage.jsx'
import Channel from './Pages/Channel/Channel.jsx'
import Library from './Pages/Library/Library.jsx'
import Likedvideo from './Pages/Likedvideo/Likedvideo.jsx'
import Watchhistory from './Pages/Watchhistory/Watchhistory.jsx'
import Watchlater from './Pages/Watchlater/Watchlater.jsx'
import Shorts from './Components/Shorts/Shorts.jsx'
import Chat from './Components/Leftsidebar/Chat.jsx'
import Notification from './Components/Notifications/Notification.js'
import ReceivedVideos from './Components/ReceivedVideos.jsx'
const Allroutes = ({seteditcreatechanelbtn,setvideouploadpage }) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:Searchquery' element={<Search />} />
      <Route path='/videopage/:vid' element={<Videopage />} />
      <Route path='/Library' element={<Library/>}/>
      <Route path='/Likedvideo' element={<Likedvideo/>}/>
      <Route path='/Watchhistory' element={<Watchhistory/>}/>
      <Route path='/Watchlater' element={<Watchlater/>}/>
      <Route path='/Shorts' element={<Shorts/>}/>
      <Route path='/channel/:cid' element={<Channel seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage}/>} />
      <Route path="/chat" element={<Chat />} />
    <Route path='/received-videos' element={<ReceivedVideos />} />
      <Route path="/notifications" element={<Notification />} />
    </Routes>
  )
}

export default Allroutes
