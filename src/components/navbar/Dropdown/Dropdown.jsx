import React, { useContext, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { ContextApp } from './../../ContextAPI'
import './Dropdown.css'
function Dropdown(props) {
  const {dropdown, link} = props
  const {keyword, setKeyword} = useContext(ContextApp)
  const optionsrow = dropdown?.map(option=>{
    return (
    <HashLink to={link.keyword?'/works':option.link} onClick={()=>{link.keyword && setKeyword(option.link)}}>
        <span>
          <span>{option.text}</span>
        </span>
        <i className="fad fa-chevron-right"></i>
    </HashLink>
    )
  })

  return (
    <div className="dropdown">
        {optionsrow}
    </div>
  )
}
export default Dropdown