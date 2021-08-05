import './Styles/Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../contexts/AppContext'

export const Signup = () => {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { app, dispatch } = useApp()
  const navigate = useNavigate()

  const signupHandler = async () => {
    if (!app.loggedInToken) {
      console.log('triggered signup')
      setLoading(true)
      try {
        const { data } = await axios.post(
          'https://cyanic-api.herokuapp.com/signup',
          {
            name: name,
            email: email,
            password: password,
          },
        )
        console.log(data)
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
      } catch (error) {
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
          <h2>Signup</h2>
          <input
            className="input"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="input"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="input"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn btnPrimary" onClick={() => signupHandler()}>
            {loading ? 'Signing Up...' : 'Signup'}
          </button>
        </div>
      )}
      <p>
        <small>Already a user? </small>
        <Link to="/login">
          <bold>Login</bold>
        </Link>
      </p>
      {error && <h3>Some error occured, try again.</h3>}
    </div>
  )
}
