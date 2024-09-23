import React from 'react'
import './Note.css'
import { Card, Col, Row } from 'react-bootstrap'
import { MdCreate, MdDelete} from 'react-icons/md'

const Note = ({content, onEdit, onDelete}) => {
  return (
    <>
        <Row>
            <Col lg={3}>
                <Card className='noteCSS'>
                    <Card.Body>
                        <Card.Text>{content}</Card.Text>
                        <div className='btnCSS'>
                            <button className='editbtn' onClick={onEdit}><MdCreate color='white' size={20}/></button>
                            <button className='deletebtn' onClick={onDelete}><MdDelete color='white' size={20}/></button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default Note