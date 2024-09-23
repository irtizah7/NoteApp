import React from 'react'
import './Navbar.css'
import { Col, Container, Row } from 'react-bootstrap'
import ProfileInfo from './cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate

  const logoutHandler = () => {
    navigate('/login')
  }

  return (
    <>
      <Container fluid className='shadow navbarCSS'>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <Col lg={8}>
              <div className='logo m-0'>
                <h2>Notes</h2>
              </div>
            </Col>
            <Col lg={2}>
              <ProfileInfo logoutHandler={logoutHandler}/>
            </Col>
          </Row>
        </Container>
      </Container>
        

    </>
  )
}

export default Navbar