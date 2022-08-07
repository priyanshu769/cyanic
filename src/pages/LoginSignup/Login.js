import './LoginSignup.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../../Contexts/AppContext'
import { useToast } from '../../Contexts/ToastContext'
import { LoadingSmall } from '../../Components'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)
  const { app, dispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  const loginHandler = async () => {
    if (!app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Logging In" } })
      setLoader(true)
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
          toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Logged In" } })
          navigate('/')
        }
      } catch (error) {
        setLoader(false)
        console.log(error)
      }
    }
  }

  const guestLogIn = () => {
    setEmail('prynsu@yahoo.com')
    setPassword('priyanshu')
  }

  return (
    <div className="loginSignupBox">
      <h2>Log In</h2>
      <input
        className="inputBox"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        placeholder="Password"
        type={showPass ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        onChange={() => setShowPass(showPass => !showPass)}
        checked={showPass}
        type='checkbox' />
      <label>Show Password</label>
      <button className="loginSignupBtn" onClick={() => loginHandler()}>
        {loader ? <LoadingSmall /> : "Login"}
      </button>
      <button className="loginSignupBtn" onClick={() => guestLogIn()}>
        Guest Credentials
      </button>
      <p>
        Not a user, <Link className='loginSignupLink' to="/signup">Signup</Link>.
      </p>
    </div>
  )
}
