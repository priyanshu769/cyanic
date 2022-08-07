import './VideoPlayer.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../Contexts/AppContext'
import { useToast } from '../../Contexts/ToastContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClockCircle, AiFillClockCircle, AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { BsPlusSquare } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { Loading } from '../../Components'

export const VideoPlayer = () => {
  const { app, dispatch } = useApp()
  const { toastDispatch } = useToast()
  const [playlists, setPlaylists] = useState(null)
  const [newPlaylist, setNewPlaylist] = useState(null)
  const [checkVideo, setCheckVideo] = useState({ videoLiked: false, videoInWatchLater: false })
  const [videoToPlay, setVideoToPlay] = useState(null)
  const { videoId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ; (async () => {
      try {
        const { data } = await axios.get(
          `https://cyanic-api.herokuapp.com/videos/${videoId}`,
        )
        if (data.success) {
          setVideoToPlay(data.video)
        }
      } catch (error) {
        console.log(error, 'Unable to load video.')
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

  const likeVideo = async () => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updating Likes" } })
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
            toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updated Likes" } })
            return dispatch({ type: 'SET_USER', payload: data.user })
          } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updated Likes but unable to load" } })
        } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Unable to Update Likes" } })
      } catch (error) {
        console.log(error, 'Unable to like video.')
      }
    } else {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "You need to Login" } })
      navigate('/login')
    }
  }

  const saveToWatchLater = async () => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updating Watch Later" } })
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
            toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updated Watch Later" } })
            return dispatch({ type: 'SET_USER', payload: data.user })
          } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updated Watch Later but unable to load" } })
        } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Unable to Update Watch Later" } })
      } catch (error) {
        console.log(error, 'Unable to add video to watch later')
      }
    } else {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "You need to Login" } })
      navigate('/login')
    }
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
        console.log(error, 'Unable to call playlists')
      }
    } else {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Login First!" } })
      navigate('/login')
    }
  }

  const saveToPlaylist = async (playlistId) => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updating Playlist" } })
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/playlists/${playlistId}/addRemoveVideo/`,
          { videoId: videoToPlay._id },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          callPlaylists()
          toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Playlist Updated" } })
        } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Unable to Update Playlist" } })
      } catch (error) {
        console.log(error, 'Unable to add video to playlist')
      }
    }
  }

  const createNewPlaylist = async () => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Creating New Playlist" } })
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/playlists`,
          { playlistName: newPlaylist },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          setPlaylists([...playlists, data.playlistAdded])
          toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "New Playlist Created" } })
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
            {checkVideo.videoLiked ? <AiFillLike size={30} /> : <AiOutlineLike size={30} />}
          </button>
          <button className="activityBtn btnBgNone" onClick={saveToWatchLater}>
            {checkVideo.videoInWatchLater ? <AiFillClockCircle size={30} /> : <AiOutlineClockCircle size={30} />}
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
      </div> : <Loading />}

    </div>
  )
}