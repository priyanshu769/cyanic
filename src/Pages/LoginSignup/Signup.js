import './LoginSignup.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../../Contexts/AppContext'
import { useToast } from '../../Contexts/ToastContext'
import { LoadingSmall } from '../../Components'

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)
  const { app, dispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  const signupHandler = async () => {
    if (!app.loggedInToken) {
      if (name.length > 0) {
        if (email.includes('@')) {
          if (password.length > 6) {
            if (password === rePassword) {
              toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Signing Up" } })
              setLoader(true)
              try {
                const { data } = await axios.post(
                  'https://cyanic-api.herokuapp.com/signup',
                  {
                    name: name,
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
                  setLoader(false)
                } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Error Signing Up" } })
              } catch (error) {
                console.log(error)
              }
            } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Passwords does not match." } })
          } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Password must be more than 6 characters." } })
        } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Enter valid email." } })
      } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Name can't be empty." } })
    }
  }

  const fillDummyData = () => {
    setName("Priyanshu")
    setEmail("prynsu@yahoo.com")
    setPassword("priyanshu")
    setRePassword("priyanshu")
  }

  return (
    <div className="loginSignupBox">
      <h2>Sign Up</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        placeholder="Name"
        type="text"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        placeholder="New Password"
        type={showPass ? 'text' : 'password'}
      />
      <input
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        className="inputBox"
        placeholder="Confirm Password"
        type={showPass ? 'text' : 'password'}
      />
      <br />
      <label className='showPasswordCheckbox'>
        <input
          onChange={() => setShowPass(showPass => !showPass)}
          checked={showPass}
          type='checkbox' />
        Show Password</label>
      <button onClick={() => signupHandler()} className="loginSignupBtn">
        {loader ? <LoadingSmall /> : "Signup"}
      </button>
      <button onClick={() => fillDummyData()} className="loginSignupBtn">
        Fill Dummy Data
      </button>
      <p>
        Already a user, <Link className='loginSignupLink' to="/login">Login</Link>.
      </p>
    </div>
  )
}
