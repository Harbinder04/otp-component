import React, { useEffect } from 'react'

function Inputs({ length, setOtp }:{length: number, setOtp: (otp: string) => void; }) {
  const array = new Array(length).fill('');
  const [otp, setOtpState] = React.useState(array);
  const inputRef = React.useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtpState(otpCopy);
    setOtp(otpCopy.join(''));
    if (e.target.nextSibling && value) {
      (e.target.nextSibling as HTMLInputElement).focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    if(paste.length !== length) return;
    if(paste.match(/\D/)) return; // regulare expression to match if characters are present
    const otpArray = paste.match(/\d/g) || [];
    setOtpState(array.map((_, index) => otpArray[index] || ''));
    setOtp(paste);
  }

  function handleKeyDown(e : React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace') {
      if (index === 0) return;
      const otpCopy = [...otp];
      otpCopy[index] = '';
      setOtpState(otpCopy);
      setOtp(otpCopy.join(''));
      (inputRef.current[index - 1] as HTMLInputElement).focus();
  }
}

  function handleRightKey(index: number) {
    if (index === 3) return;
    (inputRef.current[index].nextSibling as HTMLInputElement).focus();
  }
  return (
    <>
      {array.map((_, index: number) => (
        <input
          id={index.toString()}
          key={index}
          type="text"
          className='otp-field'
          maxLength={1}
          value={otp[index]}
          onPaste={(e) => handlePaste(e)}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
          onClick={() => inputRef.current[index].setSelectionRange(1, 1)}
          onKeyUp={(e) => {
            if (e.key === 'ArrowRight') {
              handleRightKey(index);
            } else if (e.key === 'ArrowLeft') {
              if (index > 0) {
                (inputRef.current[index - 1] as HTMLInputElement).focus();
              }
            }
          }}
        />
      ))}
    </>
  );
}

export default Inputs