import React from 'react';
import './result.css'
import { Button,  Select} from 'antd';
// import cnEnGe from './cnEnGe';
const { Option} = Select;

let renderOne = (words) => {
    return (
        words.map(item => (
            <p className = "result-one-text" key = {item}>{item}</p>
        ))
    )
}
const handleCopy = () => {
    let range = document.createRange()
    let ele = document.getElementById("result-text");
    range.selectNode(ele)
    let selection = window.getSelection();
    selection.selectAllChildren(ele);
    document.execCommand("Copy"); 
    
}

const languages = [
    {value: 'CHN_ENG', text: '中英'},
    {value: 'CHN_GER', text: '中德'},
    {value: 'GER', text: '德'},
    {value: 'ENG', text: '英'},
    {value: 'JAP', text: '日'},
    {value: 'KOR', text: '韩'},
    {value: 'FRE', text: '法'},
    {value: 'SPA', text: '西班牙'},
    {value: 'POR', text: '葡萄牙'},
    {value: 'ITA', text: '意大利'},
    {value: 'RUS', text: '俄'},
]

function Result(text, setText, textLanguage, setTextLanguage) {  
 
  const clearText = () => {
    setText({})
    }
  const handleDeleteOne = (key) => {
    let newText = JSON.parse(JSON.stringify(text))
    delete newText[key]
    setText(newText)
  }  
  const handleLanguage = (value) => {
      setTextLanguage(value)
      localStorage.setItem('language_type', value)
  }

  let defaultLanguage = "中英"
  languages.some(item => {
      if (item.value === textLanguage) {
        defaultLanguage = item.text
        return true
      }
  })

  return (
    <div >
        <div className="result-action">
            <Select
                defaultValue={defaultLanguage}
                className="action-btn"
                onSelect={handleLanguage}>
               {
                   languages.map(language => (
                       <Option value={language.value} key={language.value}>
                           {language.text}
                       </Option>
                   ))
               } 
            </Select>
            <Button onClick = {handleCopy} className="action-btn">全选复制</Button>
            <Button onClick = {clearText} className="action-btn">清空</Button>
        </div>
        <div className ="result-box">
            <div className ="result-image">
            {
                Object.keys(text).length > 0 && Object.keys(text).map(key => (
                    <div key = {key}  className = "result-image-one">
                        <div className = "result-one resulxt-one-transparent">
                            {renderOne(text[key].words)}
                        </div>
                        <div className = "result-one-image">
                            <img src = {text[key].image} 
                                alt= '上传的图像'
                                className="result-one-img"/>
                        </div>
                        <div className = "result-one-delete" 
                                    onClick={()=> {handleDeleteOne(key)}}>
                            <span>❌</span>
                        </div>
                    </div>
                ))
                    
            }    
            </div>
            <div className ="resut-text" 
                suppressContentEditableWarning={true}
                contentEditable={true}
                id="result-text">
            {
                 Object.keys(text).length > 0 && Object.keys(text).map(key => (
                    <div key = {key} 
                    
                        className = "result-one"
                    >{renderOne(text[key].words)}</div>
                ))
            }
            </div>
        </div>
    </div>
    
  );
}

export default Result;