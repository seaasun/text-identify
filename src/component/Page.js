import React, { useState } from 'react';
import api from './../API/baidu'

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import cnEnGe from './cnEnGe';
const { Dragger } = Upload

// 测试数据： 中英
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

let temp = 0 // 测试数据用
let textKey = 0 // 每张图的键
let textDict = {} // 所有以识别的文本，用对象是防止函数重选失去值
let hasCopyEvent = false // 是否已经copy

function Page(text, setText, textLanguage) {
  textDict.text = text

  const [loading, setLoading] = useState(false)

  // 更新text
  const updateText =  (text, image) => {
    setLoading(false)
    textKey = textKey + 1 
    setText({
      ...textDict.text,
      [textKey]: {
        words: text,
        image
      }
    })
  }

  
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
  
  // 上传操作
  const upload = (file) => {
    setLoading(true)
    let reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
    let image = this.result
    let images = image.split(',')
    console.log(images)
    if (textLanguage === 'CHN_GER') {
      cnEnGe(images[1], json2form).then(result => {
        updateText(
          result,
          images)
        setLoading(false)  
      }).catch(()=> {
        setLoading(false)
        message.error('发生错误，请重试');
      })
      return
    }


    // 普通语言上传
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
      updateText(
        transformGeneralBasic(resp.data),
        image)
    }).catch(() => {
      setLoading(true)
      message.error('发生错误，请重试')
    })
    }
    
    return false
  }

  // 从粘贴板中上传
  if (!hasCopyEvent) {
    window.addEventListener("paste", function (e){
      if (loading) return
      setLoading(false)
      let items = e.clipboardData.items
        for (let item of items) {
            if (item.kind === 'file') {
              upload(item.getAsFile())
            }
          }
    })
    hasCopyEvent = true
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
            {loading ? '上传中，请稍后...' : '单击或拖拽上传图片'}
          </p>
          <p>
            或按 Ctrl/Commend + V 从粘贴板上上传
          </p>
        </Dragger>
    </div>
  );
}

export default Page;
