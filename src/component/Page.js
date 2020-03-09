import React, { useState } from 'react';
import api from './../API/baidu'
// eslint-disable-next-line no-unused-vars
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import cnEnGe from './cnEnGe';
const { Dragger } = Upload

// import { PlusOutlined } from '@ant-design/icons';

let data = {"direction":0,"paragraphs_result_num":3,"log_id":6200264271404622000,"words_result_num":9,"words_result":[{"words":"h zu"},{"words":"können sie sich vorstellen ?"},{"words":"siehe e ?"},{"words":"darf ich mich vorstellen ?"},{"words":"die er ?"},{"words":"wie heißen sie ? wie heißt du ?"},{"words":"entre ? uralte ?"},{"words":"ich heiße ."},{"words":"er"}],"paragraphs_result":[{"words_result_idx":[0]},{"words_result_idx":[1,2,3,4]},{"words_result_idx":[5,6,7,8]}]}
const transformGeneralBasic = (data) => {
  let result = []
  let words = data.words_result
  words.forEach(item => {
    result.push(item.words)
  })
  return result
}

const json2form = json => {
  let form =  new URLSearchParams()
  Object.entries(json).forEach(item => {
    form.append(item[0], item[1])
  })
  return form
}

let temp = 0
let textKey = 0
let textDict = {}
function Page(text, setText, textLanguage) {
  textDict.text = text
  const [loading, setLoading] = useState(false)

  // 启用mock数据
  if (temp < 0) {
    textKey = textKey + 1
    setText({
      ...text,
      [textKey]: {
        words: transformGeneralBasic(data),
        image: '33333'
      }
    })
    temp = temp + 1
  }
  
  const upload = (file) => {
   
    setLoading(true)
    var reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let image = this.result
      let images = image.split(',')

      if (textLanguage === 'CHN_ENG_DE') {
        cnEnGe(images[1], textDict, setText, json2form)
        return
      }

      let param = {
       image: encodeURI(images[1]),
       language_type: textLanguage,
       paragraph: 'true',
       probability: 'false',
       recognize_granularity: 'big',
       detect_direction: 'true',
      }
      
      let result = json2form(param)
      api.ocr(result).then(resp => {
        setLoading(false)
        textKey = textKey + 1
       
          setText({
            ...textDict.text,
            [textKey]: {
              words: transformGeneralBasic(resp.data),
              image
            }
          })
        
      }).catch(resp => {
        setLoading(true)
        message.success('发生错误，请重试');
      })
    }
    
    return false
  }

  return (
    <div>
        <Dragger
          name= "image"
          beforeUpload= {upload}
          listType="picture-card"
          multiple= {true}
          showUploadList = {false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {loading ? '上传中，请稍后...' : '单击或拖拽上传图片'}</p>
        
        </Dragger>
    </div>
  );
}
// beforeUpload = {() => false}
export default Page;
