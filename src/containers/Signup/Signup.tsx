import React, { useState } from 'react';
import './style.css'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ApiService from '../../services/ApiService';
import StorageService from '../../services/StorageService';

export default function Signup(props: any) {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();


  const login = async () => {
    try {
      const result = await ApiService.singUp({
        email,username,password
      });
      if (result && result && result.token) {
        StorageService.setToken(result.token);
        StorageService.setUser(result.user);
        props.history.push('/stats')
      } else {
        // TODO: handleerrors
      }
    } catch (e) {
      // TODO: handleerrors
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <form>
          <span className="log-heading">ثبت نام</span>
          <span className="en-label">ایمیل</span>
          <Input type="email" name="email" value={email} onChange={e => {
            setEmail(e.target.value)
            setUsername(e.target.value.split('@')[0])
          }} className="en-input" />
          <span className="en-label">نام کاربری</span>
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)} className="en-input" />
          <span className="en-label">رمز عبور</span>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="en-input" />
          <div className="space-between">
            <Button variant="contained" color="primary" onClick={login} className="submit-button">ثبت نام</Button>
            
            <span>  قبلا ثبت نام کرده‌اید؟ <a onClick={() => props.history.push('/login')}>وارد شوید</a> </span>
          </div>
        </form>
      </div>
    </div>
  )
}
