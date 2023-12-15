import React from 'react'

const page = (props) => {

  const {options} = props
  return (
    <div>
      {
        options.map((opt ,key )=> <p key={key}>{opt.opt} ${opt.price}</p>)
      }
    </div>
  )
}

export default page