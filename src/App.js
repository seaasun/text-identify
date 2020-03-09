import React, { useState } from 'react';
import './App.css';
import api from './API/baidu'
import Page from './component/Page'
import Result from './component/Result'
import 'antd/dist/antd.css';


const auth = () => {
  api.auth()
}


function App() {
  auth()
  
  const [text, setText] = useState({})
  const [textLanguage, setTextLanguage] = useState('CH_ENG')

  return (
    <div>
      {Page(text, setText, textLanguage)}
      {Result(text, setText, textLanguage, setTextLanguage)}
    </div>
  );
}

export default App
