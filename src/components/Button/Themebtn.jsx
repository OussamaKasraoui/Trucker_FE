import React from 'react'

function Themebtn(props) {
  const { icon, clickEvent, text } = props

    return (
      <button
       className='button'
       onClick={()=>clickEvent && clickEvent()}
      >
        <span>{text}</span>
        <i className={icon}></i>
      </button>
    )
}
export default Themebtn