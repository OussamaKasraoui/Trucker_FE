import React from 'react'

function Mappedarray(props) {
  const {array} = props
  
  const arrayrow = array?.map(prop=>props.children({
    prop
  }))

  return <>{arrayrow}</>
}
export default Mappedarray