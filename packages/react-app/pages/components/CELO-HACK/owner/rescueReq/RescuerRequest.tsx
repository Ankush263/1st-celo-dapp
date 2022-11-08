import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import CELO from '../../../../../../hardhat/artifacts/contracts/CELO_HACK.sol/CELO_HACK.json';
import RescueCard from './RescueCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';


function RescuerRequest() {

  const deployAddress = "0x18bAe5571f34B1c965d1314c339a79f8F364eD78"

  const sample = [
    {
      "rescueInfo": "https://www.domusweb.it/content/dam/domusweb/en/news/2021/05/13/how-to-mint-your-own-nft-in-5-simple-steps/nft.jpg.foto.rbig.jpg",
    }
  ]

  const [data, setData] = useState(sample)

  const fetch = async () => {
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(deployAddress, CELO.abi, signer)

      const allMyRescueDetails = await contract.getAllRescueRequest()

      const items: any = await Promise.all(allMyRescueDetails.map(async (i: any) => {
        let item = {
          rescueId: i.rescueId.toString(),
          rescueInfo: i.rescueInfo,
          rescuerAddress: i.rescuerAddress,
          rescuePickup: i.rescuePickup,
          rescueRecieved: i.rescueRecieved,
          rescueClosed: i.rescueClosed
        }
        return item;
      }))

      setData(items)

      console.log("allMyRescueDetails: ", items)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `w-screen max-w-screen-sm min-h-screen flex flex-col justify-center items-start`,
  }

  return (
    <div className="flex flex-col justify-center items-center bg-slate-900">
      <div className="w-full flex justify-between">
        <Link href="/components/CELO-HACK/owner/OwnerOption">
          <ArrowBackIcon fontSize='large' color='primary' />
        </Link>

        <Link href="/">
          <HomeIcon fontSize='large' color='primary' />
        </Link>
      </div>
      <div className={styles.page}>
        {data.map((value, index) => {
            return <RescueCard data={value} key={index} />
        })}
      </div>
    </div>
  )
}

export default RescuerRequest