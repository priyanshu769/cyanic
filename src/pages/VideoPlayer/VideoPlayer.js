import './VideoPlayer.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../Contexts/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClockCircle, AiFillClockCircle, AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { BsPlusSquare } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { Loading } from '../../Components'

export const VideoPlayer = () => {
  const { app, dispatch } = useApp()
  const [playlists, setPlaylists] = useState(null)
  const [recommendedVideos, setRecommendedVideos] = useState([])
  const [newPlaylist, setNewPlaylist] = useState(null)
  const [loading, setLoading] = useState(null)
  const [checkVideo, setCheckVideo] = useState({ videoLiked: false, videoInWatchLater: false })
  const [videoToPlay, setVideoToPlay] = useState(null)
  const { videoId } = useParams()
  const navigate = useNavigate()

  console.log(recommendedVideos)
  console.log(loading)

  useEffect(() => {
    ; (async () => {
      setLoading('Loading...')
      try {
        const { data } = await axios.get(
          `https://cyanic-api.herokuapp.com/videos/${videoId}`,
        )
        if (data.success) {
          setVideoToPlay(data.video)
          setLoading(null)
        }
      } catch (error) {
        setLoading('Some error occured!')
        console.log(error)
      }
    })()
  }, [videoId, videoToPlay])

  useEffect(() => {
    if (videoId) {
      const findInLikes = app.user?.likedVideos.find(video => video._id === videoId)
      const findInWatchLater = app.user?.watchLater.find(video => video._id === videoId)
      if (findInLikes && findInWatchLater) {
        setCheckVideo({ videoLiked: true, videoInWatchLater: true })
      } else if (findInLikes && !findInWatchLater) {
        setCheckVideo({ videoLiked: true, videoInWatchLater: false })
      } else if (!findInLikes && findInWatchLater) {
        setCheckVideo({ videoLiked: false, videoInWatchLater: true })
      }
    }
  }, [videoId, app.user?.likedVideos, app.user?.watchLater])

  useEffect(() => {
    ; (async () => {
        try {
            const { data } = await axios.get(
                'https://cyanic-api.herokuapp.com/videos',
            )
            if (data.success) {
                const shuffledVideos = data.videos.sort(() => 0.5 - Math.random())
                setRecommendedVideos(shuffledVideos.slice(0, 5))
            }
        } catch (error) {
          console.log(error)
        }
    })()
        }, [])

  const likeVideo = async () => {
    if (app.loggedInToken) {
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/user/likeVideo`,
          { videoId: videoToPlay._id },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          const { data } = await axios.get(
            'https://cyanic-api.herokuapp.com/user',
            {
              headers: { Authorization: app.loggedInToken },
            },
          )
          if (data.success) {
            return dispatch({ type: 'SET_USER', payload: data.user })
          }
        }
      } catch (error) {
        setLoading('Unable to like video.')
        console.log(error)
      }
    } else return navigate('/login')
  }

  const saveToWatchLater = async () => {
    if (app.loggedInToken) {
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/user/watchLater`,
          { videoId: videoToPlay._id },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          const { data } = await axios.get(
            'https://cyanic-api.herokuapp.com/user',
            {
              headers: { Authorization: app.loggedInToken },
            },
          )
          if (data.success) {
            return dispatch({ type: 'SET_USER', payload: data.user })
          }
        }
      } catch (error) {
        setLoading('Unable to add video to watch later.')
        console.log(error)
      }
    } else return navigate('/login')
  }

  const callPlaylists = async () => {
    if (app.loggedInToken) {
      try {
        const { data } = await axios.get(
          'https://cyanic-api.herokuapp.com/playlists',
          {
            headers: { Authorization: app.loggedInToken },
          },
        )
        if (data.success) {
          setPlaylists(data.playlists)
        }
      } catch (error) {
        setLoading('Some error occured!')
        console.log(error)
      }
    } else return navigate('/login')
  }

  const saveToPlaylist = async (playlistId) => {
    if (app.loggedInToken) {
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/playlists/${playlistId}/addRemoveVideo/`,
          { videoId: videoToPlay._id },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          callPlaylists()
          setLoading('Playlist updated.')
        }
      } catch (error) {
        setLoading('Unable to add video to playlist.')
        console.log(error)
      }
    }
  }

  const createNewPlaylist = async () => {
    if (app.loggedInToken) {
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/playlists`,
          { playlistName: newPlaylist },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          setPlaylists([...playlists, data.playlistAdded])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='videoAndRelated'>
      {videoToPlay ? <div className="videoPlayerAndActivities">
        <div className="videoPlayer">
          {videoToPlay && (
            <ReactPlayer width='888px' height='500px' playing controls url={videoToPlay.link} />
          )}
        </div>
        <p className='videoTitle'>{videoToPlay?.name}</p>
        <div className="activityBtns">
          <button className="activityBtn btnBgNone" onClick={likeVideo}>
            {checkVideo.videoLiked ? <AiFillLike size={30} color='#55E9BC' /> : <AiOutlineLike size={30} />}
          </button>
          <button className="activityBtn btnBgNone" onClick={saveToWatchLater}>
            {checkVideo.videoInWatchLater ? <AiFillClockCircle size={30} color='#55E9BC' /> : <AiOutlineClockCircle size={30} />}
          </button>
          <button className="activityBtn btnBgNone" onClick={callPlaylists}>
            <MdPlaylistAdd />
          </button>
        </div>
        {playlists && (
          <div className="playlistSection">
            <div className="inputDiv">
              <input
                className="input"
                placeholder='New Playlist Name'
                value={newPlaylist}
                onChange={(e) => setNewPlaylist(e.target.value)}
              />
              <button
                className="btnBgNone"
                onClick={() => {
                  if (newPlaylist) {
                    createNewPlaylist()
                    setNewPlaylist(null)
                  }
                }}
              >
                <BsPlusSquare />
              </button>
            </div>
            {playlists?.length === 0
              ? "You don't have any playlist, create one."
              : playlists?.map((list) => (
                <li className="playlistCheckboxes">
                  <input
                    className='cursorPointer'
                    checked={list.videos.includes(videoToPlay._id)}
                    onChange={() => saveToPlaylist(list._id)}
                    type="checkbox"
                  />
                  <label>{list.playlistName}</label>
                </li>
              ))}
            <button className="btnBgNone" onClick={() => setPlaylists(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>: <Loading />}
     
    </div>
  )
}