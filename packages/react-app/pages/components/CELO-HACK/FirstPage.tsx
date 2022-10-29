import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

function FirstPage() {

  const [donate, setDonate] = useState(false)
  const [resque, setResque] = useState(false)

  const donateClick = () => {
    setDonate(true)
    setResque(false)
  }

  const resqueClick = () => {
    setResque(true)
    setDonate(false)
  }

  const connectWallet = async () => {
    try {
      const chainid = await window.ethereum.request({ method: 'eth_chainId' })

      if(chainid !== '0xaef3') {

        await window.ethereum.request({   // This gives alert Incorrect network!, switch into Alfajores
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaef3' }],
        })
      }

      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' });
      }

    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen h-screen flex flex-col justify-between items-center max-w-screen-sm bg-[url('/images2/background.png')]`,
    top: `w-full h-2/6 flex justify-center items-center`,
    mid: `w-full h-2/6 flex flex-col justify-between items-center`,
    bottom: `w-full h-1/4 flex flex-col justify-center items-center`,
    logoBox: `w-48 h-42 mt-auto`,
    btn: `w-20 h-20 rounded-full bg-slate-300/[.9] shadow-2xl border-white-900/75`,
    img: `w-28 h-28`,
    bigbtn: `w-full flex justify-center items-center`,
  }

  return (
    <div className="flex justify-center items-center">
      <div className={styles.page}>
        <div className={styles.top}>
          <div className={styles.logoBox}>
            <img src="/images2/fow.png" alt="/" className='w-full h-full mt-auto' />
          </div>
        </div>
        <div className={styles.mid}>
          <div className="flex flex-col justify-start items-center">
            <span className='font-extrabold text-2xl'>Want To Share Food?</span>
            <span className='font-bold text-sm text-gray-400'>choose one</span>
          </div>
          <div className="w-7/12 h-3/6 flex justify-around items-start">
            <div className="flex flex-col justify-center items-center">
              <button className={styles.btn} onClick={donateClick}>
                <img src="/images2/Fundraising.png" alt="/" className='w-full h-full rounded-full' />
              </button>
              <span className='text-xs text-gray-400 font-bold'>Donate</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button className={styles.btn} onClick={resqueClick}>
                <img src="/images2/delivery.png" alt="/" className='w-full h-full rounded-full' />
              </button>
              <span className='text-xs text-gray-400 font-bold'>Rescuer</span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.img}>
            <img src="/images2/confuse.png" className='w-full h-full' alt="/" />
          </div>
          <div className={styles.bigbtn}>
            {
              donate 
              
              ? 

              <Link href='/components/CELO-HACK/DonateDetails'>
                <Button variant='contained' className='w-9/12'>
                  <span className='capitalize' onClick={connectWallet}>Donate some food</span>
                </Button> 
              </Link>
              
              : 

              <Link href='/components/CELO-HACK/RescueDetail'>
                <Button variant='contained' className='w-9/12'>
                  <span className='capitalize' onClick={connectWallet}>Resque?</span>
                </Button>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstPage



//afCFgG2xkaAgIap6X2VGCWE5a6ws0nt7