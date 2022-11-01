import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import CELO from '@celo-composer/hardhat/artifacts/contracts/CELO_HACK.sol/CELO_HACK.json';
import DonationCard from './DonationCard';
import Link from 'next/link';

function MyDonations() {

  const deployAddress = "0x39C4E511cCC5a823dB73bed64dd788274CECF687"

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

      const allDonation = await contract.getAllMyDonationDetails()

      const items: any = await Promise.all(allDonation.map(async (i: any) => {
        let item = {
          donationId: i.donationId.toString(),
          donationInfo: i.donationInfo,
          donarAddress: i.donarAddress,
          donationPickup: i.donationPickup,
          NFTreceived: i.NFTreceived,
          donationReceived: i.donationReceived,
          donationClosed: i.donationClosed
        }
        return item;
      }))
      setData(items)

      console.log(items)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `w-screen max-w-screen-sm min-h-screen flex flex-col justify-center items-center`,
  }


  return (
    <div className="flex justify-center items-center">
      <div className={styles.page}>
        <Link href="/components/CELO-HACK/donate/MyNFTs">
          <Button variant='contained' size='small'>
            <span className='text-sm capitalize'>Show My NFT's</span>
          </Button>
        </Link>
        {data.map((value, index) => {
            return <DonationCard data={value} key={index} />
        })}
      </div>
    </div>
  )
}

export default MyDonations