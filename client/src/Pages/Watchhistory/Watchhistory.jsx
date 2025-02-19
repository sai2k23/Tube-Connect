import React from 'react'
import vid from "../../Components/Video/vid.mp4"
import WHL from "../../Components/WHL/WHL"
import { useSelector } from 'react-redux'
const Watchhistory = () => {
  const watchhistoryvideolist=useSelector(s=>s.historyreducer)
      // const watchhistoryvideolist=[
    //     {
    //       _id:1,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 1",
    //       uploader:"abc",
    //       description:"description of video 1"
    //     },
    //     {
    //       _id:1,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 1",
    //       uploader:"abc",
    //       description:"description of video 1"
    //     },
    //     {
    //       _id:2,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 2",
    //       uploader:"abc",
    //       description:"description of video 2"
    //     },
    //     {
    //       _id:3,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 3",
    //       uploader:"abc",
    //       description:"description of video 3"
    //     },
    //     {
    //       _id:4,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 4",
    //       uploader:"abc",
    //       description:"description of video 4"
    //     },
    //   ]

  return (
    <div>
      <WHL page={"History"} videolist={watchhistoryvideolist}/>
    </div>
  )
}

export default Watchhistory
