(this["webpackJsonptext-identify"]=this["webpackJsonptext-identify"]||[]).push([[0],{165:function(e,t,a){e.exports=a(357)},170:function(e,t,a){},171:function(e,t,a){},350:function(e,t,a){},357:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),o=a.n(c),s=(a(170),a(47)),l=(a(171),a(172)),i={access_token:localStorage.getItem("access_token")},u={auth:function(e){return console.log("token",i.access_token),i.access_token?null:l.get("/oauth/2.0/token",{params:{grant_type:"client_credentials",client_id:"I9SK2hqWq1sBWZPFPiWElvSc",client_secret:"WqIqxCwKtZRGvYbDa2WD3DAQuAm2O007"}}).then((function(e){i.access_token=e.data.access_token,localStorage.setItem("access_token",e.data.access_token)}))},ocr:function(e){return l.post(""+"/rest/2.0/ocr/v1/general_basic?access_token=".concat(i.access_token),e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}},d=a(43),m=a(94),v=a(359),w=a(362),f=a(361),h=[{words:"h zu"},{words:"k\xf6nnen sie sich vorstellen ?"},{words:"siehe e ?"},{words:"darf ich mich vorstellen ?"},{words:"die er ?"},{words:"wie hei\xdfen sie ? wie hei\xdft du ?"},{words:"entre ? uralte ?"},{words:"ich hei\xdfe ."},{words:"er"}];var p=function(e,t,a,n){!function(e,t){var a=["\xfc","\xdc","\xd6","\xf6","\xc4","\xe4","\xdf"];e.map((function(e,t){e.words.split(" ").map((function(e){a.map((function(t){e.includes(t)&&console.log(3333)}))}))}))}(h)},g=v.a.Dragger,_={direction:0,paragraphs_result_num:3,log_id:0x560bc381229e6000,words_result_num:9,words_result:[{words:"h zu"},{words:"k\xf6nnen sie sich vorstellen ?"},{words:"siehe e ?"},{words:"darf ich mich vorstellen ?"},{words:"die er ?"},{words:"wie hei\xdfen sie ? wie hei\xdft du ?"},{words:"entre ? uralte ?"},{words:"ich hei\xdfe ."},{words:"er"}],paragraphs_result:[{words_result_idx:[0]},{words_result_idx:[1,2,3,4]},{words_result_idx:[5,6,7,8]}]},E=function(e){var t=[];return e.words_result.forEach((function(e){t.push(e.words)})),t},x=function(e){var t=new URLSearchParams;return Object.entries(e).forEach((function(e){t.append(e[0],e[1])})),t},k=0,b=0,N={};var y=function(e,t,a){N.text=e;var c=Object(n.useState)(!1),o=Object(s.a)(c,2),l=o[0],i=o[1];return k<0&&(b+=1,t(Object(m.a)({},e,Object(d.a)({},b,{words:E(_),image:"33333"}))),k+=1),r.a.createElement("div",null,r.a.createElement(g,{name:"image",beforeUpload:function(e){i(!0);var n=new FileReader;return n.readAsDataURL(e),n.onload=function(){var e=this.result,n=e.split(",");if("CHN_ENG_DE"!==a){var r={image:encodeURI(n[1]),language_type:a,paragraph:"true",probability:"false",recognize_granularity:"big",detect_direction:"true"},c=x(r);u.ocr(c).then((function(a){i(!1),b+=1,t(Object(m.a)({},N.text,Object(d.a)({},b,{words:E(a.data),image:e})))})).catch((function(e){i(!0),w.a.success("\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5")}))}else p(n[1],N,t,x)},!1},listType:"picture-card",multiple:!0,showUploadList:!1},r.a.createElement("p",{className:"ant-upload-drag-icon"},r.a.createElement(f.a,null)),r.a.createElement("p",{className:"ant-upload-text"},l?"\u4e0a\u4f20\u4e2d\uff0c\u8bf7\u7a0d\u540e...":"\u5355\u51fb\u6216\u62d6\u62fd\u4e0a\u4f20\u56fe\u7247")))},O=(a(350),a(360)),S=a(363),j=O.a.Option,C=function(e){return e.map((function(e){return r.a.createElement("p",{className:"result-one-text",key:e},e)}))},R=function(){var e=document.createRange(),t=document.getElementById("result-text");e.selectNode(t);var a=window.getSelection();a.selectAllChildren(t),console.log(a),document.execCommand("Copy")},G=[{value:"CHN_ENG",text:"\u4e2d\u82f1"},{value:"CHN_ENG_GE",text:"\u4e2d\u82f1\u5fb7"},{value:"ENG",text:"\u82f1"},{value:"JAP",text:"\u65e5"},{value:"KOR",text:"\u97e9"},{value:"FRE",text:"\u6cd5"},{value:"SPA",text:"\u897f\u73ed\u7259"},{value:"POR",text:"\u8461\u8404\u7259"},{value:"GER",text:"\u5fb7"},{value:"ITA",text:"\u610f\u5927\u5229"},{value:"RUS",text:"\u4fc4"}];var I=function(e,t,a,n){var c=r.a.createRef();return r.a.createElement("div",null,r.a.createElement("div",{className:"result-action"},r.a.createElement(O.a,{defaultValue:"\u4e2d\u82f1",className:"action-btn",onSelect:function(e){n(e)}},G.map((function(e){return r.a.createElement(j,{value:e.value,key:e.value},e.text)}))),r.a.createElement(S.a,{onClick:R,className:"action-btn"},"\u5168\u9009\u590d\u5236"),r.a.createElement(S.a,{onClick:function(){t({})},className:"action-btn"},"\u6e05\u7a7a")),r.a.createElement("div",{className:"result-box"},r.a.createElement("div",{className:"result-image"},Object.keys(e).map((function(a){return r.a.createElement("div",{key:a,className:"result-image-one"},r.a.createElement("div",{className:"result-one result-one-transparent"},C(e[a].words)),r.a.createElement("div",{className:"result-one-image"},r.a.createElement("img",{src:e[a].image})),r.a.createElement("div",{className:"result-one-delete",onClick:function(){!function(a){var n=JSON.parse(JSON.stringify(e));delete n[a],t(n)}(a)}},"X"))}))),r.a.createElement("div",{className:"resut-text",ref:c,id:"result-text"},Object.keys(e).map((function(t){return r.a.createElement("div",{key:t,className:"result-one"},C(e[t].words))})))))};a(356);var A=function(){u.auth();var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)("CH_ENG"),l=Object(s.a)(o,2),i=l[0],d=l[1];return r.a.createElement("div",null,y(a,c,i),I(a,c,i,d))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[165,1,2]]]);
//# sourceMappingURL=main.9eebce1a.chunk.js.map