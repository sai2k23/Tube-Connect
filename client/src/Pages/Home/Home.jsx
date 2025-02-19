import React from 'react'
import "./Home.css"
import Showvideogrid from '../../Components/Showvideogrid/Showvideogrid.jsx'
import { useSelector } from 'react-redux'
import Leftsidebar from '../../Components/Leftsidebar/Leftsidebar.jsx'
const Home = () => {
  const vids=useSelector(state=>state.videoreducer)?.data?.filter(q=>q).reverse();
   // const vids=[
  //   {
  //     _id:1,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 1",
  //     uploader:"abc",
  //     description:"description of video 1"
  //   },
  //   {
  //     _id:1,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 1",
  //     uploader:"abc",
  //     description:"description of video 1"
  //   },
  //   {
  //     _id:2,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 2",
  //     uploader:"abc",
  //     description:"description of video 2"
  //   },
  //   {
  //     _id:3,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 3",
  //     uploader:"abc",
  //     description:"description of video 3"
  //   },
  //   {
  //     _id:4,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 4",
  //     uploader:"abc",
  //     description:"description of video 4"
  //   },
  // ]

  const navlist = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy"
  ];
  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <Showvideogrid vid={vids} />
      </div>
    </div>
  )
}

export default Home
