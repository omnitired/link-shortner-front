import React, { useState } from 'react';
import './style.css'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ApiService from '../../services/ApiService';
import StorageService from '../../services/StorageService';

export default function Login(props: any) {
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();


  const login = async () => {
    try {
      const result = await ApiService.login({
        login_key: username,
        password
      });
      if (result && result && result.token) {
        StorageService.setToken(result.token);
        StorageService.setUser(result.user);
        props.history.push('/stats')
      } else {

      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <form>
          <span className="log-heading">ورود</span>
          <span className="en-label">ایمیل یا نام کاربری</span>
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)} className="en-input" />
          <span className="en-label">رمز عبور</span>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="en-input" />
          <div className="space-between">
            <Button variant="contained" color="primary" onClick={login} className="submit-button">ورود</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
