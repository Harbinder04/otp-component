import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleClick = async () => {
    const res = await fetch(`http://localhost:3000/send?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch((error) => console.error(error));

    if (res && res.status === 200) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/verify" />;
  }

  return (
    <div className='container'>
      <h1>Enter your email to get your OTP</h1>
      <input type="email" placeholder="Email" onChange={handleChange} />
      <button onClick={handleClick}>Send OTP</button>
    </div>
  );
}

export default SignIn;