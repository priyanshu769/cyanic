import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { VideoCard } from '../../Components'
import { useApp } from '../../Contexts/AppContext'
import { useToast } from '../../Contexts/ToastContext'

export const LikedVideos = () => {
  const { app, dispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  const removeFromLikes = async (videoId) => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updating Likes" } })
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/user/likeVideo`,
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
            toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updated Likes" } })
            return dispatch({ type: 'SET_USER', payload: data.user })
          }
        }
      } catch (error) {
        console.log(error, "Unable to Delete Video from Likes")
      }
    } else {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "You need to Login" } })
      navigate('/login')
    }
  }

  return (
    <div>
      <div className="videosDisplay">
        {app.user?.likedVideos.length === 0
          ? "You haven't liked any video yet."
          : app.user?.likedVideos.map((video) => {
            return (
              <Link className="link" to={`/play/${video._id}`}>
                <VideoCard
                  thumbnail={video.thumbnail}
                  name={video.name}
                  category={video.category}
                  deleteBtnShow={true}
                  linkTo='/likes'
                  deleteBtnClick={() => removeFromLikes(video._id)}
                />
              </Link>
            )
          })}
      </div>
    </div>
  )
}
