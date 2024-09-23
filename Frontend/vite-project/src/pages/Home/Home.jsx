import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Note from '../../components/cards/Note'
import { MdAdd } from 'react-icons/md'
// import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { Container, Button } from 'react-bootstrap'
import AddNotes from './AddNotes'
import Modal from 'react-modal'


const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({isShown: false, type: "add", data: null})

  return (
    <>
      <Navbar/>

      <Container className='mx-auto'>
        <Note 
          content="Gym from 8pm to 10pm on 20 september 2024 at Fitness Club" 
          onEdit={() => {}} onDelete={() => {}}/>
      </Container>

      <Button onClick={() => {setOpenAddEditModal({isShown: true, type: "add", data: null})}}>
        <MdAdd/>
      </Button>

      <Modal
        isOpen={openAddEditModal.isShown} onRequestClose={() => {}}
        style={{overlay: {backgroundColor: "rgba(0,0,0,0.2)"},}}
        contentLabel="" className="">

        <AddNotes type={openAddEditModal.type} noteData={openAddEditModal.data} onClose={() => {setOpenAddEditModal({isShown:false, type: "add", data: null})}}/>
      </Modal>


    </>
  )
}

export default Home