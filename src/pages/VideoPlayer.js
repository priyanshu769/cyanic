import './VideoPlayer.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { useApp } from '../contexts/AppContext'
import axios from 'axios'

export const VideoPlayer = () => {
  //   const { app, dispatch } = useApp()
  //   const [showPlaylists, setShowPlaylists] = useState(false)
  //   const [showNotes, setShowNotes] = useState(false)
  //   const [newPlaylist, setNewPlaylist] = useState(null)
  const [loading, setLoading] = useState(null)
  //   const [commentInput, setCommentInput] = useState(null)
  const [videoToPlay, setVideoToPlay] = useState(null)
  const { videoId } = useParams()

  useEffect(() => {
    ;(async () => {
      setLoading('Loading...')
      try {
        const { data } = await axios.get(
          `https://cyanic-api.herokuapp.com/videos/${videoId}`,
        )
        console.log(data)
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

  return (
    <div className="videoPlayerAndComments">
      {loading && <h3>{loading}</h3>}
      <div className="videoPlayer">
        <iframe
          className="videoArea"
          src={videoToPlay?.link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h3>{videoToPlay?.name}</h3>
        {/*<button
          className="btnBgNone"
          style={
            app.likedVideos.includes(videoToPlay) ? { color: 'skyblue' } : {}
          }
          onClick={() => dispatch({ TYPE: 'likeVideo', PAYLOAD: videoToPlay })}
        >
          {app.likedVideos.includes(videoToPlay) ? 'Liked' : 'Like'}
        </button>
        <button
          className="btnBgNone"
          onClick={() => {
            setShowPlaylists((value) => !value)
            setShowNotes(false)
          }}
        >
          Add to Playlist
        </button>
        <button
          className="btnBgNone"
          onClick={() => {
            setShowNotes((value) => !value)
            setShowPlaylists(false)
          }}
        >
          Notes
        </button>
        <div
          className="playlistSection"
          style={showPlaylists ? { display: '' } : { display: 'none' }}
        >
          <div className="inputDiv">
            <input
              className="input"
              value={newPlaylist}
              onChange={(e) => setNewPlaylist(e.target.value)}
            />
            <button
              className="btnBgNone"
              onClick={() => {
                if (newPlaylist === '') {
                  return ''
                } else {
                  dispatch({ TYPE: 'addNewPlaylist', PAYLOAD: newPlaylist })
                  setNewPlaylist('')
                }
              }}
            >
              +
            </button>
          </div>
          {app.playlists.length === 0
            ? "You don't have any playlist, create one."
            : app.playlists.map((list) => (
                <li
                  className="listStyleNone cursorPointer"
                  onClick={() => {
                    if (list.videos.includes(videoToPlay)) {
                      return ''
                    } else {
                      dispatch({
                        TYPE: 'addToPlaylist',
                        PLAYLIST: list,
                        PAYLOAD: videoToPlay,
                      })
                    }
                  }}
                >
                  {list.name}
                </li>
              ))}
                </div>*/}
      </div>
      {/*<div className="commentSection" style={showNotes ? { display: "" } : { display: "none" }}>
                <ul className="comments">
                    <li className="comment">This is a long puppet comment to check density. This is a puppet comment to check density.</li>
                    <li className="comment">This is a puppet comment to check density.</li>
                    <li className="comment">This is a puppet comment to check density.</li>
                    <li className="comment">This is a puppet comment to check density.</li>
                    <li className="comment">This is a puppet comment to check density.</li>
                </ul>
                <input className="commentInput" onChange={(e) => setCommentInput(e.target.value)} placeholder="Take note" />
                </div>*/}
    </div>
  )
}
