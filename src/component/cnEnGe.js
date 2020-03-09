import api from './../API/baidu'
let dataDes = {"direction":0,"paragraphs_result_num":3,"log_id":6200264271404622000,"words_result_num":9,"words_result":[{"words":"h zu"},{"words":"können sie sich vorstellen ?"},{"words":"siehe e ?"},{"words":"darf ich mich vorstellen ?"},{"words":"die er ?"},{"words":"wie heißen sie ? wie heißt du ?"},{"words":"entre ? uralte ?"},{"words":"ich heiße ."},{"words":"er"}],"paragraphs_result":[{"words_result_idx":[0]},{"words_result_idx":[1,2,3,4]},{"words_result_idx":[5,6,7,8]}]}
let dataZhs = {"direction":0,"paragraphs_result_num":9,"log_id":6988648770111479000,"words_result_num":9,"words_result":[{"words":"自我介绍"},{"words":"Konnen Sie sich vorstellen?"},{"words":"■您能介绍一下自己吗?"},{"words":"Darf ich mich vorstellen?"},{"words":"我能自我介绍一下吗?"},{"words":"Wie heiBen Sie? Wie heiSt du?"},{"words":"您叫什么?你叫什么?"},{"words":"Ich heiBe"},{"words":"我叫"}],"paragraphs_result":[{"words_result_idx":[0]},{"words_result_idx":[1]},{"words_result_idx":[2]},{"words_result_idx":[3]},{"words_result_idx":[4]},{"words_result_idx":[5]},{"words_result_idx":[6]},{"words_result_idx":[7]},{"words_result_idx":[8]}]}

 
function transform(dataDes, dataZhs) {
    const updateDeWords = (lineIndex, words) => {
        dataZhs[lineIndex].words = dataZhs[lineIndex].words
    }

    let deSpecials = ['ü', 'Ü', 'Ö', 'ö', 'Ä', 'ä', 'ß']
    dataDes.map((line, lineIndex) => {
        let lines = line.words.split(' ')
        lines.map(word => {
            deSpecials.map(deSpecial => {
                if (word.includes(deSpecial)) {
                    console.log(3333)
                }
            })
            
        })
    })
}

function cnEnGe (image, textDict, setText, json2form) {
    transform(dataDes.words_result,dataZhs.words_result)
    return

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
       language_type: 'DE',
       paragraph: 'true',
       probability: 'false',
       recognize_granularity: 'big',
       detect_direction: 'true',
    }
    Promise.all(
        [api.ocr(json2form(zhParam)),
         api.ocr(geParam)]           
    ).then(resp => {
        console.log(json2form(3333))
        console.log(resp)
    }).catch(resp => {
        console.log('error')
    })
}
export default  cnEnGe