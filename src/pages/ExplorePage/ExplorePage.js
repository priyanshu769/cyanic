import './ExplorePage.css'
import { Link } from 'react-router-dom'
import { VideoCard, Loading } from '../../Components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BiSearchAlt } from 'react-icons/bi'

export const ExplorePage = () => {
  const [loading, setLoading] = useState('')
  const [categories, setCategories] = useState(['All'])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchValue, setSearchValue] = useState('')
  const [videos, setVideos] = useState([])

  const filterByCategory = (category, allVideos) => {
    if (category === 'All') {
      return allVideos
    } else {
      return videos.filter(video => video.category === category)
    }
  }

  console.log(loading)

  useEffect(() => {
    if (videos.length > 0) {
      videos.forEach(video => {
        if (!categories.includes(video.category)) {
          setCategories([...categories, video.category])
        }
      })
    }
  }, [videos, categories])

  useEffect(() => {
    ; (async () => {
      try {
        const { data } = await axios.get(
          'https://cyanic-api.herokuapp.com/videos',
        )
        if (data.success) {
          setLoading('')
          setVideos(data.videos)
        }
      } catch (error) {
        setLoading('Some error occured...')
        console.log(error)
      }
    })()
  }, [])

  const searchVideos = (searchValue, allVideos) => {
    if (searchValue.length > 0) {
      const searchValueLowerCase = searchValue.toLowerCase()
      const serchedVideos = allVideos.filter(video => video.name.toLowerCase().includes(searchValueLowerCase))
      return serchedVideos
    } else return allVideos
  }

  return (
    <div>
      <div className='searchBar'>
        <input className='searchInput' placeholder="Type to Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      <div className='categoriesContainer'>
        {categories.map(category => {
          return (<button className={activeCategory === category ? 'categoryActive categoryBtn' : 'btn btnPrimary categoryBtn'} onClick={() => { setActiveCategory(category) }}>{category}</button>)
        })}
      </div>
      <div className="videosDisplay">
        {videos.length === 0 && <Loading />}
        {videos &&
          filterByCategory(activeCategory, searchVideos(searchValue, videos)).map((video) => {
            return (
              <Link className="link" to={`/play/${video._id}`}>
                <VideoCard
                  thumbnail={video.thumbnail}
                  name={video.name}
                  category={video.category}
                />
              </Link>
            )
          })}
      </div>
    </div>
  )
}