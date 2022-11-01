import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import CELO from '@celo-composer/hardhat/artifacts/contracts/CELO_HACK.sol/CELO_HACK.json';
import NFTCard from './NFTCard'

function MyNFTs() {

  const deployAddress = "0x39C4E511cCC5a823dB73bed64dd788274CECF687"

  const sample = [
    {
      "NFTinfo": "https://www.domusweb.it/content/dam/domusweb/en/news/2021/05/13/how-to-mint-your-own-nft-in-5-simple-steps/nft.jpg.foto.rbig.jpg",
    }
  ]

  const [data, setData] = useState(sample)

  const fetch = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(deployAddress, CELO.abi, signer)

      const allNFT = await contract.getAllMyNFT()
      
      const items: any = await Promise.all(allNFT.map(async (i: any) => {
        let item = {
          NFTId: i.NFTId.toString(),
          NFTinfo: i.NFTinfo,
          owner: i.owner,
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
    page: `w-screen min-h-screen flex flex-col justify-start mt-5 items-center max-w-screen-sm`,
  }


  return (
      <div className={styles.page}>
        {data.map((value, index) => {
            return <NFTCard data={value} key={index} />
        })}
      </div>
  )
}

export default MyNFTs