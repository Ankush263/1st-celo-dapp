import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CELO from '@celo-composer/hardhat/artifacts/contracts/CELO_HACK.sol/CELO_HACK.json';
import { Button } from '@mui/material';
import ItemCard from './ItemCard';

function OwnerDashboard() {

  const deployAddress = "0x301eF007bF8c7e3081CC1Ffd7F6A1Cd5b652B5b0"

  const sample = [
    {
      "donationInfo": "https://www.domusweb.it/content/dam/domusweb/en/news/2021/05/13/how-to-mint-your-own-nft-in-5-simple-steps/nft.jpg.foto.rbig.jpg",
    }
  ]

  const[data, setData] = useState(sample)

  const handleClick = async () => {
    try {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(deployAddress, CELO.abi, signer)

      // console.log(await contract.getAllRescueRequest())
      // console.log(await contract.getAllDonationRequest())

      let allDonationReq = await contract.getAllDonationRequest()

      const items: any = await Promise.all(allDonationReq.map(async (i: any) => {
        let item = {
          donationInfo: i.donationInfo
        }
        return item;
      }))

      setData(items)



    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <div>
      {/* <Button variant='contained' onClick={handleClick}>rescue details</Button> */}
      {data.map((value, index) => {
          return <ItemCard data={value} key={index} />
      })}
    </div>
  )
}

export default OwnerDashboard