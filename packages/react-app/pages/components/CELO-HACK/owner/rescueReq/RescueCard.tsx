import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import RescueInfo from './RescueInfo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function RescueCard(props: any) {

  const [rescueData, setRescueData] = useState({})
  const [click, setClick] = useState(false)

  let url = `${props.data.rescueInfo}`

  const fetchData = () => {
    setClick(prev => !prev)
    fetch(url)
      .then(response => response.json())
      .then((jsonData) => {
        setRescueData(jsonData)
        console.log(props.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const styles = {
    imgbg: `w-72 h-56 flex justify-center items-center rounded-xl bg-sky-600 mb-2`,
    img: `w-8/12 h-4/6 rounded-xl bg-white`
  }


  return (
    <div className="w-full mt-3 flex flex-col justify-center items-center">
      <div className={styles.imgbg}>

        {
          props.data.rescueClosed
          ?
          <img src="/images2/tick.png" className={styles.img} alt="/"/>
          :
          <img src="/images2/rescue.png" className={styles.img} alt="/"/>
        }

        {/* <img src="/images2/rescue.png" className={styles.img} alt="/"/> */}
      </div>
      <div className="w-full flex justify-around items-center">
        <span className='text-sm font-bold text-gray-500'>Rescue Id: {props.data.rescueId}</span>
        <Button variant='contained'>
          <span className='text-sm capitalize' onClick={fetchData}>{!click ? "see details" : "hide details"}</span>
        </Button>
      </div>
      {
        click ?
        <div className="w-10/12 ease-in duration-500 min-h-96 flex flex-col justify-around items-center">
          <RescueInfo data={rescueData} value={props.data} />
        </div>
        :
        <div></div>
      }
      
    </div>
  )
}

export default RescueCard