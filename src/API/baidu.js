const axios = require('axios')

let dict = {
    access_token:  localStorage.getItem("access_token")
    // access_token: null
}
let url = ''
// surl = 'http://localhost:3009'
// url = 'https://aip.baidubce.com'
let apis = {
    auth (data) {
        console.log('token',dict.access_token)
        if (dict.access_token) return null
        return axios.get(url+'/oauth/2.0/token', {
            params: {
                grant_type: 'client_credentials',
                client_id: 'I9SK2hqWq1sBWZPFPiWElvSc',
                client_secret: 'WqIqxCwKtZRGvYbDa2WD3DAQuAm2O007'
            }
        }).then (resp => {
            dict.access_token =resp.data.access_token
            localStorage.setItem('access_token', resp.data.access_token)
        }) 
    },
    ocr (data) {
        // https://ai.baidu.com/ai-doc/OCR/zk3h7xz52
        return axios.post(url+`/rest/2.0/ocr/v1/general_basic?access_token=${dict.access_token}`, 
            data
        , {
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
    }

}

export default apis;