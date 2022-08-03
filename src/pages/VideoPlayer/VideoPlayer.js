import './VideoPlayer.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../Contexts/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaRegShareSquare } from 'react-icons/fa'
import { AiOutlineClockCircle, AiFillClockCircle, AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { BsPlusSquare } from 'react-icons/bs'

export const VideoPlayer = () => {
  const { app, dispatch } = useApp()
  const [playlists, setPlaylists] = useState(null)
  const [newPlaylist, setNewPlaylist] = useState(null)
  const [loading, setLoading] = useState(null)
  const [videoToPlay, setVideoToPlay] = useState(null)
  const { videoId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
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
  }, [videoId])

  console.log(app.user?.likedVideos.includes(videoToPlay))
  console.log(app.user?.watchLater.includes(videoToPlay))
  console.log(videoToPlay)

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
    <div className="videoPlayerAndComments">
      {loading && <h3>{loading}</h3>}
      <div className="videoPlayer">
        {videoToPlay && (
          <iframe
            className="videoArea"
            src={videoToPlay?.link}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        )}
        <h3>{videoToPlay?.name}</h3>
        <div className="activityBtns">
          <button className="activityBtn btnBgNone" onClick={likeVideo}>
            {app.user?.likedVideos.includes(videoToPlay) ? (
              <AiFillLike />
            ) : (
              <AiOutlineLike />
            )}
          </button>
          <button className="activityBtn btnBgNone" onClick={saveToWatchLater}>
            {app.user?.watchLater.includes(videoToPlay) ? (
              <AiFillClockCircle />
            ) : (
              <AiOutlineClockCircle />
            )}
          </button>
          <button className="activityBtn btnBgNone" onClick={callPlaylists}>
            <MdPlaylistAdd />
          </button>
          <button className="activityBtn btnBgNone">
            <FaRegShareSquare />
          </button>
        </div>
        {playlists && (
          <div className="playlistSection">
            <div className="inputDiv">
              <input
                className="input"
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
                  <li className="listStyleNone cursorPointer">
                    <input
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
      </div>
    </div>
  )
}
