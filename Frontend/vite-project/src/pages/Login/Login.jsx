import React, { useState } from 'react'
import './Login.css'
import Navbar from '../../components/Navbar'
import { Link } from "react-router-dom"
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import Passwordinput from '../../components/input/Passwordinput'
import { validationEmail } from '../../utils/helper'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const loginHandler = async (e) => {
    e.preventDefault();

    if(!validationEmail(email)){
      setError("Please enter a valid email.")
      return
    }

    if (!password) {
      setError("Please enter your password")
      return
    }

    setError("")
  }

  return (
    <>
      <Navbar/>

      <Container className='d-flex align-items-center justify-content-center mt-5 formCSS'>
          <form style={{width:'20rem'}} onSubmit={loginHandler}>

            <h3 className='headinglogin mb-2'>Login</h3>

            <InputGroup className="mb-3 mt-4">
              <Form.Control  type='email' placeholder='Enter Your Email' aria-label="Default" aria-describedby="inputGroup-sizing-default" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </InputGroup>

            <Passwordinput value={password} onChange={(e) => setPassword(e.target.value)}/>

              {error && <p className='text-danger'>{error}</p>}

            <div className='d-grid gap-2'>
              <Button type='submit' variant="outline-dark" size="md">Login</Button>
            </div>

            <p className='text-center mt-4'>Not registered yet?
              <Link to="/signup" className='text-primary'>Create an Account</Link>
            </p>

          </form>
      </Container>
    </>
  )
}

export default Login