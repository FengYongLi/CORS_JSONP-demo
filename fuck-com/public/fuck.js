// 这里是 JSONP 的跨域代码

// Promise 方式封装 JSONP
function jsonp (url){
  return new Promise((resolve, reject)=>{
    // 生成一个随机数
    // 随机数作为这个函数的名字
    const random = 'fuckJSONPCallbackName' + Math.random()
    window[random] = (data)=>{
      resolve(data)
    }
    const script = document.createElement('script')
    // 通过查询字符串把随机生成的函数名给服务器
    script.src = `${url}?callback=${random}` // 这里就不要填入路径了，可以通过 jsonp 函数参数传入
    // 监听 JS 的 onload 事件 加载完删除 script 标签
    script.onload = ()=>{
      script.remove()
    }
    script.onerror = ()=>{
      reject()
    }
    document.body.appendChild(script)
  })
}
// 使用代码
jsonp('http://qq.com:8888/friends.js')
  .then((data) =>{
    console.log(data)
  })


// 这里是 CORS 的跨域代码
//const request = new XMLHttpRequest()
//request.open('GET', 'http://qq.com:8888/friends.json')
//request.onreadystatechange = ()=>{
  //if(request.readyState === 4 && request.status === 200){
    //console.log(request.response)
  //}
//}
//request.send()