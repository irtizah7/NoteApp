import React from 'react'
import './ProfileInfo.css'

const ProfileInfo = ({logoutHandler}) => {

  return (
    <>
        <div className='profileareaCSS'>
          <h4>Finn</h4>
          <button className='logoutbtn' onChange={logoutHandler}>Logout</button>        
        </div>
    </>
  )
}

export default ProfileInfo