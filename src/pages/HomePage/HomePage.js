import React, { useEffect, useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import { VideoCard, Loading } from '../../Components'
import axios from 'axios'

export const HomePage = () => {
    const [featuredVideos, setFeaturedVideos] = useState([])

    useEffect(() => {
        ; (async () => {
            try {
                const { data } = await axios.get(
                    'https://cyanic-api.herokuapp.com/videos',
                )
                if (data.success) {
                    const shuffledVideos = data.videos.sort(() => 0.5 - Math.random())
                    setFeaturedVideos(shuffledVideos.slice(0, 8))
                }
            } catch (error) {
              console.log(error)
            }
        })()
            }, [])

    return (
        <div>
            <p className='heroText'>Entertainment on a Tap</p>
            <h2 className='featuredProductsHead'>Featured Videos</h2>
            <div className='faeturedProductsContainer'>
                {featuredVideos.length === 0 && <Loading />}
                {featuredVideos.map(video => {
                    return (<Link className="link" to={`/play/${video._id}`}>
                        <VideoCard
                            thumbnail={video.thumbnail}
                            name={video.name}
                            category={video.category}
                        />
                    </Link>)
                })}
            </div>
        </div>
    )
}