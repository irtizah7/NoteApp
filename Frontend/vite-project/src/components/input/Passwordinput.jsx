import React, { useState } from 'react'
import './Passwordinput.css'
import { Form, InputGroup } from 'react-bootstrap';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Passwordinput = ({value, onChange, placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false)

    const showPasswordToggle = () => {
        setIsShowPassword(!isShowPassword)
    }
    
  return (
    <div>

      <InputGroup className="mb-3 mt-4">
        <Form.Control placeholder="Enter Your Password" value={value} onChange={onChange} type={isShowPassword ? "text" : "password"} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <InputGroup.Text id="basic-addon2">
        {isShowPassword ? <IoMdEye size={20} className='iconCSS ' onClick={() => showPasswordToggle() }/>
                        : <IoMdEyeOff size={20} className='iconCSS' onClick={() => showPasswordToggle() }/>}
        </InputGroup.Text>
      </InputGroup>
        
    </div>
  )
}

export default Passwordinput