import React, { useState } from 'react';
import { Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function DonateDetails() {

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
          <span className='text-2xl font-bold text-sky-600'>Donate Details</span>
        </div>

        <div className="flex justify-around items-center">
          <div className="flex flex-col justify-center items-center w-full">
            <span className={styles.text}>Languages:</span>
            <div className="bg-slate-300/[.9] shadow-2xl border-white-900/75 w-10/12 h-7">
              <select data-placeholder="Choose a Language..." className={styles.inputbg}>
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
          <div className="flex flex-col justify-center items-center w-full">
            <span className={styles.text}>Your name:</span>
            <div className="bg-slate-300/[.9] shadow-2xl border-white-900/75 w-10/12 h-7">
              <input type="text" placeholder='enter your name' className={styles.inputbg}/>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Pickup Where?</span>
          <div className={styles.input}>
            <input type="text" placeholder='123 Road St, New City' className={styles.inputbg} />
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Phone No(with country code):</span>
          <div className={styles.input}>
            <input type="tel" placeholder='123-456-7890' className={styles.inputbg} required/>
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Pickup Time:</span>
          <div className={styles.input}>
            <input type="time" placeholder='select' className={styles.inputbg}/>
            {/* <input type="time" name="" id="" /> */}
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Pickup Day:</span>
          <div className={styles.input}>
            <input type="date" placeholder='enter' className={styles.inputbg}/>
          </div>
        </div>
        
        <div className={styles.box}>
          <span className={styles.text}>Food Item:</span>
          <div className={styles.input}>
            <input type="text" placeholder='enter' className={styles.inputbg}/>
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Quantity (People): </span>
          <div>
            <Slider
              size="small"
              defaultValue={70}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={1}
              max={100}
            />
          </div>
        </div>

        <div className="w-full h-2/6 flex flex-col justify-between items-center">
          <div className="w-full h-4/6 flex flex-col justify-around items-center">
            <span className={styles.text}>Photos:</span>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <AddAPhotoIcon fontSize='large' />
            </IconButton>
            <div className='flex'>
            <input type="checkbox" />
              <label htmlFor="text" className='text-xs text-bold text-gray-400 ml-1'>I assure that the details provided are accurate</label>
            </div>
          </div>
          <div className="w-full h-1/5 flex justify-center mb-2">
            <Button variant='contained' className='w-10/12 h-10'>Submit</Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DonateDetails
