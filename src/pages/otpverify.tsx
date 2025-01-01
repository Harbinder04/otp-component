// import React from 'react'
import Inputs from '../components/Inputs'
import { useState } from 'react'

function Verification() {
  const [otp, setOtp] = useState<string>('');
  function handleOnSubmit() {
    alert(`OTP submitted: ${otp}`);
    // Add your submission logic here
  }

  return (
    <div className='otp-container'>
        <h1>Verification</h1>
        <p>Enter the OTP sent to your email</p>
        <Inputs length={4} setOtp={setOtp}/>
        <br />
        <button onClick={handleOnSubmit} >Verify</button>
    </div>
  )
}

export default Verification