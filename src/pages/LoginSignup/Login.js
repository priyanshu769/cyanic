import './LoginSignup.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../../Contexts/AppContext'

export const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { app, dispatch } = useApp()
  const navigate = useNavigate()

  const loginHandler = async () => {
    if (!app.loggedInToken) {
      setLoading(true)
      try {
        const { data } = await axios.post(
          'https://cyanic-api.herokuapp.com/login',
          {
            email: email,
            password: password,
          },
        )
        if (data.success) {
          dispatch({ type: 'SET_LOGGED_IN_TOKEN', payload: data.token })
          dispatch({ type: 'SET_USER', payload: data.user })
          localStorage.setItem(
            'loggedInCyanic',
            JSON.stringify({ token: data.token }),
          )
          navigate('/')
        }
        setError(data.message)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
  }
  return (
    <div className="loginArea">
      {app.loggedInToken ? (
        <div>
          <h3>You are already logged in!</h3>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            className="input"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="btn btnPrimary"
            onClick={loginHandler}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </div>
      )}
      <p>
        <small>Not a user? </small>
        <Link to="/signup">
          <bold>Signup</bold>
        </Link>
      </p>
      {error && <h3>Some error occured, try again.</h3>}
    </div>
  )
}
