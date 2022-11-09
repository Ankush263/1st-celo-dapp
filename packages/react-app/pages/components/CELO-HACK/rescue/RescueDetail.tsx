import React, { useState } from 'react';
import { Button } from '@mui/material';
import { uploadRescueJSONToIPFS, uploadFileToIPFS } from '../../../../utils/pinata';
import { ethers } from 'ethers';
import CELO from '@celo-composer/hardhat/artifacts/contracts/CELO_HACK.sol/CELO_HACK.json';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';

function RescueDetail() {

  const deployAddress = "0x18bAe5571f34B1c965d1314c339a79f8F364eD78"


  const [rescueDesc, setRescueDesc] = useState({
    language: '',
    name: '',
    numberOfPeople: '',
    lessthen1: '',
    oneTofive: '',
    sixTothirteen: '',
    forAdults: '',
    above60: '',
    reason: '',
    location: '',
    phoneNo: '',
    moreInfo: '',
  })

  const [message, updateMessage] = useState('')
  const [disabled, setDisabled] = useState(false)



  const uploadMetadataToIPFS = async () => {
    const { language, name, numberOfPeople, lessthen1, oneTofive, sixTothirteen, forAdults, above60, reason, location, phoneNo, moreInfo } = rescueDesc

    if(!language || !name || !numberOfPeople || !lessthen1 || !oneTofive || !sixTothirteen || !forAdults || !above60 || !reason || !location || !phoneNo || !moreInfo) {
      return;
    }

    const nftJSON = {
      language, name, numberOfPeople, lessthen1, oneTofive, sixTothirteen, forAdults, above60, reason, location, phoneNo, moreInfo
    }

    try {

      const response = await uploadRescueJSONToIPFS(nftJSON)

      if(response.success === true) {
        return response.pinataURL
      }

    } catch (error) {
      console.log(error)
    }
  }

  const submit = async (e) => {

    // setDisabled(true)
    e.preventDefault()

    try {

      // const metadataURL = await uploadMetadataToIPFS()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      updateMessage("Please wait.. sending your request(upto 2 mins)")
      const contract = new ethers.Contract(deployAddress, CELO.abi, signer)

      // let transaction = await contract.SendRescueRequest(metadataURL)
      // await transaction.wait()
      // console.log(transaction.hash)
      // setTxhash(transaction.hash)

      alert("Successfully send the request😀")
      // setDisabled(false)
      updateMessage('')
      // window.location.replace("/components/CELO-HACK/rescue/PaymentComplete")

      console.log(rescueDesc)

    } catch (error) {
      console.log(error)
    }
  }


  const styles = {
    page: `w-screen max-w-screen-sm h-screen flex flex-col justify-start items-center bg-slate-900`,
    head: `w-full h-20 flex justify-between items-center`,
    box: `w-11/12 h-16`,
    text: `text-sm font-bold text-white`,
    input: `bg-slate-300/[.9] shadow-2xl border-white-900/75 w-full h-7 rounded-md`,
    inputbg: `w-full h-full bg-inherit pl-2 placeholder:text-sm rounded-md`,
  }

  return (
    <div className="flex flex-col justify-center items-center bg-slate-900">
      <div className="w-full flex justify-between">
        <Link href="/">
          <ArrowBackIcon fontSize='large' color='primary' />
        </Link>

        <Link href="/">
          <HomeIcon fontSize='large' color='primary' />
        </Link>
      </div>
      <div className={styles.page}>
        <div className={styles.head}>
          <span className='text-xl max-text-2xl font-bold text-sky-600'>Rescue Food Details</span>
          <Link href="/components/CELO-HACK/rescue/MyRescues">
            <Button variant='contained'><span className="capitalize text-sm">Rescue's</span></Button>
          </Link>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Languages:*</span>
          <div className={styles.input}>
            <select
              data-placeholder="Choose a Language..."
              onChange={e => setRescueDesc({...rescueDesc, language: e.target.value})}
              value={rescueDesc.language}
              className={styles.inputbg}
            >
              <option value="AF">Afrikaans</option>
              <option value="SQ">Albanian</option>
              <option value="AR">Arabic</option>
              <option value="HY">Armenian</option>
              <option value="EU">Basque</option>
              <option value="BN">Bengali</option>
              <option value="BG">Bulgarian</option>
              <option value="CA">Catalan</option>
              <option value="KM">Cambodian</option>
              <option value="ZH">Chinese (Mandarin)</option>
              <option value="HR">Croatian</option>
              <option value="CS">Czech</option>
              <option value="DA">Danish</option>
              <option value="NL">Dutch</option>
              <option value="EN">English</option>
              <option value="ET">Estonian</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finnish</option>
              <option value="FR">French</option>
              <option value="KA">Georgian</option>
              <option value="DE">German</option>
              <option value="EL">Greek</option>
              <option value="GU">Gujarati</option>
              <option value="HE">Hebrew</option>
              <option value="HI">Hindi</option>
              <option value="HU">Hungarian</option>
              <option value="IS">Icelandic</option>
              <option value="ID">Indonesian</option>
              <option value="GA">Irish</option>
              <option value="IT">Italian</option>
              <option value="JA">Japanese</option>
              <option value="JW">Javanese</option>
              <option value="KO">Korean</option>
              <option value="LA">Latin</option>
              <option value="LV">Latvian</option>
              <option value="LT">Lithuanian</option>
              <option value="MK">Macedonian</option>
              <option value="MS">Malay</option>
              <option value="ML">Malayalam</option>
              <option value="MT">Maltese</option>
              <option value="MI">Maori</option>
              <option value="MR">Marathi</option>
              <option value="MN">Mongolian</option>
              <option value="NE">Nepali</option>
              <option value="NO">Norwegian</option>
              <option value="FA">Persian</option>
              <option value="PL">Polish</option>
              <option value="PT">Portuguese</option>
              <option value="PA">Punjabi</option>
              <option value="QU">Quechua</option>
              <option value="RO">Romanian</option>
              <option value="RU">Russian</option>
              <option value="SM">Samoan</option>
              <option value="SR">Serbian</option>
              <option value="SK">Slovak</option>
              <option value="SL">Slovenian</option>
              <option value="ES">Spanish</option>
              <option value="SW">Swahili</option>
              <option value="SV">Swedish </option>
              <option value="TA">Tamil</option>
              <option value="TT">Tatar</option>
              <option value="TE">Telugu</option>
              <option value="TH">Thai</option>
              <option value="BO">Tibetan</option>
              <option value="TO">Tonga</option>
              <option value="TR">Turkish</option>
              <option value="UK">Ukrainian</option>
              <option value="UR">Urdu</option>
              <option value="UZ">Uzbek</option>
              <option value="VI">Vietnamese</option>
              <option value="CY">Welsh</option>
              <option value="XH">Xhosa</option>
            </select>
          </div>
        </div>
        <div className={styles.box}>
          <span className={styles.text}>Your name:*</span>
          <div className={styles.input}>
            <input
              type="text"
              placeholder='enter your name'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, name: e.target.value})}
              value={rescueDesc.name}
            />
          </div>
        </div>
        <div className={styles.box}>
          <span className={styles.text}>How many people?*</span>
          <div className={styles.input}>
            <input
              type="number"
              placeholder='select'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, numberOfPeople: e.target.value})}
              value={rescueDesc.numberOfPeople}
            />
          </div>
        </div>
        {/* <div className={styles.box}>
          <span className={styles.text}>Age group*</span>
          <div className={styles.input}>
            <input
              type="text"
              placeholder='enter'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, ageGroup: e.target.value})}
              value={rescueDesc.ageGroup}
            />
          </div>
        </div> */}


        <div className="w-11/12 min-h-16 flex-col">

          <span className={styles.text}>Age group*</span>

          <div className="bg-slate-300/[.2] shadow-2xl border-white-900/75 rounded-md w-full min-h-52 flex flex-col border-2 p-2">
            
            <div className="flex flex-col">
              <span className='text-white font-bold ml-1 text-sm'>Less then 1 year</span>
              <input 
                type="number" 
                placeholder='Enter the number of People'
                className='rounded-md placeholder:text-sm p-1'
              />
            </div>

            <div className="flex flex-col">
              <span className='text-white font-bold ml-1 text-sm'>From 1 year to 5 year</span>
              <input 
                type="number" 
                placeholder='Enter the number of People'
                className='rounded-md placeholder:text-sm p-1'
              />
            </div>
            <div className="flex flex-col">
              <span className='text-white font-bold ml-1 text-sm'>From 6 year to 13 year</span>
              <input 
                type="number" 
                placeholder='Enter the number of People'
                className='rounded-md placeholder:text-sm p-1'
              />
            </div>
            <div className="flex flex-col">
              <span className='text-white font-bold ml-1 text-sm'>For Adults</span>
              <input 
                type="number" 
                placeholder='Enter the number of People'
                className='rounded-md placeholder:text-sm p-1'
              />
            </div>
            <div className="flex flex-col">
              <span className='text-white font-bold ml-1 text-sm'>Above 60</span>
              <input 
                type="number" 
                placeholder='Enter the number of People'
                className='rounded-md placeholder:text-sm p-1'
              />
            </div>

          </div>

        </div>





        <div className={styles.box}>
          <span className={styles.text}>Reason for rescue:*</span>
          <div className={styles.input}>
            <input
              type="text"
              placeholder='enter'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, reason: e.target.value})}
              value={rescueDesc.reason}
            />
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Location:*</span>
          <div className={styles.input}>
            <input
              type="text"
              placeholder='enter'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, location: e.target.value})}
              value={rescueDesc.location}
            />
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Phone No(with country code):*</span>
          <div className={styles.input}>
            <input
              type="tel"
              placeholder='123-456-7890'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, phoneNo: e.target.value})}
              value={rescueDesc.phoneNo}
              required
            />
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>More Info:*  (N/A)</span>
          <div className={styles.input}>
            <input
              type="text"
              placeholder='enter'
              className={styles.inputbg}
              onChange={e => setRescueDesc({...rescueDesc, moreInfo: e.target.value})}
              value={rescueDesc.moreInfo}
            />
          </div>
        </div>

        <div className="h-24 w-full flex flex-col justify-center items-center">
          <div className="flex">
            <input type="checkbox" />
            <label htmlFor="text" className='text-xs text-bold text-gray-400 ml-1'>I assure that the details provided are accurate</label>
          </div>
          <Button variant='contained' onClick={submit} disabled={disabled} className='w-10/12 h-10'>Submit</Button>
          <span className='text-sm text-white'>{message}</span>
        </div>
      </div>
    </div>

  )
}

export default RescueDetail
















{/* <select
              placeholder='enter'
              className="w-6/12 h-full bg-inherit pl-2 placeholder:text-sm rounded-md border-white border-2"
              // onChange={e => setRescueDesc({...rescueDesc, ageGroup: e.target.value})}
              // value={rescueDesc.ageGroup}
              onChange={(e) => setAge(e.target.value)}
              value={age}
            >
              <option value="less then 1">Less then 1 year</option>
              <option value="1 to 5">1 to 5 year</option>
              <option value="6 to 12">6 to 12 year</option>
              <option value="adults">Adults</option>
              <option value="above 60">Above 60</option>
            </select>
            <input
              type="number"
              placeholder='Number of people'
              className='bg-inherit w-4/12 placeholder:text-black placeholder:text-xs rounded-md p-1 border-white border-2'
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
            <Button variant='contained' onClick={Add}><span className="capitalize text-sm w-full">Add</span></Button> */}
