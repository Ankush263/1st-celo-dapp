import React, { useState } from 'react';
import { Button } from '@mui/material';
import { uploadRescueJSONToIPFS, uploadFileToIPFS } from '../../../utils/pinata';
import { ethers } from 'ethers';
import CELO from '../../../../hardhat/artifacts/contracts/CELO_HACK.sol/CELO_HACK.json';


function RescueDetail() {

  const deployAddress = "0x6675d527e14ABb3b909775CC2e13E9081257485A"

  const [rescueDesc, setRescueDesc] = useState({
    language: '',
    name: '',
    numberOfPeople: '',
    ageGroup: '',
    reason: '',
    location: '',
    phoneNo: '',
    moreInfo: '',
  })
  const [message, updateMessage] = useState('')
  const [disabled, setDisabled] = useState(false)

  const uploadMetadataToIPFS = async () => {
    const { language, name, numberOfPeople, ageGroup, reason, location, phoneNo, moreInfo } = rescueDesc

    if(!language || !name || !numberOfPeople || !ageGroup || !reason || !location || !phoneNo || !moreInfo) {
      return;
    }

    const nftJSON = {
      language, name, numberOfPeople, ageGroup, reason, location, phoneNo, moreInfo
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
      // console.log(transaction)

      console.log(await contract.owner(), await signer.getAddress())

      alert("Successfully send the request😀")
      // setDisabled(false)
      updateMessage('')



    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen max-w-screen-sm h-screen flex flex-col justify-start items-center`,
    head: `w-full h-20 flex justify-center items-center`,
    box: `w-11/12 h-16`,
    text: `text-sm font-bold `,
    input: `bg-slate-300/[.9] shadow-2xl border-white-900/75 w-full h-7`,
    inputbg: `w-full h-full bg-inherit pl-2 placeholder:text-sm`,
  }

  return (
    <div className="flex justify-center items-center">
      <div className={styles.page}>
        <div className={styles.head}>
          <span className='text-2xl font-bold text-sky-600'>Rescue Food Details</span>
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
        <div className={styles.box}>
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
          <span className={styles.text}>More Info:*</span>
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
          <span className='text-sm'>{message}</span>
        </div>
      </div>
    </div>

  )
}

export default RescueDetail