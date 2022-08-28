import Button from '@mui/material/Button'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { ethers } from "ethers";
import contractData from "../../hardhat/artifacts/contracts/CustomGreeting.sol/CustomGreeting.json";

function CustomGreeting() {
  const [greet, setGreet] = useState('')
  const [showMsg, setMsg] = useState('')

  const contractAddress = "0x57Af7401091Ce00167d0e99eE29F3416bcB5ac50"
  const abi = contractData.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const contract: any = contractData ? (
    new ethers.Contract(contractAddress, abi, signer) 
  ) : null


  const showGreeting = async () => {
    const msg = await contract.greet()
    setMsg(msg)
    console.log(msg)
  }

  const setGreeting = async () => {
    await contract.setGreeting(greet)
    console.log("set greet")
  }

  return (
    <div className='customgreeting'>
      <div className="greet">
      <Button variant="contained" onClick={showGreeting}>Greet</Button>
      <div id="msg">{showMsg}</div>
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