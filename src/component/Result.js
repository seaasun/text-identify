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
    // console.log(copyDome)
    range.selectNode(ele)
    let selection = window.getSelection();
    selection.selectAllChildren(ele);
    console.log(selection)

    // console.log(range)

    // // range.selectNodeContents(copyDome)

    // // copyDome.select(); // 选择对象
    document.execCommand("Copy"); 
    
}

const languages = [
    {value: 'CHN_ENG', text: '中英'},
    {value: 'CHN_ENG_GE', text: '中英德'},
    {value: 'ENG', text: '英'},
    {value: 'JAP', text: '日'},
    {value: 'KOR', text: '韩'},
    {value: 'FRE', text: '法'},
    {value: 'SPA', text: '西班牙'},
    {value: 'POR', text: '葡萄牙'},
    {value: 'GER', text: '德'},
    {value: 'ITA', text: '意大利'},
    {value: 'RUS', text: '俄'},
]

function Result(text, setText, textLanguage, setTextLanguage) {  
 // if (Object.keys(text).length === 0) return null
 // cnEnGe()
  let copyRef = React.createRef()
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
  }

  return (
    <div >
        <div className="result-action">
            <Select defaultValue ='中英' 
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
                Object.keys(text).map(key => (
                    <div key = {key}  className = "result-image-one">
                        <div className = "result-one result-one-transparent">
                            {renderOne(text[key].words)}
                        </div>
                        <div className = "result-one-image">
                            <img src = {text[key].image} />
                        </div>
                        <div className = "result-one-delete" onClick={()=> {handleDeleteOne(key)}}>
                            X
                        </div>
                    </div>
                ))
                    
            }    
            </div>
            <div className ="resut-text" 
                ref={copyRef}
                id="result-text">
            {
                Object.keys(text).map(key => (
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