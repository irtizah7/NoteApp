import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'

const AddNotes = ({ type,onClose }) => {
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)

    const addNewNote = async () => {};
    const editNote = async () => {};

    const addNotesHandler = () => {
      if(!content){
        setError("Please enter your notes")
        return
      }
      setError("")

      if (type === "edit") {
        editNote();
      } else {
        addNewNote();
      }
    }

  return (
    <>
        <div className='relative'>
            <button className='btn btn-primary' onClick={onClose}><MdClose /></button>

            <div className='d-flex mt-4 gap-2'>
                <label className='input-label' htmlFor="Content"></label>
                <textarea type="text" className="bg-light p-2" placeholder='Write your Notes' rows={10} value={content} onChange={({ target }) => setContent(target.value)}/>
            </div>

            {error && <p className='text-danger'>{error}</p>}

            <Button className='btn-success mt-5 p-3' onClick={addNotesHandler}>Add</Button>
        </div>
    </>
  )
}

export default AddNotes