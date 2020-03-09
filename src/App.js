import React, { useState } from 'react';
import './App.css';
import api from './API/baidu'
import Page from './component/Page'
import Result from './component/Result'
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';

const auth = () => {
  api.auth()
}


function App() {
  auth()
  
  const [text, setText] = useState({})
  let languageType = localStorage.getItem("language_type") || 'CH_ENG'
  const [textLanguage, setTextLanguage] = useState(languageType)

  return (
    <div>
       <PageHeader
        title="🎈CC文字识别"
        subTitle=""
        extra={[
          <a target='_bank' href='https://github.com/seaasun/text-identify' key="1">❤GitHub</a> 
        ]}
      />
      {Page(text, setText, textLanguage)}
      {Result(text, setText, textLanguage, setTextLanguage)}
    </div>
  );
}

export default App
