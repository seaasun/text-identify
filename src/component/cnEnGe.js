import api from './../API/baidu'

// 测试用数据
// let dataDes = {"direction":0,"paragraphs_result_num":3,"log_id":6200264271404622000,"words_result_num":9,"words_result":[{"words":"h zu"},{"words":"können sie sich vorstellen ?"},{"words":"siehe e ?"},{"words":"darf ich mich vorstellen ?"},{"words":"die er ?"},{"words":"wie heißen sie ? wie heißt du ?"},{"words":"entre ? uralte ?"},{"words":"ich heiße ."},{"words":"er"}],"paragraphs_result":[{"words_result_idx":[0]},{"words_result_idx":[1,2,3,4]},{"words_result_idx":[5,6,7,8]}]}
// let dataZhs = {"direction":0,"paragraphs_result_num":9,"log_id":6988648770111479000,"words_result_num":9,"words_result":[{"words":"自我介绍"},{"words":"Konnen Sie sich vorstellen?"},{"words":"■您能介绍一下自己吗?"},{"words":"Darf ich mich vorstellen?"},{"words":"我能自我介绍一下吗?"},{"words":"Wie heiBen Sie? Wie heiSt du?"},{"words":"您叫什么?你叫什么?"},{"words":"Ich heiBe"},{"words":"我叫"}],"paragraphs_result":[{"words_result_idx":[0]},{"words_result_idx":[1]},{"words_result_idx":[2]},{"words_result_idx":[3]},{"words_result_idx":[4]},{"words_result_idx":[5]},{"words_result_idx":[6]},{"words_result_idx":[7]},{"words_result_idx":[8]}]}

// 合并德语和英语
// 1. 找出德语特殊字母； 2. 找出德语特殊字母所在的单词； 3. 用正则替换英语中相应单词 
// dataZhs: 中英文； dataDes： 德文
function transform(dataZhs, dataDes) {
    let deSpecials = ['ü', 'Ü', 'Ö', 'ö', 'Ä', 'ä', 'ß']
    // 一张图片
    dataDes.map((line, lineIndex) => {
        // 一句化
        let lines = line.words.split(' ')
        // 一个单词
        lines.map(word => {
            deSpecials.map(deSpecial => {
                let specialAt = word.indexOf(deSpecial)
                if (specialAt > 0) {
                    // 正则，如 'auc'.replace(/a*c/i, 'ü')
                    let wordFront = word.slice(0, specialAt)
                    let wordBack = word.slice(specialAt+1)
                    let r = `/${wordFront}.${wordBack}/i`
                   
                    dataZhs[lineIndex].words =  dataZhs[lineIndex].words.replace(eval(r), word)
                    
                }
            })
            
        })
    })
    return dataZhs.map(item => item.words)
}

function cnEnGe (image, json2form) {
    // 测试数据使用
    // transform(dataDes.words_result,dataZhs.words_result)
    return new Promise((resolve, reject) => {
        let zhParam = {
            image: encodeURI(image),
            language_type: 'ZH_EN',
            paragraph: 'true',
            probability: 'false',
            recognize_granularity: 'big',
            detect_direction: 'true',
         }
         let geParam = {
             image: encodeURI(image),
            language_type: 'GER',
            paragraph: 'true',
            probability: 'false',
            recognize_granularity: 'big',
            detect_direction: 'true',
         }
         Promise.all(
             [api.ocr(json2form(zhParam)),
              api.ocr(json2form(geParam))]           
         ).then(resp => {
             let result = transform(resp[0].data.words_result, resp[1].data.words_result)
             resolve(result)             
         }).catch(resp => {
             reject()
         })
    })
    
}
export default  cnEnGe