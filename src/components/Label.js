// 1. import React
import React from 'react'

// 2. Create a function
const Label = ({label}) => {
  console.log(label)
  return (
     <span className="label label-warning">
       {label}
     </span>
  )
}


// 4. export
export default Label
