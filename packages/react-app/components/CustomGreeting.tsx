import Button from '@mui/material/Button'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

function CustomGreeting() {
  const [greet, setGreet] = useState('')

  console.log(greet)

  const showGreeting = () => {
    console.log("show greet")
  }

  const setGreeting = () => {
    console.log("set greet")
  }

  return (
    <div className='customgreeting'>
      <div className="greet">
      <Button variant="contained" onClick={showGreeting}>Greet</Button>
      </div>
      <div className="set--greet">
        {/* <input type="text" name="" id="" /> */}
        <TextField label="Enter message" color="secondary" focused value={greet} onChange={(e) => setGreet(e.target.value)}/>
        <Button variant="contained" onClick={setGreeting}>Set Greet</Button>
      </div>
    </div>
  )
}

export default CustomGreeting