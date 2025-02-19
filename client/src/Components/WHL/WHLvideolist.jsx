import React from 'react'
import Showvideolist from '../Showvideolist/Showvideolist'
const WHLvideolist = ({page,currentuser,videolist}) => {
    return (
        <>
            {currentuser ? (
                <>
                    {
                        videolist?.data.filter(q => q?.viewer === currentuser).reverse().map(m => {
                            console.log(m)
                            return (
                                <>
                                    <Showvideolist videoid={m?.videoid} key={m?._id} />
                                </>
                            )
                        })
                    }

                </>
            ) : (
                <>

                    <h2 style={{ color: "#FFD700" }}>Plz login to Watch your {page}</h2>
                </>
            )}
        </>

    )
}

export default WHLvideolist
