import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../Contexts/AppContext'
import { VideoCard } from '../../Components'
import axios from 'axios'
import { useToast } from '../../Contexts/ToastContext'

export const WatchLater = () => {
  const { app, dispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  const saveToWatchLater = async (videoId) => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updating Watch Later" } })
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/user/watchLater`,
          { videoId: videoId },
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
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "You need to Login" } })
      navigate('/login')
    }
  }

  return (
    <div>
      <div className="videosDisplay">
        {app.user?.watchLater.length === 0
          ? "You haven't liked any video yet."
          : app.user?.watchLater.map((video) => {
            return (
              <Link className="link" to={`/play/${video._id}`}>
                <VideoCard
                  thumbnail={video.thumbnail}
                  name={video.name}
                  category={video.category}
                  deleteBtnShow={true}
                  linkTo='/watch-later'
                  deleteBtnClick={() => saveToWatchLater(video._id)}
                />
              </Link>
            )
          })}
      </div>
    </div>
  )
}
