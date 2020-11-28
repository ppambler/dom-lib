// 查
console.log(dom.findOne('.list'))
console.log(dom.findOne('.list',dom.findOne('.container2')))
console.log(dom.find('.list'))
console.log(dom.find('.list',dom.findOne('.container2')))
console.log(dom.parent(dom.findOne('#five')))
console.log(dom.parent(document)) // null
console.log(dom.children(dom.findOne('.container2')))
console.log(dom.children(document))
console.log(dom.siblings(dom.findOne('#five')))
console.log(dom.previous(dom.findOne('#five')))
console.log(dom.previous(dom.findOne('#four')))
console.log(dom.next(dom.findOne('#five')))
dom.travel(dom.find('.list',dom.findOne('.container1')),(item)=>{
  console.log(item)
})
dom.travel(dom.children(dom.findOne('.container2')),(item)=>{
  console.log(item) 
})
console.log(dom.index(dom.findOne('#five')))
console.log(dom.index(dom.findOne('#four')))

// 增

console.log(dom.create('<p>我是段落1</p>'))
console.dir(dom.create('<p>我是段落1</p>'))
console.log(dom.create(`<div id="div1">我是 template</div>
<div>我是 template</div>`))

dom.before(dom.create('<p>我是在列表 7 前边插入</p>'),dom.findOne('#seven'))
dom.after(dom.create('<p>我是在列表 7 后边插入</p>'),dom.findOne('#seven'))

dom.append(dom.create('<li>我是插入的列表 8</li>'),dom.findOne('.container2'))
let div = dom.create('<div></div>')
console.log(div)
dom.append(dom.create('<li>我是插入的列表 8</li>'),div)
console.log(div)

dom.wrap(dom.create('<div>box1，叫我爸爸！</div>'),dom.findOne('#box1'))

// 删

let node = dom.remove(dom.findOne('#box2'))
console.log(node)

console.log(dom.empty(dom.findOne('#box3')))

// 改

console.log(dom.attribute(dom.findOne('#link'),'href'))
console.log(dom.findOne('#link').getAttribute('href'))
console.log(dom.attribute(dom.findOne('#link'),'href','https://baidu.com'))

console.log(dom.findOne('#link').style)
console.log(dom.style(dom.findOne('#link'),'color')) // 'orangered'
console.log(dom.style(dom.findOne('#link'),'color','yellowgreen'))
var testStyle = {
  color: 'yellowgreen',
  fontSize: '40px'
}
dom.style(dom.findOne('#link1'),testStyle)
console.log(window.getComputedStyle(dom.findOne('#link2')).backgroundColor)
// window.getComputedStyle(dom.findOne('#link2')).backgroundColor = 'red'
dom.style(dom.findOne('#link2'),'backgroundColor','yellowgreen')

console.log(dom.class.has(dom.findOne('#box6'),'box6-test'))
console.log(dom.class.has(dom.findOne('#box6'),'box666'))

dom.class.add(dom.findOne('#box6'),'box6-test')
dom.class.remove(dom.findOne('#box6'),'box6-test')

console.log(dom.text(dom.findOne('#box7')))
// console.log(dom.text(dom.findOne('#box7'),'hi')) // 清空所有节点，把「'hi'」作为 #box7 的文本内容
console.log(dom.text(dom.findOne('#box8'),'我是 box8，这是 JS 动态生成的内容'))

console.log(dom.html(dom.findOne('#box9')))
console.log(dom.html(dom.findOne('#box10'),'<div>我是 JS 动态生成的 HTML 内容</div>'))

var callback1 = ()=>{
  alert('click button1，你再点一下 button1，这弹框是不会再出现的！')
  dom.off(dom.findOne('#btn1'),'click',callback1)
}
dom.on(dom.findOne('#btn1'),'click',callback1)
