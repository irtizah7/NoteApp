import React, { useState } from 'react'
import './Signup.css'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import Passwordinput from '../../components/input/Passwordinput';
import { validationEmail } from '../../utils/helper';

const Signup = () => {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name")
      return
    }
    
    if (!validationEmail(email)) {
      setError("Please enter your valid email")
      return
    }

    if (!password) {
      setError("Plase enter your password")
      return
    }

    setError("")
  }

  return (
    <>
      <Navbar/>
        <Container className='d-flex align-items-center justify-content-center mt-5 formCSS'>
          <form  style={{width:'20rem'}} onSubmit={signupHandler}>
            <h3 className='headingsignup mb-2'>Signup</h3>

            <InputGroup className="mb-3 mt-4">
              <Form.Control type='text' placeholder='Enter Your Full Name' aria-label="Default" aria-describedby="inputGroup-sizing-default" value={name} onChange={(e) => setName(e.target.value)}/>
            </InputGroup>

            <InputGroup className="mb-3 mt-4">
              <Form.Control className='input-box' type='text' placeholder='Enter Your Email' aria-label="Default" aria-describedby="inputGroup-sizing-default" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </InputGroup>

            <Passwordinput value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className='text-danger'>{error}</p>}

            <div className='d-grid gap-2'>
              <Button type='submit' variant="outline-dark" size="md">Signup</Button>
            </div>

            <p className='text-center mt-4'>Already have a account?
              <Link to="/login" className='text-primary'>Login</Link>
            </p>
            
          </form>
        </Container>
    </>
  )
}

export default Signup