import React from 'react'
import { MdClose } from 'react-icons/md'

const MyForm = ({ handelSubmit, handelOnChange, handelClose, rest, heading }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handelSubmit}>
        <h2>{heading}</h2>
        <div className="close-btn" ><MdClose onClick={handelClose} /></div>
        <label htmlFor="name" >Name :</label>
        <input onChange={handelOnChange} type="text" placeholder='Enter Name' name="name" id="name" value={rest.name} />
        <label htmlFor="email" >Email :</label>
        <input onChange={handelOnChange} type="email" placeholder='Enter Email' name="email" id="email" value={rest.email} />
        <label htmlFor="mobile" >Mobile :</label>
        <input onChange={handelOnChange} type="tel" placeholder='Enter Mobile No.' name="mobile" id="mobile" value={rest.mobile} />
        <button type='submit' className='btn'>{heading === "Update User" ? "Update" : "Add"}</button>
      </form>
    </div>
  )
}

export default MyForm