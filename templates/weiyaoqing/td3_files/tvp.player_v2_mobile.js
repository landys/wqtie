;(function(undefined){if(String.prototype.trim===undefined)
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'')}
if(Array.prototype.reduce===undefined)
Array.prototype.reduce=function(fun){if(this===void 0||this===null)throw new TypeError()
var t=Object(this),len=t.length>>>0,k=0,accumulator
if(typeof fun!='function')throw new TypeError()
if(len==0&&arguments.length==1)throw new TypeError()
if(arguments.length>=2)
accumulator=arguments[1]
else
do{if(k in t){accumulator=t[k++]
break}
if(++k>=len)throw new TypeError()}while(true)
while(k<len){if(k in t)accumulator=fun.call(undefined,accumulator,t[k],k,t)
k++}
return accumulator}
if(!Array.prototype.forEach){Array.prototype.forEach=function forEach(callback,thisArg){var T,k;if(this==null){throw new TypeError("this is null or not defined");}
var O=Object(this);var len=O.length>>>0;if({}.toString.call(callback)!=="[object Function]"){throw new TypeError(callback+" is not a function");}
if(thisArg){T=thisArg;}
k=0;while(k<len){var kValue;if(Object.prototype.hasOwnProperty.call(O,k)){kValue=O[k];callback.call(T,kValue,k,O);}
k++;}};}})()
var Zepto=(function(){var undefined,key,$,classList,emptyArray=[],slice=emptyArray.slice,filter=emptyArray.filter,document=window.document,elementDisplay={},classCache={},getComputedStyle=document.defaultView?document.defaultView.getComputedStyle:document.documentElement.currentStyle,cssNumber={'column-count':1,'columns':1,'font-weight':1,'line-height':1,'opacity':1,'z-index':1,'zoom':1},fragmentRE=/^\s*<(\w+|!)[^>]*>/,tagExpanderRE=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rootNodeRE=/^(?:body|html)$/i,methodAttributes=['val','css','html','text','data','width','height','offset'],adjacencyOperators=['after','prepend','before','append'],table=document.createElement('table'),tableRow=document.createElement('tr'),containers={'tr':document.createElement('tbody'),'tbody':table,'thead':table,'tfoot':table,'td':tableRow,'th':tableRow,'*':document.createElement('div')},readyRE=/complete|loaded|interactive/,classSelectorRE=/^\.([\w-]+)$/,idSelectorRE=/^#([\w-]*)$/,tagSelectorRE=/^[\w-]+$/,class2type={},toString=class2type.toString,zepto={},camelize,uniq,tempParent=document.createElement('div')
zepto.matches=function(element,selector){if(!element||element.nodeType!==1)return false
var matchesSelector=element.webkitMatchesSelector||element.mozMatchesSelector||element.oMatchesSelector||element.matchesSelector
if(matchesSelector)return matchesSelector.call(element,selector)
var match,parent=element.parentNode,temp=!parent
if(temp)(parent=tempParent).appendChild(element)
match=~zepto.qsa(parent,selector).indexOf(element)
temp&&tempParent.removeChild(element)
return match}
function type(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"}
function isFunction(value){return type(value)=="function"}
function isWindow(obj){return obj!=null&&obj==obj.window}
function isDocument(obj){return obj!=null&&obj.nodeType==obj.DOCUMENT_NODE}
function isObject(obj){return type(obj)=="object"}
function isPlainObject(obj){return isObject(obj)&&!isWindow(obj)&&obj.__proto__==Object.prototype}
function isArray(value){return value instanceof Array}
function likeArray(obj){return typeof obj.length=='number'}
function compact(array){return filter.call(array,function(item){return item!=null})}
function flatten(array){return array.length>0?$.fn.concat.apply([],array):array}
camelize=function(str){return str.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():''})}
function dasherize(str){return str.replace(/::/g,'/').replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').replace(/([a-z\d])([A-Z])/g,'$1_$2').replace(/_/g,'-').toLowerCase()}
uniq=function(array){return filter.call(array,function(item,idx){return array.indexOf(item)==idx})}
function classRE(name){return name in classCache?classCache[name]:(classCache[name]=new RegExp('(^|\\s)'+name+'(\\s|$)'))}
function maybeAddPx(name,value){return(typeof value=="number"&&!cssNumber[dasherize(name)])?value+"px":value}
function defaultDisplay(nodeName){var element,display
if(!elementDisplay[nodeName]){element=document.createElement(nodeName)
document.body.appendChild(element)
display=getComputedStyle(element,'').getPropertyValue("display")
element.parentNode.removeChild(element)
display=="none"&&(display="block")
elementDisplay[nodeName]=display}
return elementDisplay[nodeName]}
function children(element){return'children'in element?slice.call(element.children):$.map(element.childNodes,function(node){if(node.nodeType==1)return node})}
zepto.fragment=function(html,name,properties){if(html.replace)html=html.replace(tagExpanderRE,"<$1></$2>")
if(name===undefined)name=fragmentRE.test(html)&&RegExp.$1
if(!(name in containers))name='*'
var nodes,dom,container=containers[name]
container.innerHTML=''+html
dom=$.each(slice.call(container.childNodes),function(){container.removeChild(this)})
if(isPlainObject(properties)){nodes=$(dom)
$.each(properties,function(key,value){if(methodAttributes.indexOf(key)>-1)nodes[key](value)
else nodes.attr(key,value)})}
return dom}
zepto.Z=function(dom,selector){dom=dom||[]
dom.__proto__=$.fn
dom.selector=selector||''
return dom}
zepto.isZ=function(object){return object instanceof zepto.Z}
zepto.init=function(selector,context){if(!selector)return zepto.Z()
else if(isFunction(selector))return $(document).ready(selector)
else if(zepto.isZ(selector))return selector
else{var dom
if(isArray(selector))dom=compact(selector)
else if(isObject(selector))
dom=[isPlainObject(selector)?$.extend({},selector):selector],selector=null
else if(fragmentRE.test(selector))
dom=zepto.fragment(selector.trim(),RegExp.$1,context),selector=null
else if(context!==undefined)return $(context).find(selector)
else dom=zepto.qsa(document,selector)
return zepto.Z(dom,selector)}}
$=function(selector,context){return zepto.init(selector,context)}
function extend(target,source,deep){for(key in source)
if(deep&&(isPlainObject(source[key])||isArray(source[key]))){if(isPlainObject(source[key])&&!isPlainObject(target[key]))
target[key]={}
if(isArray(source[key])&&!isArray(target[key]))
target[key]=[]
extend(target[key],source[key],deep)}
else if(source[key]!==undefined)target[key]=source[key]}
$.extend=function(target){var deep,args=slice.call(arguments,1)
if(typeof target=='boolean'){deep=target
target=args.shift()}
args.forEach(function(arg){extend(target,arg,deep)})
return target}
zepto.qsa=function(element,selector){var found;return(isDocument(element)&&idSelectorRE.test(selector))?((found=element.getElementById(RegExp.$1))?[found]:[]):(element.nodeType!==1&&element.nodeType!==9)?[]:slice.call(classSelectorRE.test(selector)?element.getElementsByClassName(RegExp.$1):tagSelectorRE.test(selector)?element.getElementsByTagName(selector):element.querySelectorAll(selector))}
function filtered(nodes,selector){return selector===undefined?$(nodes):$(nodes).filter(selector)}
$.contains=function(parent,node){return parent!==node&&parent.contains(node)}
function funcArg(context,arg,idx,payload){return isFunction(arg)?arg.call(context,idx,payload):arg}
function setAttribute(node,name,value){value==null?node.removeAttribute(name):node.setAttribute(name,value)}
function className(node,value){var klass=node.className,svg=klass&&klass.baseVal!==undefined
if(value===undefined)return svg?klass.baseVal:klass
svg?(klass.baseVal=value):(node.className=value)}
function deserializeValue(value){var num
try{return value?value=="true"||(value=="false"?false:value=="null"?null:!isNaN(num=Number(value))?num:/^[\[\{]/.test(value)?$.parseJSON(value):value):value}catch(e){return value}}
$.type=type
$.isFunction=isFunction
$.isWindow=isWindow
$.isArray=isArray
$.isPlainObject=isPlainObject
$.isEmptyObject=function(obj){var name
for(name in obj)return false
return true}
$.inArray=function(elem,array,i){return emptyArray.indexOf.call(array,elem,i)}
$.camelCase=camelize
$.trim=function(str){return str.trim()}
$.uuid=0
$.support={}
$.expr={}
$.map=function(elements,callback){var value,values=[],i,key
if(likeArray(elements))
for(i=0;i<elements.length;i++){value=callback(elements[i],i)
if(value!=null)values.push(value)}
else
for(key in elements){value=callback(elements[key],key)
if(value!=null)values.push(value)}
return flatten(values)}
$.each=function(elements,callback){var i,key
if(likeArray(elements)){for(i=0;i<elements.length;i++)
if(callback.call(elements[i],i,elements[i])===false)return elements}else{for(key in elements)
if(callback.call(elements[key],key,elements[key])===false)return elements}
return elements}
$.grep=function(elements,callback){return filter.call(elements,callback)}
if(window.JSON)$.parseJSON=JSON.parse
$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()})
$.fn={forEach:emptyArray.forEach,reduce:emptyArray.reduce,push:emptyArray.push,sort:emptyArray.sort,indexOf:emptyArray.indexOf,concat:emptyArray.concat,map:function(fn){return $($.map(this,function(el,i){return fn.call(el,i,el)}))},slice:function(){return $(slice.apply(this,arguments))},ready:function(callback){if(readyRE.test(document.readyState))callback($)
else document.addEventListener('DOMContentLoaded',function(){callback($)},false)
return this},get:function(idx){return idx===undefined?slice.call(this):this[idx>=0?idx:idx+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){if(this.parentNode!=null)
this.parentNode.removeChild(this)})},each:function(callback){emptyArray.every.call(this,function(el,idx){return callback.call(el,idx,el)!==false})
return this},filter:function(selector){if(isFunction(selector))return this.not(this.not(selector))
return $(filter.call(this,function(element){return zepto.matches(element,selector)}))},add:function(selector,context){return $(uniq(this.concat($(selector,context))))},is:function(selector){return this.length>0&&zepto.matches(this[0],selector)},not:function(selector){var nodes=[]
if(isFunction(selector)&&selector.call!==undefined)
this.each(function(idx){if(!selector.call(this,idx))nodes.push(this)})
else{var excludes=typeof selector=='string'?this.filter(selector):(likeArray(selector)&&isFunction(selector.item))?slice.call(selector):$(selector)
this.forEach(function(el){if(excludes.indexOf(el)<0)nodes.push(el)})}
return $(nodes)},has:function(selector){return this.filter(function(){return isObject(selector)?$.contains(this,selector):$(this).find(selector).size()})},eq:function(idx){return idx===-1?this.slice(idx):this.slice(idx,+idx+1)},first:function(){var el=this[0]
return el&&!isObject(el)?el:$(el)},last:function(){var el=this[this.length-1]
return el&&!isObject(el)?el:$(el)},find:function(selector){var result,$this=this
if(typeof selector=='object')
result=$(selector).filter(function(){var node=this
return emptyArray.some.call($this,function(parent){return $.contains(parent,node)})})
else if(this.length==1)result=$(zepto.qsa(this[0],selector))
else result=this.map(function(){return zepto.qsa(this,selector)})
return result},closest:function(selector,context){var node=this[0],collection=false
if(typeof selector=='object')collection=$(selector)
while(node&&!(collection?collection.indexOf(node)>=0:zepto.matches(node,selector)))
node=node!==context&&!isDocument(node)&&node.parentNode
return $(node)},parents:function(selector){var ancestors=[],nodes=this
while(nodes.length>0)
nodes=$.map(nodes,function(node){if((node=node.parentNode)&&!isDocument(node)&&ancestors.indexOf(node)<0){ancestors.push(node)
return node}})
return filtered(ancestors,selector)},parent:function(selector){return filtered(uniq(this.pluck('parentNode')),selector)},children:function(selector){return filtered(this.map(function(){return children(this)}),selector)},contents:function(){return this.map(function(){return slice.call(this.childNodes)})},siblings:function(selector){return filtered(this.map(function(i,el){return filter.call(children(el.parentNode),function(child){return child!==el})}),selector)},empty:function(){return this.each(function(){this.innerHTML=''})},pluck:function(property){return $.map(this,function(el){return el[property]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null)
if(getComputedStyle(this,'').getPropertyValue("display")=="none")
this.style.display=defaultDisplay(this.nodeName)})},replaceWith:function(newContent){return this.before(newContent).remove()},wrap:function(structure){var func=isFunction(structure)
if(this[0]&&!func)
var dom=$(structure).get(0),clone=dom.parentNode||this.length>1
return this.each(function(index){$(this).wrapAll(func?structure.call(this,index):clone?dom.cloneNode(true):dom)})},wrapAll:function(structure){if(this[0]){$(this[0]).before(structure=$(structure))
var children
while((children=structure.children()).length)structure=children.first()
$(structure).append(this)}
return this},wrapInner:function(structure){var func=isFunction(structure)
return this.each(function(index){var self=$(this),contents=self.contents(),dom=func?structure.call(this,index):structure
contents.length?contents.wrapAll(dom):self.append(dom)})},unwrap:function(){this.parent().each(function(){$(this).replaceWith($(this).children())})
return this},clone:function(){return this.map(function(){return this.cloneNode(true)})},hide:function(){return this.css("display","none")},toggle:function(setting){return this.each(function(){var el=$(this);(setting===undefined?el.css("display")=="none":setting)?el.show():el.hide()})},prev:function(selector){return $(this.pluck('previousElementSibling')).filter(selector||'*')},next:function(selector){return $(this.pluck('nextElementSibling')).filter(selector||'*')},html:function(html){return html===undefined?(this.length>0?this[0].innerHTML:null):this.each(function(idx){var originHtml=this.innerHTML
$(this).empty().append(funcArg(this,html,idx,originHtml))})},text:function(text){return text===undefined?(this.length>0?this[0].textContent:null):this.each(function(){this.textContent=text})},attr:function(name,value){var result
return(typeof name=='string'&&value===undefined)?(this.length==0||this[0].nodeType!==1?undefined:(name=='value'&&this[0].nodeName=='INPUT')?this.val():(!(result=this[0].getAttribute(name))&&name in this[0])?this[0][name]:result):this.each(function(idx){if(this.nodeType!==1)return
if(isObject(name))for(key in name)setAttribute(this,key,name[key])
else setAttribute(this,name,funcArg(this,value,idx,this.getAttribute(name)))})},removeAttr:function(name){return this.each(function(){this.nodeType===1&&setAttribute(this,name)})},prop:function(name,value){return(value===undefined)?(this[0]&&this[0][name]):this.each(function(idx){this[name]=funcArg(this,value,idx,this[name])})},data:function(name,value){var data=this.attr('data-'+dasherize(name),value)
return data!==null?deserializeValue(data):undefined},val:function(value){return(value===undefined)?(this[0]&&(this[0].multiple?$(this[0]).find('option').filter(function(o){return this.selected}).pluck('value'):this[0].value)):this.each(function(idx){this.value=funcArg(this,value,idx,this.value)})},offset:function(coordinates){if(coordinates)return this.each(function(index){var $this=$(this),coords=funcArg(this,coordinates,index,$this.offset()),parentOffset=$this.offsetParent().offset(),props={top:coords.top-parentOffset.top,left:coords.left-parentOffset.left}
if($this.css('position')=='static')props['position']='relative'
$this.css(props)})
if(this.length==0)return null
var obj=this[0].getBoundingClientRect()
return{left:obj.left+window.pageXOffset,top:obj.top+window.pageYOffset,width:Math.round(obj.width),height:Math.round(obj.height)}},css:function(property,value){if(arguments.length<2&&typeof property=='string')
return this[0]&&(this[0].style[camelize(property)]||getComputedStyle(this[0],'').getPropertyValue(property))
var css=''
if(type(property)=='string'){if(!value&&value!==0)
this.each(function(){this.style.removeProperty(dasherize(property))})
else
css=dasherize(property)+":"+maybeAddPx(property,value)}else{for(key in property)
if(!property[key]&&property[key]!==0)
this.each(function(){this.style.removeProperty(dasherize(key))})
else
css+=dasherize(key)+':'+maybeAddPx(key,property[key])+';'}
return this.each(function(){this.style.cssText+=';'+css})},index:function(element){return element?this.indexOf($(element)[0]):this.parent().children().indexOf(this[0])},hasClass:function(name){return emptyArray.some.call(this,function(el){return this.test(className(el))},classRE(name))},addClass:function(name){return this.each(function(idx){classList=[]
var cls=className(this),newName=funcArg(this,name,idx,cls)
newName.split(/\s+/g).forEach(function(klass){if(!$(this).hasClass(klass))classList.push(klass)},this)
classList.length&&className(this,cls+(cls?" ":"")+classList.join(" "))})},removeClass:function(name){return this.each(function(idx){if(name===undefined)return className(this,'')
classList=className(this)
funcArg(this,name,idx,classList).split(/\s+/g).forEach(function(klass){classList=classList.replace(classRE(klass)," ")})
className(this,classList.trim())})},toggleClass:function(name,when){return this.each(function(idx){var $this=$(this),names=funcArg(this,name,idx,className(this))
names.split(/\s+/g).forEach(function(klass){(when===undefined?!$this.hasClass(klass):when)?$this.addClass(klass):$this.removeClass(klass)})})},scrollTop:function(){if(!this.length)return
return('scrollTop'in this[0])?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return
var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rootNodeRE.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset()
offset.top-=parseFloat($(elem).css('margin-top'))||0
offset.left-=parseFloat($(elem).css('margin-left'))||0
parentOffset.top+=parseFloat($(offsetParent[0]).css('border-top-width'))||0
parentOffset.left+=parseFloat($(offsetParent[0]).css('border-left-width'))||0
return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var parent=this.offsetParent||document.body
while(parent&&!rootNodeRE.test(parent.nodeName)&&$(parent).css("position")=="static")
parent=parent.offsetParent
return parent})}}
$.fn.detach=$.fn.remove;['width','height'].forEach(function(dimension){$.fn[dimension]=function(value){var offset,el=this[0],Dimension=dimension.replace(/./,function(m){return m[0].toUpperCase()})
if(value===undefined)return isWindow(el)?el['inner'+Dimension]:isDocument(el)?el.documentElement['offset'+Dimension]:(offset=this.offset())&&offset[dimension]
else return this.each(function(idx){el=$(this)
el.css(dimension,funcArg(this,value,idx,el[dimension]()))})}})
function traverseNode(node,fun){fun(node)
for(var key in node.childNodes)traverseNode(node.childNodes[key],fun)}
adjacencyOperators.forEach(function(operator,operatorIndex){var inside=operatorIndex%2
$.fn[operator]=function(){var argType,nodes=$.map(arguments,function(arg){argType=type(arg)
return argType=="object"||argType=="array"||arg==null?arg:zepto.fragment(arg)}),parent,copyByClone=this.length>1
if(nodes.length<1)return this
return this.each(function(_,target){parent=inside?target:target.parentNode
target=operatorIndex==0?target.nextSibling:operatorIndex==1?target.firstChild:operatorIndex==2?target:null
nodes.forEach(function(node){if(copyByClone)node=node.cloneNode(true)
else if(!parent)return $(node).remove()
traverseNode(parent.insertBefore(node,target),function(el){if(el.nodeName!=null&&el.nodeName.toUpperCase()==='SCRIPT'&&(!el.type||el.type==='text/javascript')&&!el.src)
window['eval'].call(window,el.innerHTML)})})})}
$.fn[inside?operator+'To':'insert'+(operatorIndex?'Before':'After')]=function(html){$(html)[operator](this)
return this}})
zepto.Z.prototype=$.fn
zepto.uniq=uniq
zepto.deserializeValue=deserializeValue
$.zepto=zepto
return $;})();;window.Zepto=Zepto;;(function($){function detect(ua){var os=this.os={},browser=this.browser={},webkit=ua.match(/WebKit\/([\d.]+)/),android=ua.match(/(Android)\s+([\d.]+)/),ipad=ua.match(/(iPad).*OS\s([\d_]+)/),iphone=!ipad&&ua.match(/(iPhone\sOS)\s([\d_]+)/),webos=ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),touchpad=webos&&ua.match(/TouchPad/),kindle=ua.match(/Kindle\/([\d.]+)/),silk=ua.match(/Silk\/([\d._]+)/),blackberry=ua.match(/(BlackBerry).*Version\/([\d.]+)/),bb10=ua.match(/(BB10).*Version\/([\d.]+)/),rimtabletos=ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),playbook=ua.match(/PlayBook/),chrome=ua.match(/Chrome\/([\d.]+)/)||ua.match(/CriOS\/([\d.]+)/),firefox=ua.match(/Firefox\/([\d.]+)/)
if(browser.webkit=!!webkit)browser.version=webkit[1]
if(android)os.android=true,os.version=android[2]
if(iphone)os.ios=os.iphone=true,os.version=iphone[2].replace(/_/g,'.')
if(ipad)os.ios=os.ipad=true,os.version=ipad[2].replace(/_/g,'.')
if(webos)os.webos=true,os.version=webos[2]
if(touchpad)os.touchpad=true
if(blackberry)os.blackberry=true,os.version=blackberry[2]
if(bb10)os.bb10=true,os.version=bb10[2]
if(rimtabletos)os.rimtabletos=true,os.version=rimtabletos[2]
if(playbook)browser.playbook=true
if(kindle)os.kindle=true,os.version=kindle[1]
if(silk)browser.silk=true,browser.version=silk[1]
if(!silk&&os.android&&ua.match(/Kindle Fire/))browser.silk=true
if(chrome)browser.chrome=true,browser.version=chrome[1]
if(firefox)browser.firefox=true,browser.version=firefox[1]
os.tablet=!!(ipad||playbook||(android&&!ua.match(/Mobile/))||(firefox&&ua.match(/Tablet/)))
os.phone=!!(!os.tablet&&(android||iphone||webos||blackberry||bb10||(chrome&&ua.match(/Android/))||(chrome&&ua.match(/CriOS\/([\d.]+)/))||(firefox&&ua.match(/Mobile/))))}
detect.call($,navigator.userAgent)
$.__detect=detect})(Zepto);(function($){var $$=$.zepto.qsa,handlers={},_zid=1,specialEvents={},hover={mouseenter:'mouseover',mouseleave:'mouseout'}
specialEvents.click=specialEvents.mousedown=specialEvents.mouseup=specialEvents.mousemove='MouseEvents'
function zid(element){return element._zid||(element._zid=_zid++)}
function findHandlers(element,event,fn,selector){event=parse(event)
if(event.ns)var matcher=matcherFor(event.ns)
return(handlers[zid(element)]||[]).filter(function(handler){return handler&&(!event.e||handler.e==event.e)&&(!event.ns||matcher.test(handler.ns))&&(!fn||zid(handler.fn)===zid(fn))&&(!selector||handler.sel==selector)})}
function parse(event){var parts=(''+event).split('.')
return{e:parts[0],ns:parts.slice(1).sort().join(' ')}}
function matcherFor(ns){return new RegExp('(?:^| )'+ns.replace(' ',' .* ?')+'(?: |$)')}
function eachEvent(events,fn,iterator){if($.type(events)!="string")$.each(events,iterator)
else events.split(/\s/).forEach(function(type){iterator(type,fn)})}
function eventCapture(handler,captureSetting){return handler.del&&(handler.e=='focus'||handler.e=='blur')||!!captureSetting}
function realEvent(type){return hover[type]||type}
function add(element,events,fn,selector,getDelegate,capture){var id=zid(element),set=(handlers[id]||(handlers[id]=[]))
eachEvent(events,fn,function(event,fn){var handler=parse(event)
handler.fn=fn
handler.sel=selector
if(handler.e in hover)fn=function(e){var related=e.relatedTarget
if(!related||(related!==this&&!$.contains(this,related)))
return handler.fn.apply(this,arguments)}
handler.del=getDelegate&&getDelegate(fn,event)
var callback=handler.del||fn
handler.proxy=function(e){var result=callback.apply(element,[e].concat(e.data))
if(result===false)e.preventDefault(),e.stopPropagation()
return result}
handler.i=set.length
set.push(handler)
if(element.addEventListener)
element.addEventListener(realEvent(handler.e),handler.proxy,eventCapture(handler,capture))
else
element.attachEvent("on"+realEvent(handler.e),handler.proxy,eventCapture(handler,capture))})}
function remove(element,events,fn,selector,capture){var id=zid(element)
eachEvent(events||'',fn,function(event,fn){findHandlers(element,event,fn,selector).forEach(function(handler){delete handlers[id][handler.i];if(element.removeEventListener)
element.removeEventListener(realEvent(handler.e),handler.proxy,eventCapture(handler,capture))
else
element.detachEvent("on"+realEvent(handler.e),handler.proxy,eventCapture(handler,capture))})})}
$.event={add:add,remove:remove}
$.proxy=function(fn,context){if($.isFunction(fn)){var proxyFn=function(){return fn.apply(context,arguments)}
proxyFn._zid=zid(fn)
return proxyFn}else if(typeof context=='string'){return $.proxy(fn[context],fn)}else{throw new TypeError("expected function")}}
$.fn.bind=function(event,callback){return this.each(function(){add(this,event,callback)})}
$.fn.unbind=function(event,callback){return this.each(function(){remove(this,event,callback)})}
$.fn.one=function(event,callback){return this.each(function(i,element){add(this,event,callback,null,function(fn,type){return function(){var result=fn.apply(element,arguments)
remove(element,type,fn)
return result}})})}
var returnTrue=function(){return true},returnFalse=function(){return false},ignoreProperties=/^([A-Z]|layer[XY]$)/,eventMethods={preventDefault:'isDefaultPrevented',stopImmediatePropagation:'isImmediatePropagationStopped',stopPropagation:'isPropagationStopped'}
function createProxy(event){var key,proxy={originalEvent:event}
for(key in event)
if(!ignoreProperties.test(key)&&event[key]!==undefined)proxy[key]=event[key]
$.each(eventMethods,function(name,predicate){proxy[name]=function(){this[predicate]=returnTrue
return event[name].apply(event,arguments)}
proxy[predicate]=returnFalse})
return proxy}
function fix(event){if(!('defaultPrevented'in event)){event.defaultPrevented=false
var prevent=event.preventDefault
event.preventDefault=function(){this.defaultPrevented=true
prevent.call(this)}}}
$.fn.delegate=function(selector,event,callback){return this.each(function(i,element){add(element,event,callback,selector,function(fn){return function(e){var evt,match=$(e.target).closest(selector,element).get(0)
if(match){evt=$.extend(createProxy(e),{currentTarget:match,liveFired:element})
return fn.apply(match,[evt].concat([].slice.call(arguments,1)))}}})})}
$.fn.undelegate=function(selector,event,callback){return this.each(function(){remove(this,event,callback,selector)})}
$.fn.live=function(event,callback){$(document.body).delegate(this.selector,event,callback)
return this}
$.fn.die=function(event,callback){$(document.body).undelegate(this.selector,event,callback)
return this}
$.fn.on=function(event,selector,callback){return!selector||$.isFunction(selector)?this.bind(event,selector||callback):this.delegate(selector,event,callback)}
$.fn.off=function(event,selector,callback){return!selector||$.isFunction(selector)?this.unbind(event,selector||callback):this.undelegate(selector,event,callback)}
$.fn.trigger=function(event,data){if(typeof event=='string'||$.isPlainObject(event))event=$.Event(event)
fix(event)
event.data=data
return this.each(function(){if('dispatchEvent'in this)this.dispatchEvent(event)})}
$.fn.triggerHandler=function(event,data){var e,result
this.each(function(i,element){e=createProxy(typeof event=='string'?$.Event(event):event)
e.data=data
e.target=element
$.each(findHandlers(element,event.type||event),function(i,handler){result=handler.proxy(e)
if(e.isImmediatePropagationStopped())return false})})
return result};('focusin focusout load resize scroll unload click dblclick '+'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+'change select keydown keypress keyup error').split(' ').forEach(function(event){$.fn[event]=function(callback){return callback?this.bind(event,callback):this.trigger(event)}});['focus','blur'].forEach(function(name){$.fn[name]=function(callback){if(callback)this.bind(name,callback)
else this.each(function(){try{this[name]()}
catch(e){}})
return this}})
$.Event=function(type,props){if(typeof type!='string')props=type,type=props.type
var event=document.createEvent(specialEvents[type]||'Events'),bubbles=true
if(props)for(var name in props)(name=='bubbles')?(bubbles=!!props[name]):(event[name]=props[name])
event.initEvent(type,bubbles,true,null,null,null,null,null,null,null,null,null,null,null,null)
event.isDefaultPrevented=function(){return this.defaultPrevented}
return event}})(Zepto);;(function($){var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType='application/json',htmlType='text/html',blankRE=/^\s*$/;function triggerAndReturn(context,eventName,data){var event=$.Event(eventName);$(context).trigger(event,data);return!event.defaultPrevented;}
function triggerGlobal(settings,context,eventName,data){if(settings.global)return triggerAndReturn(context||document,eventName,data);}
$.active=0;function ajaxStart(settings){if(settings.global&&$.active++===0)triggerGlobal(settings,null,'ajaxStart');}
function ajaxStop(settings){if(settings.global&&!(--$.active))triggerGlobal(settings,null,'ajaxStop');}
function ajaxBeforeSend(xhr,settings){var context=settings.context;if(settings.beforeSend.call(context,xhr,settings)===false||triggerGlobal(settings,context,'ajaxBeforeSend',[xhr,settings])===false)
return false;triggerGlobal(settings,context,'ajaxSend',[xhr,settings]);}
function ajaxSuccess(data,xhr,settings){var context=settings.context,status='success';settings.success.call(context,data,status,xhr);triggerGlobal(settings,context,'ajaxSuccess',[xhr,settings,data]);ajaxComplete(status,xhr,settings);}
function ajaxError(error,type,xhr,settings){var context=settings.context;settings.error.call(context,xhr,type,error);triggerGlobal(settings,context,'ajaxError',[xhr,settings,error]);ajaxComplete(type,xhr,settings);}
function ajaxComplete(status,xhr,settings){var context=settings.context;settings.complete.call(context,xhr,status);triggerGlobal(settings,context,'ajaxComplete',[xhr,settings]);ajaxStop(settings);}
function empty(){};$.ajaxJSONP=function(options){if(!('type'in options))return $.ajax(options);var callbackName='jsonp'+(++jsonpID+"_"+new Date().getTime()+"_"+parseInt(Math.random()*1000)),script=document.createElement('script'),cleanup=function(){clearTimeout(abortTimeout)
$(script).remove()
delete window[callbackName]},abort=function(type){cleanup()
if(!type||type=='timeout')window[callbackName]=empty
ajaxError(null,type||'abort',xhr,options)},xhr={abort:abort},abortTimeout;if(ajaxBeforeSend(xhr,options)===false){abort('abort');return false;}
window[callbackName]=function(data){cleanup();ajaxSuccess(data,xhr,options);}
script.onerror=function(){abort('error')}
script.src=options.url.replace(/=\?/,'='+callbackName);$('head').append(script);if(options.timeout>0)abortTimeout=setTimeout(function(){abort('timeout');},options.timeout);return xhr;}
$.ajaxSettings={type:'GET',beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:true,xhr:function(){return new window.XMLHttpRequest()},accepts:{script:'text/javascript, application/javascript',json:jsonType,xml:'application/xml, text/xml',html:htmlType,text:'text/plain'},crossDomain:false,timeout:0,processData:true,cache:true};function mimeToDataType(mime){if(mime)mime=mime.split(';',2)[0];return mime&&(mime==htmlType?'html':mime==jsonType?'json':scriptTypeRE.test(mime)?'script':xmlTypeRE.test(mime)&&'xml')||'text';}
function appendQuery(url,query){return(url+'&'+query).replace(/[&?]{1,2}/,'?');}
function serializeData(options){if(options.processData&&options.data&&$.type(options.data)!="string")
options.data=$.param(options.data,options.traditional);if(options.data&&(!options.type||options.type.toUpperCase()=='GET'))
options.url=appendQuery(options.url,options.data);}
$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings){if(settings[key]===undefined)settings[key]=$.ajaxSettings[key];}
ajaxStart(settings);if(!settings.crossDomain)settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host;if(!settings.url)settings.url=window.location.toString();serializeData(settings);if(settings.cache===false)settings.url=appendQuery(settings.url,'_='+Date.now());var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=='jsonp'||hasPlaceholder){if(!hasPlaceholder)settings.url=appendQuery(settings.url,'callback=?');return $.ajaxJSONP(settings);}
var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),abortTimeout;if(!settings.crossDomain)baseHeaders['X-Requested-With']='XMLHttpRequest';if(mime){baseHeaders['Accept']=mime;if(mime.indexOf(',')>-1)mime=mime.split(',',2)[0];xhr.overrideMimeType&&(xhr.overrideMimeType(mime));}
if(settings.contentType||(settings.contentType!==false&&settings.data&&settings.type.toUpperCase()!='GET'))
baseHeaders['Content-Type']=(settings.contentType||'application/x-www-form-urlencoded')
settings.headers=$.extend(baseHeaders,settings.headers||{})
xhr.withCredentials=true;xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty;clearTimeout(abortTimeout);var result,error=false;if((xhr.status>=200&&xhr.status<300)||xhr.status==304||(xhr.status==0&&protocol=='file:')){dataType=dataType||mimeToDataType(xhr.getResponseHeader('content-type'))
result=xhr.responseText;try{if(dataType=='script')(1,eval)(result);else if(dataType=='xml')result=xhr.responseXML;else if(dataType=='json')result=blankRE.test(result)?null:$.parseJSON(result);}catch(e){error=e}
if(error)ajaxError(error,'parsererror',xhr,settings);else ajaxSuccess(result,xhr,settings);}else{ajaxError(null,xhr.status?'error':'abort',xhr,settings);}}}
var async='async'in settings?settings.async:true;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);if(ajaxBeforeSend(xhr,settings)===false){xhr.abort();return false;}
if(settings.timeout>0)abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty;xhr.abort();ajaxError(null,'timeout',xhr,settings);},settings.timeout);xhr.send(settings.data?settings.data:null);return xhr;}
function parseArguments(url,data,success,dataType){var hasData=!$.isFunction(data);return{url:url,data:hasData?data:undefined,success:!hasData?data:$.isFunction(success)?success:undefined,dataType:hasData?dataType||success:success};}
$.get=function(url,data,success,dataType){return $.ajax(parseArguments.apply(null,arguments));}
$.post=function(url,data,success,dataType){var options=parseArguments.apply(null,arguments);options.type='POST';return $.ajax(options);}
$.getJSON=function(url,data,success){var options=parseArguments.apply(null,arguments);options.dataType='json';return $.ajax(options);}
$.fn.load=function(url,data,success){if(!this.length)return this;var self=this,parts=url.split(/\s/),selector,options=parseArguments(url,data,success),callback=options.success;if(parts.length>1)options.url=parts[0],selector=parts[1];options.success=function(response){self.html(selector?$('<div>').html(response.replace(rscript,"")).find(selector):response);callback&&(callback.apply(self,arguments));}
$.ajax(options);return this;}
var escape=encodeURIComponent;function serialize(params,obj,traditional,scope){var type,array=$.isArray(obj);$.each(obj,function(key,value){type=$.type(value);if(scope)key=traditional?scope:scope+'['+(array?'':key)+']';if(!scope&&array)params.add(value.name,value.value);else if(type=="array"||(!traditional&&type=="object"))
serialize(params,value,traditional,key);else params.add(key,value);})}
$.param=function(obj,traditional){var params=[];params.add=function(k,v){this.push(escape(k)+'='+escape(v))}
serialize(params,obj,traditional);return params.join('&').replace(/%20/g,'+');}})(Zepto);(function($,undefined){var prefix='',eventPrefix,endEventName,endAnimationName,vendors={Webkit:'webkit',Moz:'',O:'o',ms:'MS'},document=window.document,testEl=document.createElement('div'),supportedTransforms=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,transform,transitionProperty,transitionDuration,transitionTiming,animationName,animationDuration,animationTiming,cssReset={}
function dasherize(str){return downcase(str.replace(/([a-z])([A-Z])/,'$1-$2'))}
function downcase(str){return str.toLowerCase()}
function normalizeEvent(name){return eventPrefix?eventPrefix+name:downcase(name)}
$.each(vendors,function(vendor,event){if(testEl.style[vendor+'TransitionProperty']!==undefined){prefix='-'+downcase(vendor)+'-'
eventPrefix=event
return false}})
transform=prefix+'transform'
cssReset[transitionProperty=prefix+'transition-property']=cssReset[transitionDuration=prefix+'transition-duration']=cssReset[transitionTiming=prefix+'transition-timing-function']=cssReset[animationName=prefix+'animation-name']=cssReset[animationDuration=prefix+'animation-duration']=cssReset[animationTiming=prefix+'animation-timing-function']=''
$.fx={off:(eventPrefix===undefined&&testEl.style.transitionProperty===undefined),speeds:{_default:400,fast:200,slow:600},cssPrefix:prefix,transitionEnd:normalizeEvent('TransitionEnd'),animationEnd:normalizeEvent('AnimationEnd')}
$.fn.animate=function(properties,duration,ease,callback){if($.isPlainObject(duration))
ease=duration.easing,callback=duration.complete,duration=duration.duration
if(duration)duration=(typeof duration=='number'?duration:($.fx.speeds[duration]||$.fx.speeds._default))/1000
return this.anim(properties,duration,ease,callback)}
$.fn.anim=function(properties,duration,ease,callback){var key,cssValues={},cssProperties,transforms='',that=this,wrappedCallback,endEvent=$.fx.transitionEnd
if(duration===undefined)duration=0.4
if($.fx.off)duration=0
if(typeof properties=='string'){cssValues[animationName]=properties
cssValues[animationDuration]=duration+'s'
cssValues[animationTiming]=(ease||'linear')
endEvent=$.fx.animationEnd}else{cssProperties=[]
for(key in properties)
if(supportedTransforms.test(key))transforms+=key+'('+properties[key]+') '
else cssValues[key]=properties[key],cssProperties.push(dasherize(key))
if(transforms)cssValues[transform]=transforms,cssProperties.push(transform)
if(duration>0&&typeof properties==='object'){cssValues[transitionProperty]=cssProperties.join(', ')
cssValues[transitionDuration]=duration+'s'
cssValues[transitionTiming]=(ease||'linear')}}
wrappedCallback=function(event){if(typeof event!=='undefined'){if(event.target!==event.currentTarget)return
$(event.target).unbind(endEvent,wrappedCallback)}
$(this).css(cssReset)
callback&&callback.call(this)}
if(duration>0)this.bind(endEvent,wrappedCallback)
this.size()&&this.get(0).clientLeft
this.css(cssValues)
if(duration<=0)setTimeout(function(){that.each(function(){wrappedCallback.call(this)})},0)
return this}
testEl=null})(Zepto)
var tvp=window.tvp||{};var TenVideoPlayer=window.tvp;tvp.lastModify="20130923135545";tvp.ver="v2";tvp.lastChangedBy="$Author: popotang $";tvp.path={base:"http://qzs.qq.com/tencentvideo_v1/js/tvp/",hls_video_cgi:"http://vv.video.qq.com/gethls?otype=json&format=2",html5_video_cgi:"http://vv.video.qq.com/geturl?otype=json"}
tvp.log=function(msg){if(window.console){window.console.log("["+(tvp.log.debugid++)+"] "+msg);}}
tvp.debug=function(msg){if(tvp.log.isDebug===-1){tvp.log.isDebug=tvp.$.getUrlParam("debug")=="true"?1:0;}
if(!!tvp.log.isDebug){tvp.log(msg);}}
tvp.log.isDebug=-1;tvp.log.debugid=1;(function(){var Deferred,PENDING,REJECTED,RESOLVED,VERSION,after,execute,flatten,has,installInto,isArguments,wrap,_when,__slice=[].slice;VERSION='1.3.2',PENDING="pending",RESOLVED="resolved",REJECTED="rejected";has=function(obj,prop){return obj!=null?obj.hasOwnProperty(prop):void 0;};function isArray(value){return value instanceof Array}
isArguments=function(obj){return has(obj,'length')&&has(obj,'callee');};flatten=function(array){if(isArguments(array)){return flatten(Array.prototype.slice.call(array));}
if(!isArray(array)){return[array];}
return array.reduce(function(memo,value){if(isArray(value)){return memo.concat(flatten(value));}
memo.push(value);return memo;},[]);};after=function(times,func){if(times<=0){return func();}
return function(){if(--times<1){return func.apply(this,arguments);}};};wrap=function(func,wrapper){return function(){var args;args=[func].concat(Array.prototype.slice.call(arguments,0));return wrapper.apply(this,args);};};execute=function(callbacks,args,context){var callback,_i,_len,_ref,_results;_ref=flatten(callbacks);_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){callback=_ref[_i];_results.push(callback.call.apply(callback,[context].concat(__slice.call(args))));}
return _results;};Deferred=function(){var alwaysCallbacks,close,closingArguments,doneCallbacks,failCallbacks,state;state=PENDING;doneCallbacks=[];failCallbacks=[];alwaysCallbacks=[];closingArguments={};this.promise=function(candidate){var pipe,storeCallbacks;candidate=candidate||{};candidate.state=function(){return state;};storeCallbacks=function(shouldExecuteImmediately,holder){return function(){if(state===PENDING){holder.push.apply(holder,flatten(arguments));}
if(shouldExecuteImmediately()){execute(arguments,closingArguments);}
return candidate;};};candidate.done=storeCallbacks((function(){return state===RESOLVED;}),doneCallbacks);candidate.fail=storeCallbacks((function(){return state===REJECTED;}),failCallbacks);candidate.always=storeCallbacks((function(){return state!==PENDING;}),alwaysCallbacks);pipe=function(doneFilter,failFilter){var deferred,filter;deferred=new Deferred();filter=function(target,source,filter){if(filter){return target(function(){return source(filter.apply(null,flatten(arguments)));});}else{return target(function(){return source.apply(null,flatten(arguments));});}};filter(candidate.done,deferred.resolve,doneFilter);filter(candidate.fail,deferred.reject,failFilter);return deferred;};candidate.pipe=pipe;candidate.then=pipe;return candidate;};this.promise(this);close=function(finalState,callbacks,context){return function(){if(state===PENDING){state=finalState;closingArguments=arguments;execute([callbacks,alwaysCallbacks],closingArguments,context);}
return this;};};this.resolve=close(RESOLVED,doneCallbacks);this.reject=close(REJECTED,failCallbacks);this.resolveWith=function(){var args,context;context=arguments[0],args=2<=arguments.length?__slice.call(arguments,1):[];return close(RESOLVED,doneCallbacks,context).apply(null,args);};this.rejectWith=function(){var args,context;context=arguments[0],args=2<=arguments.length?__slice.call(arguments,1):[];return close(REJECTED,failCallbacks,context).apply(null,args);};return this;};_when=function(){var def,defs,finish,trigger,_i,_j,_len,_len1;trigger=new Deferred();defs=flatten(arguments);finish=after(defs.length,trigger.resolve);for(_i=0,_len=defs.length;_i<_len;_i++){def=defs[_i];def.done(finish);}
for(_j=0,_len1=defs.length;_j<_len1;_j++){def=defs[_j];def.fail(function(){return trigger.reject();});}
return trigger.promise();};installInto=function(fw){fw.Deferred=function(){return new Deferred();};fw.ajax=wrap(fw.ajax,function(ajax,options){var createWrapper,def;if(options==null){options={};}
def=new Deferred();createWrapper=function(wrapped,finisher){return wrap(wrapped,function(){var args,func;func=arguments[0],args=2<=arguments.length?__slice.call(arguments,1):[];if(func){func.apply(null,args);}
return finisher.apply(null,args);});};options.success=createWrapper(options.success,def.resolve);options.error=createWrapper(options.error,def.reject);ajax(options);return def.promise();});return fw.when=_when;};if(typeof exports!=='undefined'){exports.Deferred=function(){return new Deferred();};exports.when=_when;exports.installInto=installInto;}else{this.Deferred=function(){return new Deferred();};this.Deferred.when=_when;this.Deferred.installInto=installInto;this.DeferedClass=Deferred;}}).call(tvp);tvp.Deferred.installInto(typeof Zepto!="undefined"?Zepto:jq);;(function($){$.param=function(obj,prefix){var str=[];for(var p in obj){if($.isFunction(obj[p]))
continue;var k=prefix?prefix+"["+p+"]":p,v=obj[p];str.push($.isPlainObject(v)?$.param(v,k):(k)+"="+encodeURIComponent(v));}
return str.join("&");};})(Zepto);(function($,undefined){var document=window.document,docElem=document.documentElement,origShow=$.fn.show,origHide=$.fn.hide,origToggle=$.fn.toggle
function anim(el,speed,opacity,scale,callback){if(typeof speed=='function'&&!callback)callback=speed,speed=undefined
var props={opacity:opacity}
if(scale){props.scale=scale
el.css($.fx.cssPrefix+'transform-origin','0 0')}
return el.animate(props,speed,null,callback)}
function hide(el,speed,scale,callback){return anim(el,speed,0,scale,function(){origHide.call($(this))
callback&&callback.call(this)})}
$.fn.show=function(speed,callback){origShow.call(this)
if(speed===undefined)speed=0
else this.css('opacity',0)
return anim(this,speed,1,'1,1',callback)}
$.fn.hide=function(speed,callback){if(speed===undefined)return origHide.call(this)
else return hide(this,speed,'0,0',callback)}
$.fn.toggle=function(speed,callback){if(speed===undefined||typeof speed=='boolean')
return origToggle.call(this,speed)
else return this.each(function(){var el=$(this)
el[el.css('display')=='none'?'show':'hide'](speed,callback)})}
$.fn.fadeTo=function(speed,opacity,callback){return anim(this,speed,opacity,null,callback)}
$.fn.fadeIn=function(speed,callback){var target=this.css('opacity')
if(target>0)this.css('opacity',0)
else target=1
return origShow.call(this).fadeTo(speed,target,callback)}
$.fn.fadeOut=function(speed,callback){return hide(this,speed,null,callback)}
$.fn.fadeToggle=function(speed,callback){return this.each(function(){var el=$(this)
el[(el.css('opacity')==0||el.css('display')=='none')?'fadeIn':'fadeOut'](speed,callback)})}})(Zepto);tvp.$={};(function(arr){for(var i=0,len=arr.length;i<len;i++){if(typeof window[arr[i]]=="function"){tvp.$=window[arr[i]];break;}}})(["Zepto","jQuery","jq"]);;(function($){function detect(ua){var MQQBrowser=ua.match(/MQQBrowser\/(\d+\.\d+)/i),WeChat=ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/),MacOS=ua.match(/Mac\sOS\sX\s(\d+\.\d+)/),WinOS=ua.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),MiuiBrowser=ua.match(/MiuiBrowser\/(\d+\.\d+)/i),UC=ua.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||ua.match(/\sUC\s/),IEMobile=ua.match(/IEMobile(\/|\s+)(\d+\.\d+)/),ipod=ua.match(/(ipod\sOS)\s([\d_]+)/);$.browser=$.browser||{},$.os=$.os||{};if(window.ActiveXObject){var vie=6;(window.XMLHttpRequest||(ua.indexOf('MSIE 7.0')>-1))&&(vie=7);(window.XDomainRequest||(ua.indexOf('Trident/4.0')>-1))&&(vie=8);(ua.indexOf('Trident/5.0')>-1)&&(vie=9);(ua.indexOf('Trident/6.0')>-1)&&(vie=10);$.browser.ie=true,$.browser.version=vie;}else if(ua.indexOf('Trident/7.0')>-1){$.browser.ie=true,$.browser.version=11;}
if(ipod)os.ios=os.ipod=true,os.version=ipod[2].replace(/_/g,'.');if(WinOS)this.os.windows=true,this.os.version=WinOS[2];if(MacOS)this.os.Mac=true,this.os.version=MacOS[1];if(ua.indexOf("lepad_hls")>0)this.os.LePad=true;if(MQQBrowser)this.browser.MQQ=true,this.browser.version=MQQBrowser[1];if(WeChat)this.browser.WeChat=true,this.browser.version=WeChat[1];if(MiuiBrowser)this.browser.MIUI=true,this.browser.version=MiuiBrowser[1];if(UC)this.browser.UC=true,this.browser.version=UC[1]||NaN;if(IEMobile)this.browser.IEMobile=true,this.browser.version=IEMobile[2];if(this.os.windows){if(typeof navigator.platform!="undefined"&&navigator.platform.toLowerCase()=="win64"){this.os.win64=true;}else{this.os.win64=false;}}
this.os.getNumVersion=function(){return parseFloat($.os.version,"10");}
this.os.hasTouch=this.os.getNumVersion()<5?false:('ontouchstart'in window);$.extend($.browser,{getNumVersion:function(){return parseFloat($.browser.version,"10");},isFFCanOcx:function(){if(!!$.browser.firefox&&$.browser.getNumVersion()>=3.0){return true;}
return false;},isCanOcx:function(){return(!!$.os.windows&&(!!$.browser.ie||$.browser.isFFCanOcx()||!!$.browser.webkit));},isNotIESupport:function(){return(!!$.os.windows&&(!!$.browser.webkit||$.browser.isFFCanOcx()));}});$.userAgent={};$.extend($.userAgent,$.os);$.extend($.userAgent,$.browser);$.userAgent.browserVersion=$.browser.version;$.userAgent.osVersion=$.os.version;delete $.userAgent.version;}
detect.call($,navigator.userAgent);})(tvp.$);;(function($){var extFun={getByID:function(id){return document.getElementById(id);},noop:function(){},isString:function(val){return $.type(val)==="string";},isUndefined:function(val){return $.type(val)==="undefined";},now:function(){return new Date().getTime();},getISOTimeFormat:function(){var date=new Date(),y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate(),h=date.getHours(),M=date.getMinutes(),s=date.getSeconds();return[[y,m<10?"0"+m:m,d<10?"0"+d:d].join("-"),[h<10?"0"+h:h,M<10?"0"+M:M,s<10?"0"+s:s].join(":")].join(" ");},formatSeconds:function(seconds){seconds=parseInt(seconds);var M=parseInt(seconds/60),h=M>=60?parseInt(M/60):0,s=seconds%60,str="";M>=60&&(M=M%60);if(h>0){str+=h<10?"0"+h:h;str+=":";}
str+=M<10?"0"+M:M;str+=":"
str+=s<10?"0"+s:s;return str;},getHost:function(){var _host=window.location.hostname||window.location.host,_sarray=location.host.split(".");if(_sarray.length>1){_host=_sarray.slice(_sarray.length-2).join(".");}
return _host;},getUrlParam:function(p,u){u=u||document.location.toString();var reg=new RegExp("(^|&|\\\\?)"+p+"=([^&]*)(&|$|#)"),r=null;if(r=u.match(reg))return r[2];return"";},filterXSS:function(str){if(!$.isString(str))return str;return str.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;");},createGUID:function(len){len=len||32;var guid="";for(var i=1;i<=len;i++){var n=Math.floor(Math.random()*16.0).toString(16);guid+=n;}
return guid;},formatSize:function(size){var s=""+size;if(s.indexOf("%")>0)return s;if(s.indexOf("px")>0)return s;if(/^\d+$/.test(s))return s+"px";return s;},isTrue:function(v){return eval(tvp.$.filterXSS(v));}}
$.extend($,extFun);})(tvp.$);;(function($){$.cookie={set:function(name,value,domain,path,hour){if(hour){var today=new Date();var expire=new Date();expire.setTime(today.getTime()+3600000*hour);}
document.cookie=name+"="+value+"; "+(hour?("expires="+expire.toGMTString()+"; "):"")+(path?("path="+path+"; "):"path=/; ")+(domain?("domain="+domain+";"):("domain="+window.location.host+";"));return true;},get:function(name){var r=new RegExp("(?:^|;+|\\s+)"+name+"=([^;]*)");var m=document.cookie.match(r);return(!m?"":m[1]);},del:function(name,domain,path){var exp=new Date();exp.setTime(exp.getTime()-1);document.cookie=name+"=; expires="+exp.toGMTString()+";"+(path?("path="+path+"; "):"path=/; ")+(domain?("domain="+domain+";"):("domain="+window.location.host+";"));}}})(tvp.$);(function($){if(($.browser.WeChat&&$.browser.getNumVersion()<5)||($.os.windows&&$.browser.ie)||$.isFunction($.fn["tap"])){return;}
var touch={},touchTimeout,tapTimeout,swipeTimeout,longTapDelay=750,longTapTimeout;function parentIfText(node){return'tagName'in node?node:node.parentNode;}
function swipeDirection(x1,x2,y1,y2){var xDelta=Math.abs(x1-x2),yDelta=Math.abs(y1-y2);return xDelta>=yDelta?(x1-x2>0?'Left':'Right'):(y1-y2>0?'Up':'Down');}
function longTap(){longTapTimeout=null;if(touch.last){touch.el.trigger('longTap');touch={};}}
function cancelLongTap(){if(longTapTimeout)clearTimeout(longTapTimeout);longTapTimeout=null;}
function cancelAll(){if(touchTimeout)clearTimeout(touchTimeout);if(tapTimeout)clearTimeout(tapTimeout);if(swipeTimeout)clearTimeout(swipeTimeout);if(longTapTimeout)clearTimeout(longTapTimeout);touchTimeout=tapTimeout=swipeTimeout=longTapTimeout=null,touch={};}
$(document).ready(function(){var now,delta;$(document.body).bind('touchstart',function(e){now=Date.now(),delta=now-(touch.last||now);touch.el=$(parentIfText(e.touches[0].target));touchTimeout&&clearTimeout(touchTimeout);touch.x1=e.touches[0].pageX;touch.y1=e.touches[0].pageY;if(delta>0&&delta<=250)touch.isDoubleTap=true;touch.last=now;longTapTimeout=setTimeout(longTap,longTapDelay);}).bind('touchmove',function(e){cancelLongTap();touch.x2=e.touches[0].pageX;touch.y2=e.touches[0].pageY;}).bind('touchend',function(e){cancelLongTap();if((touch.x2&&Math.abs(touch.x1-touch.x2)>30)||(touch.y2&&Math.abs(touch.y1-touch.y2)>30))
swipeTimeout=setTimeout(function(){if(!touch.el||typeof touch.el.trigger!="function"){return;}
touch.el.trigger('swipe');touch.el.trigger('swipe'+(swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)));touch={}},0);else if('last'in touch)
tapTimeout=setTimeout(function(){if(!touch.el||typeof touch.el.trigger!="function"){return;}
var event=$.Event('tap');event.cancelTouch=cancelAll;touch.el.trigger(event);if(touch.isDoubleTap){touch.el.trigger('doubleTap');touch={};}
else{touchTimeout=setTimeout(function(){touchTimeout=null;if(!!touch.el)touch.el.trigger('singleTap');touch={};},250)}},0)}).bind('touchcancel',cancelAll);$(window).bind('scroll',cancelAll);});['swipe','swipeLeft','swipeRight','swipeUp','swipeDown','doubleTap','tap','singleTap','longTap'].forEach(function(m){$.fn[m]=function(callback){return this.bind(m,callback);}});})(tvp.$)
tvp=tvp||{};tvp.common={isUseHtml5:function(){var ua=navigator.userAgent,m=null;if(/ipad|ipod|iphone|lepad_hls|IEMobile/ig.test(ua)){return true;}
if(!!tvp.$.os.android){if(tvp.common.isSupportMP4()){return true;}
if(tvp.$.browser.MQQ&&tvp.$.browser.getNumVersion()>=4.2){return true;}
if(ua.indexOf("MI-ONE")!=-1||ua.indexOf("MI2")!=-1){return true;}
if(tvp.$.os.version>="4"&&(m=ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))){if(m[1]>=4.2){return true;}}
if(tvp.$.os.version>="4.1"){return true;}}
return false;},isLiveUseHTML5:function(){if(tvp.$.os.ios)return true;if(!!tvp.$.os.android){if(tvp.$.browser.MQQ&&tvp.$.browser.getNumVersion()>=4.2){return true;}}
return false;},isSupportMP4:function(){var video=document.createElement("video");if(typeof video.canPlayType=="function"){if(video.canPlayType('video/mp4; codecs="mp4v.20.8"')=="probably"){return true;}
if(video.canPlayType('video/mp4; codecs="avc1.42E01E"')=="probably"||video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')=="probably"){return true;}}
return false;},isSupportSVG:function(){if(!document.implementation||!tvp.$.isFunction(document.implementation.hasFeature)){return false;}
return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1");},isEnforceMP4:function(){var ua=navigator.userAgent,m=null;if(!!tvp.$.os.android){if(tvp.$.browser.firefox){return true;}
if(tvp.$.os.version>="4.0"&&tvp.$.browser.MQQ&&tvp.$.browser.version<"4.0"){return true;}}
return false;},getUin:function(){if(tvp.common.getSKey()==""){return 0;}
var uin=parseInt(tvp.$.cookie.get("uin").replace(/^o0*/g,""),10);if(uin<=10000){return 0;}
return uin;},getSKey:function(){return tvp.$.cookie.get("skey");},openLogin:function(){},getVideoSnap:function(lpszVID,idx){var szPic;var uin;var hash_bucket=10000*10000;var object=lpszVID;if(lpszVID.indexOf("_")>0){var arr=lpszVID.split("_");lpszVID=arr[0];idx=parseInt(arr[1]);}
var uint_max=0x00ffffffff+1;var hash_bucket=10000*10000;var tot=0;for(var inx=0;inx<lpszVID.length;inx++){var nchar=lpszVID.charCodeAt(inx);tot=(tot*32)+tot+nchar;if(tot>=uint_max)tot=tot%uint_max;}
uin=tot%hash_bucket;if(idx==undefined)idx=0;if(idx==0){szPic=["http://vpic.video.qq.com/",uin,"/",lpszVID,"_160_90_3.jpg"].join("");}else{szPic=["http://vpic.video.qq.com/",uin,"/",lpszVID,"_","160_90_",idx,"_1.jpg"].join("");}
return szPic;}};tvp.version=(function(){var vOcx="0.0.0.0",vflash="0.0.0",actObj;function changeVerToString(nVer){if(checkVerFormatValid(nVer)){return nVer;}
if(/\d+/i.test(nVer)){var nMain=parseInt(nVer/10000/100,10);var nSub=parseInt(nVer/10000,10)-nMain*100;var nReleaseNO=parseInt(nVer,10)-(nMain*100*10000+nSub*10000);strVer=nMain+"."+nSub+"."+nReleaseNO;return strVer;}
return nVer;}
function checkVerFormatValid(version){return(/^(\d+\.){2}\d+(\.\d+)?$/.test(version));};return{getOcx:function(enableCache){if(tvp.$.isUndefined(enableCache)){enableCache=true;}
if(!!enableCache&&vOcx!="0.0.0.0"){return vOcx;}
if(!!tvp.$.browser.ie){try{actObj=new ActiveXObject(QQLive.config.PROGID_QQLIVE_INSTALLER);if(typeof actObj.getVersion!="undefined"){vOcx=actObj.GetVersionByClsid(QQLiveSetup.config.OCX_CLSID);}}catch(err){}}else if(tvp.$.browser.isNotIESupport()){var plugs=navigator.plugins,plug;if(!tvp.$.isUndefined(plugs.namedItem)){plug=plugs.namedItem("腾讯视频");}
if(!plug){for(var i=0,len=plugs.length;i<len;i++){if(plugs[i]&&plugs[i].name=="腾讯视频"||plugs[i].filename=="npQQLive.dll"){plug=plugs[i];break;}}}
if(!!plug){if(!tvp.$.isUndefined(plug.version)){vOcx=plug.version;}else{var r;var desc=plug.description;if(r=desc.match(/version:((\d+\.){3}(\d+)?)/)){vOcx=r[1];}}}}
vOcx=changeVerToString(vOcx);return vOcx;},getFlash:function(){if(vflash!="0.0.0"){return vflash;}
var swf=null,ab=null,ag=[],S="Shockwave Flash",t=navigator,q="application/x-shockwave-flash",R="SWFObjectExprInst"
if(!!tvp.$.browser.ie){try{swf=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');if(swf){ab=swf.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(exp){}}else if(!tvp.$.isUndefined(t.plugins)&&tvp.$.type(t.plugins[S])=="plugin"){ab=t.plugins[S].description;if(ab&&!(!tvp.$.isUndefined(t.mimeTypes)&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;}}
vflash=ag.join(".");return vflash;},getFlashMain:function(){return parseInt(tvp.version.getFlash().split(".")[0],10);}}})();tvp.VAL_DEFINE={AUTO:-1,TRUE:1,FALSE:0};tvp.PLAYER_DEFINE={LIVE:1,VOD:2};tvp.defaultConfig={video:null,width:600,height:450,autoplay:true,mute:false,volume:50,modId:"mod_player",playerid:"",coverId:"",typeId:0,pic:"",type:tvp.PLAYER_DEFINE.VOD,playerType:"auto",loadingSwf:"",oid:"",share:true,isHtml5AutoBuffer:false,isHtml5UseAirPlay:true,isHtml5ControlAlwaysShow:false,html5Preload:"null",html5VodUIFeature:['controlbar','tips','title','playpause','progress','timepanel','definition','fullscreen',"overlay","bigben","posterlayer","shadow"],html5LiveUIFeature:['controlbar','tips','playpause','fullscreen',"overlay","posterlayer","shadow"],html5FeatureExtJS:{},html5ForbiddenUIFeature:[],isHTML5UseUI:false,isHTML5ShowPosterOnStart:true,isHTML5ShowPosterOnEnd:false,isHTML5ShowPosterOnChange:true,isiPhoneShowPosterOnPause:true,isHtml5ShowPlayBtnOnPause:true,isHtml5UseFakeFullScreen:true,flashWmode:"window",vodFlashUrl:"",vodFlashType:"TPout",vodFlashLoadingSwf:"",vodFlashExtVars:{},vodFlashListType:2,vodFlashSkin:"",isVodFlashShowCfg:true,isVodFlashShowEnd:true,isVodFlashShowSearchBar:true,isVodFlashShowNextBtn:true,liveFlashUrl:"",liveFlashSwfType:"TencentPlayerLive",liveFlashLoadingSwf:"",isLiveFlashShowConfigBtn:true,isLiveflashShowFullBtn:true,isLiveFlashShowCfg:true,liveFlashWatermark:"",liveFlashAppType:"",liveFlashExtVars:{},ocxControlBar:"",ocxLoadingSwf:"",ocxControlHeight:60,ocxSkin:"",isOcxShowPauseBtn:false,isOcxHideControl:false,plugins:{AppDownloadBanner:false},pluginUrl:{"AppDownloadBanner":"js/plugins/app_down.js"},libpath:"http://qzs.qq.com/tencentvideo_v1/tvp/"};;(function($){var tmpl=(function(cache,$){return function(str,data){var fn=!/\s/.test(str)?cache[str]=cache[str]||tmpl(document.getElementById(str).innerHTML):function(data){var i,variable=[$],value=[[]];for(i in data){variable.push(i);value.push(data[i]);};return(new Function(variable,fn.$)).apply(data,value).join("");};fn.$=fn.$||$+".push('"+str.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join($+".push('").split("\r").join("\\'")+"');return "+$;return data?fn(data):fn;}})({},'$'+(+new Date));$.tmpl=tmpl;})(tvp.$);;(function($){if(typeof $.getScript=="undefined"){$.getScript=function(src,func){var script=document.createElement('script');script.async="async";script.src=src;if(func){script.onload=func;}
document.getElementsByTagName("head")[0].appendChild(script);}}})(tvp.$);tvp.report=(function(){var isFree=true;var reportObj=null;var urlList=[];function errorHandle(){if(urlList.length==0){isFree=true;reportObj=null;return;}
create(urlList.splice(0,1));isFree=false;}
function create(url){reportObj=document.createElement("img");reportObj.onerror=errorHandle;reportObj.src=url;}
function reportUrl(url){if(!url||!/^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(url)){return;}
if(reportObj==null){create(url);isFree=false;return;}else if(isFree){create(url);isFree=false;return;}else{urlList.push(url);}}
return function(param){if(tvp.$.isString(param)){reportUrl(param);return;}
if(tvp.$.type(param)=="object"){var r=[];for(var i in param){r.push(i+"="+encodeURIComponent(""+param[i]));}
var url="http://rcgi.video.qq.com/web_report?";reportUrl(url+r.join("&"));}}})();;(function(tvp,$){var defaultPrivData={poster:"",prefix:0,tail:0,tagStart:0,tagEnd:0,duration:"",historyStart:0,pay:0,coverId:"",title:"",isLookBack:0,tstart:0,CDNType:0,vFormat:"",LiveReTime:"",typeId:0,format:"mp4",channelExtParam:{},pid:"",rid:""};tvp.VideoInfo=function(){var _vid="",_vidlist="",_vidCnt=0,_idx=0,_origvid="",_channelId="",$me=this;var privData={};var loadServerDefer={},getFormatListDefer=null;$.extend(privData,defaultPrivData);this.data={};this.url="";this.lastQueryVid="";function getFirstVid(vid){if(vid.indexOf("|")<0)return vid;return vid.substring(0,vid.indexOf("|"));};function getRealVid(vid){if(vid.indexOf("_")<0)return vid;return vid.split("_")[0];};function getIdx(vid){if(vid.indexOf("_")<0)return 0;return parseInt(vid.split("_")[1]);};function getRealVidList(vidlist){var arr=[];var origarr=vidlist.split("|");for(var i=0;i<origarr.length;i++){arr.push(getRealVid(origarr[i]));}
return arr.join("|");};$.each(privData,function(k,v){new function(){var p=k.charAt(0).toUpperCase()+k.substr(1);$me["set"+p]=function(v){privData[k]=v;return this;}
$me["get"+p]=function(){return privData[k];}}});this.setVid=function(vid){if(!tvp.$.isString(vid)){return;}
this.clear();_origvid=vid;if(vid.indexOf("|")<0){var id=getRealVid(vid)
_vid=id;_idx=getIdx(vid);_vidlist=id;}else{var arr=vid.split("|");_vid=getRealVid(arr[0]);_idx=getIdx(arr[0]);_vidlist=getRealVidList(vid);}
_vid=$.filterXSS(_vid);_vidlist=$.filterXSS(_vidlist);return this;};this.getVid=function(){return _vid;};this.getVidList=function(){return _vidlist;}
this.getVidArray=function(){return _vidlist.split("|");}
this.getIdx=function(){return _idx;}
this.getDuration=function(){if(!privData.duration){if(!!this.data&&!!this.data.vl&&$.isArray(this.data.vl.vi)&&this.data.vl.vi.length>0&&this.data.vl.vi[0].td!=0){return this.data.vl.vi[0].td;}
return 0;}
var arrDur=privData.duration.split("|");var sec=0;for(var i=0,len=arrDur.length;i<len;i++){sec+=parseInt(arrDur[i]);}
return sec;}
this.getEndOffset=function(){return this.getDuration()-this.getTail();}
this.setChannelId=function(cnlid){if(!tvp.$.isString(cnlid)){return;}
_channelId=cnlid;return this;}
this.getChannelId=function(cnlid){return _channelId;}
this.getFullVid=function(){if(this.getIdx()==0){return getRealVid(this.getVid());}
return(getRealVid(this.getVid())+"_"+this.getIdx());};this.getTitle=function(){if(privData.title===""){if(this.data&&this.data.vl&&$.isArray(this.data.vl.vi)&&this.data.vl.vi.length>0){privData.title=this.data.vl.vi[0].ti||"";}}
return privData.title;}
this.clear=function(){_vid="",_vidlist="",_vidCnt=0,_idx=0,_channelId="",getFormatListDefer=null,loadServerDefer={};$.extend(privData,defaultPrivData);this.data={};this.url="";};this.clone=function(obj){obj.setVid(_origvid);obj.setChannelId(_channelId);for(var k in privData){var n=k.charAt(0).toUpperCase()+k.substr(1);obj["set"+n](this["get"+n]());}
$.extend(obj.data,this.data);}
this.getVideoSnap=function(){var img=[];img[0]=tvp.common.getVideoSnap(_vid,_idx);img[1]=img[0].replace("_160_90_3","_1");img[2]=img[1].replace("_1.jpg",".png");return img;};this.getMP4Url=function(v){var vid="",vidArr=this.getVidArray();if($.isString(v)){vid=v;if($.inArray(v,vidArr)<0){var d=$.Deferred();d.reject();return d;}}else if(!isNaN(v)){vid=this.getVidArray()[v>=vidArr.length?0:v];}else{vid=this.getVid()}
this.lastQueryVid=vid;this.setRid($.createGUID());var defKey=vid+"_"+this.getFormat();if($.type(loadServerDefer[defKey])=="object"&&$.isFunction(loadServerDefer[defKey].done)&&loadServerDefer[defKey].state()=="resolved"){return loadServerDefer[defKey];}
loadServerDefer[defKey]=$.Deferred();var t=this;tvp.h5Helper.loadVideoUrlByVid({vid:vid,isPay:this.getPay(),fmt:this.getFormat()}).done(function(videourl,sd){t.url=videourl;t.data=sd;if(!!loadServerDefer[defKey])loadServerDefer[defKey].resolve(videourl);}).fail(function(errcode,errcontent){if(!!loadServerDefer[defKey])loadServerDefer[defKey].reject(errcode,$.isUndefined(errcontent)?0:errcontent);});return loadServerDefer[defKey];};this.getSrtLangList=function(){if($.type(this.data.sfl)=="object"&&$.isArray(this.data.sfl.fi)){$.each(this.data.sfl.fi,function(i,obj){obj.desc=tvp.html5lang.getSrtName(obj.id);});return this.data.sfl.fi;}
return[];};this.getSrtUrlList=function(sflobj){if($.isUndefined(sflobj)){var arr=this.getSrtLangList();if(arr.length>0){sflobj=arr[0];}else{return $.Deferred().reject(-1);}}
if($.type(sflobj)!="object"&&!isNaN(sflobj)){for(var i=0,len=this.data.sfl.fi.length;i<len;i++){if(this.data.sfl.fi[i].id==sflobj){sflobj=this.data.sfl.fi[i];break;}}
if($.type(sflobj)!="object"){return $.Deferred().reject(-2);}}
var vid=this.getVid(),defKey=vid+"_srt_"+sflobj.id;if($.type(loadServerDefer[defKey])=="object"&&$.isFunction(loadServerDefer[defKey].done)&&loadServerDefer[defKey].state()=="resolved"){return loadServerDefer[defKey];}
loadServerDefer[defKey]=$.Deferred();var t=this;tvp.h5Helper.loadSRT({"vid":vid,"sflid":sflobj.id,"pid":t.getPid()}).done(function(json){var urls=[];if($.type(json.ul)=="object"&&$.isArray(json.ul.ui)){$.each(json.ul.ui,function(i,v){urls.push([v.url,"lang="+sflobj.name].join("?"));});}
loadServerDefer[defKey].resolve(urls);}).fail(function(errcode){loadServerDefer[defKey].reject(errcode);});return loadServerDefer[defKey];}
this.getFormatList=function(){if($.type(getFormatListDefer)=="object"&&$.isFunction(getFormatListDefer.done)){return getFormatListDefer;}
getFormatListDefer=$.Deferred();var t=this,canplaylist=["mp4","msd"],getFn=function(){var filist=[];if(!$.isPlainObject(t.data.fl)||!$.isArray(t.data.fl.fi))return[];$.each(t.data.fl.fi,function(k,v){if($.inArray(v.name,canplaylist)!=-1){filist.push(v.name);}});return filist;};this.getMP4Url().done(function(){getFormatListDefer.resolve({"list":getFn()})}).fail(function(){getFormatListDefer.reject({"list":[]});});return getFormatListDefer;};this.hasHardSubtitle=function(){var format=video.getFormat();for(var i=0,len=this.data.fl.fi.length;i<len;i++){var fi=this.data.fl.fi[i];if(fi.name==format){return!!fi.sb;}}
return false;};this.hasSoftSubtitle=function(){return($.type(this.data.sfl)=="object"&&$.isArray(this.data.sfl.fi)&&this.data.sfl.fi.length>0);}};tvp.PLAYTYPE={LIVE:"1",VOD:"2"}})(tvp,tvp.$);;(function(tvp,$){tvp.BasePlayer=function(){this.modId="",this.sessionId="",this.$mod=null,this.videomod=null,this.playerid="",this.curVideo=null,this.instance=null,this.dataset={},this.eventList=["inited","play","playing","ended","allended","pause","timeupdate","getnext","error","stop","fullscreen","change","write","flashpopup","getnextenable","msg"];this.config={};this.hijackFun=["getPlayer","getCurVideo","showPlayer","hidePlayer","play","pause","getPlaytime","setPlaytime","getPlayerType","resize"];this.prototype={};(function(me){var arr=["init","addParam","write","setPlayerReady"];arr=arr.concat(me.hijackFun);for(var i=0,len=arr.length;i<len;i++){me.prototype[arr[i]]=tvp.$.noop;}})(this);this.addParam=function(k,v){this.config[k]=v;}}
tvp.BasePlayer.prototype={setCurVideo:function(videoinfo){this.curVideo=videoinfo;},getPlayer:function(){return null;},getCurVideo:function(){return this.curVideo;},getCurVid:function(){return(this.curVideo instanceof tvp.VideoInfo)?this.curVideo.getVid():"";},getCurVidList:function(){return(this.curVideo instanceof tvp.VideoInfo)?this.curVideo.getVidList():"";},init:function(config){$.extend(this.config,config);for(var i=0,len=this.eventList.length;i<len;i++){var evtName="on"+this.eventList[i];this[evtName]=$.isFunction(this.config[evtName])?this.config[evtName]:tvp.$.noop;}
this.setCurVideo(this.config.video);this.write(this.config.modId);},write:function(id){$("#"+id).html("here is player of base");},log:function(msg){if(window.console){window.console.log(msg);}},getCBEvent:function(eventName){var fn=undefined;if(this.instance&&$.isFunction(this.instance[eventName])&&this.instance[eventName]!=tvp.$.noop){fn=this.instance[eventName];}
else if($.isFunction(this[eventName])&&this[eventName]!=tvp.$.noop){fn=this[eventName];}
return fn;},callCBEvent:function(eventName){var fn=this.getCBEvent(eventName);if($.isFunction(fn)){var args=Array.prototype.slice.call(arguments,1);return fn.apply(this,args);}
return undefined;},resize:function(width,height){var playerobj=this.getPlayer();if(!playerobj)return;playerobj.style.width=$.formatSize(width);playerobj.style.height=$.formatSize(height);},showPlayer:function(){var p=this.getPlayer();if(!p)return;p.style.position="relative"
p.style.left="-200%";},hidePlayer:function(){var p=this.getPlayer();if(!p)return;p.style.position="static"
p.style.left="0px";}}})(tvp,tvp.$);;(function(tvp,$){tvp.BaseHtml5=function(){this.protectedFn={},this.h5EvtAdapter={},this.eventList=this.eventList.concat(["html5error"]),this.html5AttrList={"autobuffer":"isHtml5AutoBuffer","preload":"html5Preload","autoplay":"autoplay","x-webkit-airplay":"isHtml5UseAirPlay"};this.$videomod=null;};tvp.BaseHtml5.fn=tvp.BaseHtml5.prototype=new tvp.BasePlayer();$.extend(tvp.BaseHtml5.fn,{getPlayer:function(){return this.videoTag;},getPlayerType:function(){return"html5";},createVideoHtml:function(){this.playerid=this.config.playerid;if(!this.playerid){this.playerid="tenvideo_video_player_"+(tvp.BaseHtml5.maxId++);}
var str=['<video id="',this.playerid,'" width="100%" height="100%" '].join("");for(var p in this.html5AttrList){str+=" ";var cfgKey=this.html5AttrList[p],cfgVal="";if(cfgKey==""){cfgVal="";}else{if(!(cfgKey in this.config))continue;cfgVal=this.config[cfgKey];}
if(cfgVal===false||cfgVal=="disabled"||cfgVal===0)continue;str+=p;if(p=="autoplay"&&cfgVal==true){str+='="autoplay"'
continue;};if(cfgVal!=""){str+=['=',cfgVal].join("");}}
if(this.isUseControl){str+=" controls ";}
var poster=this.curVideo.getPoster();if($.isString(poster)&&poster.length>0&&$.inArray("posterlayer",this.config.html5VodUIFeature)==-1){str+=" poster='"+poster+"'";}
str+="></video>";return str;},write:function(modId){var el=null;if($.type(modId)=="object"&&modId.nodeType==1){el=modId;this.$mod=$(modId);this.modId=this.$mod.attr("id")||"";}else{el=tvp.$.getByID(modId);this.modId=modId,this.$mod=$("#"+modId);}
if(!el)return;var htmlBuf=this.createVideoHtml(),videoModId="mod_"+this.playerid;el.innerHTML='<div id="'+videoModId+'">'+htmlBuf+'</div>';this.videomod=$.getByID(videoModId);this.$videomod=$(this.videomod);this.$videomod.width($.formatSize(this.config.width)).height($.formatSize(this.config.height));this.videoTag=$.getByID(this.playerid);this.$video=$(this.videoTag);this.bindEventAdapt();},resize:function(width,height){this.$videomod.width($.formatSize(width)).height($.formatSize(height));},showError:function(errcode,errcontent,errMsg){var t=this;setTimeout(function(){var fn=t.getCBEvent("showError");if($.isFunction(fn)&&fn!=t.showError){fn.call(t,errcode,errcontent,errMsg);}else if($.isFunction(t.config["showError"])){t.config["showError"].call(t,errcode,errcontent,errMsg);}else{var str=tvp.html5skin.defaultError,tipsId=t.playerid+"_errtips_inner";errcontent=errcontent||"";str=str.replace("$ERROR-TIPS-INNER$",tipsId).replace("$ERROR-MSG$",(errMsg||tvp.html5lang.getErrMsg(errcode,errcontent)||"播放视频出错")).replace("$ERROR-DETAIL$",!!errcontent?("错误码:"+errcode+"("+errcontent+")"):"");var $videomod=$(t.videomod),$tips=$(str).appendTo($videomod).show();$videomod.html("");$tips.appendTo($videomod);}},250);this.callCBEvent("onerror",errcode,errcontent);},isUseH5UIFeature:function(fName){return $.inArray(fName,this.config.html5VodUIFeature)>=0;},isForbiddenH5UIFeature:function(fName){return $.inArray(fName,this.config.html5ForbiddenUIFeature)>=0;},callProtectFn:function(fnName){if($.isFunction(this.protectedFn[fnName])){this.protectedFn[fnName].call(this);}},bindEventAdapt:function(){var evts=["-empty","-abort","-loadstart","-can-play","-can-play-through","-loaded-data","-loaded-metadata","-abort","-error","-pause","-waiting","-stalled","-suspend","-play","-volume-change","-playing","-seeked","-seeking","-duration-change","-progress","-rate-change","-timeupdate","-ended"];var t=this;$.each(evts,function(i,k){var evtName="on"+$.camelCase(k),fn=t.h5EvtAdapter[evtName];if($.isFunction(fn)){t.$video.on(k.replace(/-/g,""),function(e){var fn=t.h5EvtAdapter[evtName];$.isFunction(fn)&&(fn.call(t,this,e));});}});}});tvp.BaseHtml5.maxId=0;})(tvp,tvp.$);;(function(tvp,$){var globalCfg={isHLS:false,isPay:false,vid:"",fmt:"mp4",platform:11001};function getMp4Key(){if($.os.iphone||$.os.ipod)return"v3010";if($.os.ipad)return"v4010";if($.os.android){if($.os.tablet||screen.width>=600){return"v6010";}
return"v5010"}
if($.browser.IEMobile){return"v7010";}
return"v1010";}
function getKeyFormat(cfg,fi){for(var i=0,len=fi.length;i<len;i++){if(fi[i].name==cfg.fmt){return fi[i].id;}}
for(var i=0,len=fi.length;i<len;i++){if(fi[i].name=="msd"){return fi[i].id;}}
for(var i=0,len=fi.length;i<len;i++){if(fi[i].name=="mp4"){return fi[i].id;}}
return-1;}
tvp.h5Helper={loadVideoUrlByVid:function(cfg){var s={},infoData={},defer=$.Deferred();$.extend($.extend(s,globalCfg),cfg);$.ajax({url:"http://vv.video.qq.com/getinfo?callback=?&"+$.param({"vids":s.vid,"platform":s.platform,"charge":s.isPay?1:0,"otype":"json","defaultfmt":s.fmt,"sb":1,"_rnd":new Date().valueOf()}),dataType:"jsonp"}).done(function(infojson){if(!infojson||!infojson.s){defer.reject(50)
return;}
if(infojson.s!="o"){defer.reject(infojson.em||50);return;}
if(!infojson.vl||!infojson.vl.vi||!$.isArray(infojson.vl.vi)||infojson.vl.cnt==0){defer.reject(68)
return;}
var vi=infojson.vl.vi[0];if(vi.fst!=5||!$.isPlainObject(vi.ul)||!$.isArray(vi.ul.ui)||vi.ul.ui.length==0){defer.reject(62);return;}
if(vi.st!=2){if(vi.st!=8){defer.reject(62);return;}
defer.reject(83,vi.ch);}
var ui=vi.ul.ui[0];infoData["br"]=vi.br;infoData["path"]=ui.url;infoData["fn"]=vi.fn;infoData["fiid"]=getKeyFormat(s,infojson.fl.fi);infoData["vt"]=ui.vt;$.ajax({url:"http://vv.video.qq.com/getkey?callback=?&"+$.param({"otype":"json","vid":s.vid,"format":infoData.fiid,"filename":infoData.fn,"platform":s.platform,"vt":infoData.vt,"charge":s.isPay?1:0,"_rnd":new Date().valueOf()}),dataType:"jsonp"}).done(function(keyjson){if(!keyjson||!keyjson.s){defer.reject(50);return;}
if(keyjson.s!="o"){defer.reject(keyjson.em||50);return;}
var videourl=[],charge=-2;videourl=infoData["path"]+infoData["fn"]+"?vkey="+keyjson.key+"&br="+infoData["br"]+"&platform=2&fmt="+s.fmt+"&level="+keyjson.level+"&sdtfrom="+getMp4Key();if($.isString(keyjson.sha)&&keyjson.sha.length>0){videourl+="&sha="+keyjson.sha;}
defer.resolve(videourl,{"vl":infojson.vl,"fl":infojson.fl,"sfl":infojson.sfl,"preview":infojson.preview});}).fail(function(){defer.reject(500,2);})}).fail(function(){defer.reject(500,1);});return defer;},loadHDVideoUrlByVid:function(cfg){cfg.fmt="mp4";tvp.h5Helper.loadVideoUrlByVid(cfg);},load3GVideoUrl:function(cfg){cfg.fmt="msd";tvp.h5Helper.loadVideoUrlByVid(cfg);},loadSRT:function(cfg){var s={},infoData={},defer=$.Deferred();$.extend($.extend(s,globalCfg),cfg);$.ajax({url:"http://vv.video.qq.com/getsurl?"+$.param({"vid":s.vid,"format":s.sflid,"platform":s.platform,"pid":s.pid,"otype":"json","_rnd":new Date().valueOf()}),dataType:"jsonp"}).done(function(json){if($.type(json)!="object"){defer.reject(500);return;}
if(json.s!="o"){defer.reject(isNaN(json.em)?500:json.em,json.msg||"");return;}
defer.resolve(json);}).fail(function(){defer.reject(500);});return defer;}}})(tvp,tvp.$);;(function(tvp,$){var _isInited=false,curVid="";function Html5TinyPlayer(vWidth,vHeight){var h5EvtAdapter={};$me=this;this.videoTag=null,this.$video=null,this.config.width=tvp.$.filterXSS(vWidth),this.config.height=tvp.$.filterXSS(vHeight),this.protectedFn={},this.isUseControl=true,$.extend(this.h5EvtAdapter,{"onEnded":function(){this.onended();var nextVid="",vidArr=this.curVideo.getVidList().split("|"),vidIndexOf=$.inArray(curVid,vidArr);if(vidIndexOf<vidArr.length-1){nextVid=vidArr[vidIndexOf+1];}
if(nextVid!=""){this.play(nextVid);return;}
this.callCBEvent("onallended");this.$video.trigger("tvp:player:allended");if(this.config.isHTML5ShowPosterOnEnd){this.setPoster();}
var nextVideoInfo=this.callCBEvent("ongetnext",curVid,this.curVideo);if(!!nextVideoInfo&&nextVideoInfo instanceof tvp.VideoInfo){this.play(nextVideoInfo);}},"onError":function(ts,e){var errContent=-1;if(!!e.target&&e.target.error){errContent=e.target.error.code;}
if(errContent!=4){return;}
this.showError(0,errContent);},"onPlaying":function(){this.callCBEvent("onplaying",curVid,this.curVideo);}});};Html5TinyPlayer.fn=Html5TinyPlayer.prototype=new tvp.BaseHtml5();$.extend(Html5TinyPlayer.prototype,{registerPlugins:function(){var t=this,authorityPluginsList=["monitor"];$.each(authorityPluginsList,function(i,v){try{var evtName="build"+v;if($.isFunction(t[evtName])){t[evtName](t);}}catch(err){tvp.debug("[registerPlugins]:"+err.message);}});},write:function(modId){tvp.BaseHtml5.prototype.write.call(this,modId);this.registerPlugins();this.callProtectFn("onwrite");this.play(this.curVideo,this.config.autoplay);}});$.extend(Html5TinyPlayer.prototype,{pause:function(){this.videoTag.pause();},getCurVid:function(){if(curVid=="")return(this.curVideo instanceof tvp.VideoInfo)?this.curVideo.getVid():"";return curVid;},play:function(v,isAutoPlay){var t=this,isVidChange=false;if($.isUndefined(isAutoPlay))isAutoPlay=true;if($.isUndefined(v)){t.videoTag.pause();t.videoTag.load();t.videoTag.play();return;}
if(v instanceof tvp.VideoInfo){isVidChange=(v.getVid()!=curVid&&curVid!="");t.setCurVideo(v);if(isVidChange){t.callCBEvent("onchange",t.curVideo.getFullVid());this.$video.trigger("tvp:player:videochange");if($.os.iphone){t.videoTag.pause();t.videoTag.play();}}
v.setPid($.createGUID());curVid=t.curVideo.getFullVid();}
if(t.config.isHTML5ShowPosterOnChange){t.setPoster();}
t.isGetingInfo=true;t.videoTag.pause();t.$video.trigger("tvp:video:ajaxstart",v instanceof tvp.VideoInfo?v.getVid():v);t.curVideo.getMP4Url(v).done(function(videourl){t.isGetingInfo=false;t.$video.trigger("tvp:video:ajaxsuc",videourl);t.videoTag.src=videourl;t.$video.trigger("tvp:video:src");if(!_isInited){_isInited=true;t.callCBEvent("oninited");}
t.callCBEvent("onplay",t.curVideo.lastQueryVid,t.curVideo);if(isAutoPlay){t.videoTag.pause();t.videoTag.load();t.videoTag.play();}}).fail(function(errcode,errcontent){t.isGetingInfo=false;if(!_isInited){_isInited=true;t.callCBEvent("oninited");}
t.$video.trigger("tvp:video:ajaxerror");t.$video.trigger("tvp:video:error",errcode,errcontent);t.showError(errcode,errcontent);}).always(function(){curVid=t.curVideo.lastQueryVid;});},seek:function(time){if(isNaN(time))return;time=Math.min(time,this.getDuration()-5),time=Math.max(time,0);var t=this,seekTimer=null;if(seekTimer){clearTimeout(seekTimer);seekTimer=null;}
var seeks=this.videoTag.seekable;if(seeks.length==1&&time<seeks.end(0)){this.seekTo(time);}else{seekTimer=setTimeout(function(){t.seek(time);},100);}},seekTo:function(time){var t=this;try{this.videoTag.currentTime=time;this.videoTag.paused&&(this.videoTag.play());}catch(e){this.$video.one("canplay",function(){t.videoTag.currentTime=time;t.videoTag.paused&&(t.videoTag.play());});}},getCurTime:function(){return this.videoTag.currentTime;},getPlaytime:function(){return this.getCurTime();},setPlaytime:function(time){this.seek(time);},checkIsPlayingLoop:function(times){times=times||0;var t=this;if(!!this.playinglooptimer)clearTimeout(this.playinglooptimer);if(this.videoTag.currentTime===0&&times<=30){this.videoTag.load();this.videoTag.play();this.playinglooptimer=setTimeout(function(){t.checkIsPlayingLoop(++times);},1000);}},setPoster:function(){var poster=this.curVideo.getPoster();if($.isString(poster)&&poster.length>0){this.videoTag.poster=poster}else{this.hidePoster();}},hidePoster:function(){this.videoTag.removeAttribute("poster");},getDuration:function(){var dur=this.curVideo.getDuration();if(!isNaN(dur)&&dur>0){return dur}
return this.videoTag.duration;}});tvp.Html5Tiny=Html5TinyPlayer;})(tvp,tvp.$);;(function(tvp,$){var _isInited=false;function Html5LiveTiny(vWidth,vHeight){this.config.width=tvp.$.filterXSS(vWidth),this.config.height=tvp.$.filterXSS(vHeight),this.videoTag=null,this.$video=null,this.protectedFn={},this.isUseControl=true;$.extend(this.h5EvtAdapter,{"onError":function(ts,e){var errContent=-1;if(!!e.target&&e.target.error){errContent=e.target.error.code;}
this.callCBEvent("onhtml5error",0,errContent);}});}
Html5LiveTiny.fn=Html5LiveTiny.prototype=new tvp.BaseHtml5();$.extend(Html5LiveTiny.fn,{write:function(id){tvp.BaseHtml5.prototype.write.call(this,id);this.callProtectFn("onwrite");this.play(this.curVideo,this.config.autoplay);},play:function(video,isAutoPlay){if(!this.videoTag){throw new Error("未找到视频播放器对象，请确认<video>标签是否存在");}
if(!video instanceof tvp.VideoInfo){throw new Error("传入的对象不是tvp.VideoInfo的实例");}
if($.isUndefined(isAutoPlay))isAutoPlay=true;this.setCurVideo(video);var cnlId=video.getChannelId();var guid=tvp.$.createGUID();var new_url="http://zb.v.qq.com:1863/?progid="+cnlId+"&ostype=ios"+"&rid="+encodeURIComponent(guid);this.videoTag.src=new_url;this.$video.trigger("tvp:video:src");if(!_isInited){_isInited=true;t.callCBEvent("oninited");}
this.videoTag.pause();if(isAutoPlay){this.videoTag.load();this.videoTag.play();}
this.callCBEvent("onchange",this.curVideo.getChannelId());}});tvp.Html5LiveTiny=Html5LiveTiny;tvp.Html5LiveTiny.maxId=0;})(tvp,tvp.$);;(function(tvp,$){$.extend(tvp.BaseHtml5.fn,{enterFullScreen:function(){var t=this,playerMod=this.$mod[0],times=0;if(playerMod.webkitRequestFullScreen){playerMod.webkitRequestFullScreen();return;}
if(this.videoTag.webkitSupportsFullscreen){if(this.videoTag.readyState>=1){this.videoTag.webkitEnterFullscreen();}else{if(++times>=30)return;setTimeout(function(){t.enterFullScreen()},200);}}}});})(tvp,tvp.$);(function(tvp,$){$.extend(tvp.Html5Tiny.fn,{swtichDefinition:function(format){if(this.curVideo.getFormat()==format)return;this.pause();var curTime=this.getCurTime(),t=this,timer=null;this.curVideo.setFormat(format);this.$video.one("canplay canplaythrough",function(e){if(!t.isDefinitionSwitching){return;}
setTimeout(function(){t.seek(curTime)},500);timer=setInterval(function(){if(t.videoTag.currentTime>=curTime){clearInterval(timer);timer=null;t.isDefinitionSwitching=false;}},50);});this.isDefinitionSwitching=true;this.play(this.curVideo);}});})(tvp,tvp.$);;(function(tvp,$){function TimerObject(){this.start=tvp.$.now();this.end=0;};TimerObject.prototype={getTimelong:function(){this.end=tvp.$.now();if(this.end<=0||this.start<=0)return 0;var a=this.end-this.start;return(a<=0?0:a);},getSeconds:function(){return parseInt(this.getTimelong()/1000,10);}};function Monitor(vid,player){this.vid=vid||"";this.player=player;this.rid=player.curVideo.getRid()||$.createGUID();this.pid=player.curVideo.getPid()||$.createGUID();this.reportTimer={};var cgiURL="http://rcgi.video.qq.com/report/play?",param={"version":"TenPlayerHTML5V2.0","vid":this.vid,"rid":this.rid,"pid":this.pid,"url":document.location.href,"platform":this.getplatform(),"ptag":$.cookie.get("ptag"),"pfversion":$.os.version};this.addStep=function(step,extData){this.reportTimer[step]=new TimerObject();}
this.delStep=function(step){delete this.reportTimer[step];}
this.report=function(step,val,extData){var r=[],videodata={},pa={},url=cgiURL;if(!step)return;$.extend(pa,param);if(typeof extData=="object"){$.extend(pa,extData);}
try{videodata.vt=player.curVideo.data.vl.vi[0].ul.ui[0].vt;}catch(er){videodata.vt=0;}
videodata.vurl=player.curVideo.url;videodata.bt=parseInt(player.getDuration(),10);$.extend(pa,videodata);pa.step=step;pa.ctime=$.getISOTimeFormat();pa.val=val;for(var p in pa){var v=pa[p];if(isNaN(v)){v=encodeURIComponent(""+v);}
r.push(p+"="+v);}
url+=r.join("&");tvp.report(url);}
this.reportStep=function(step,extData){if(!this.reportTimer[step]instanceof TimerObject)return;var val=this.reportTimer[step].getTimelong();if(isNaN(val)||val<=0||val>9000000){return;}
this.report(step,val,extData);}};Monitor.fn=Monitor.prototype={getBusinessId:function(){if(!!$.userAgent.WeChat){return 6;}
var host="";if(document.location.href.indexOf("http://v.qq.com/iframe/")>=0&&window!=top){var l=document.referrer;if(l!=""){var link=document.createElement("a");link.href=l;host=link.hostname;link=null;delete link;}}
if(host==""){host=document.location.hostname||document.location.host;}
keys=[{r:/(\w+\.)?weixin\.qq\.com$/i,v:6},{r:/^(v|film)\.qq\.com$/i,v:1},{r:/^news\.qq\.com$/i,v:2},{r:/(\w+\.)?qzone\.qq\.com$/i,v:3},{r:/(\w+\.)?t\.qq\.com$/i,v:5},{r:/^3g\.v\.qq\.com$/i,v:8},{r:/^m\.v\.qq\.com$/i,v:10}];host=host.toLowerCase();for(var i=0,len=keys.length;i<len;i++){var key=keys[i];if(key.r.test(host)){return key.v;}}
return 7;},getDeviceId:function(){var os=$.os,ua=navigator.userAgent;if(os.ipad)return 1;if(os.windows){if(/Touch/i.test(ua))return 8;if(/Phone/i.test(ua))return 7;return 2;}
if(os.android){if(os.tablet)return 5;return 3;}
if(os.iphone)return 4;if(os.Mac)return 9;return 10;},getplatform:function(){var bussId=this.getBusinessId(),deviceId=this.getDeviceId();return bussId*10000+deviceId*100+1;}}
tvp.H5Monitor=Monitor;$.extend(tvp.Html5Tiny.fn,{buildmonitor:function(){var t=this,monitor=null,waitingTimes=0;this.$video.on("tvp:video:ajaxstart",function(e,vid){monitor=null;monitor=new Monitor(vid,t);monitor.addStep(1011);}).on("tvp:video:ajaxsuc",function(){monitor.reportStep(1011,{val1:1,val2:0});}).on("tvp:video:src",function(){waitingTimes=0;monitor.report(4,1);monitor.addStep(6);monitor.addStep(30);t.$video.one("canplay",function(){monitor.reportStep(6,{"val1":1});monitor.reportStep(30,{"val1":0,"val2":2});}).one("error",function(){monitor.reportStep(30,{"val1":1,"val2":2});});}).on("waiting",function(){if(++waitingTimes==1)return;if(!!t.isDefinitionSwitching||!!t.isTouching)return;monitor.addStep(31);t.$video.one("timeupdate",report31)})
var report31=function(){var tl=monitor.reportTimer[31].getTimelong();monitor.report(31,Math.min(10000,tl),{"val1":tl>10000?1:0,"val2":2,"ptime ":t.videoTag.currentTime});t.$video.off("timeupdate",report31);};}})})(tvp,tvp.$);;(function(tvp,$){var curVid="";tvp.MP4Skin={html:(function(){return['<div style="background:#000000 url(http://i.gtimg.cn/qqlive/images/20121119/i1353305744_1.jpg) center center no-repeat;">',' <a style="width:100%;height:100%;display:block"></a>','</div>'].join("");})()}
tvp.MP4Link=function(vWidth,vHeight){this.config.width=tvp.$.filterXSS(vWidth);this.config.height=tvp.$.filterXSS(vHeight);this.$elements=null;};tvp.MP4Link.fn=tvp.MP4Link.prototype=new tvp.BaseHtml5();$.extend(tvp.MP4Link.fn,{write:function(id){var el=null,t=this;if($.type(id)=="object"&&id.nodeType==1){el=id;}else{el=tvp.$.getByID(id);}
if(!el)return;this.playerid=this.config.playerid;if(!this.playerid){this.playerid="tenvideo_video_player_"+(tvp.MP4Link.maxId++);}
this.modId=id;this.$mod=$("#"+id);this.oninited();var htmlBuf=tvp.MP4Skin.html;videoModId="mod_"+this.playerid;var $videomod=$('<div id="'+videoModId+'"></div>').appendTo(t.$mod);this.$elements=$(htmlBuf).appendTo($videomod).css("width",t.config.width).css("height",t.config.height);this.videomod=$.getByID(videoModId);this.play(this.curVideo);},play:function(v){var t=this;if(v instanceof tvp.VideoInfo){isVidChange=(v.getVid()!=curVid&&curVid!="");t.setCurVideo(v);if(isVidChange){t.callCBEvent("onchange",t.curVideo.getFullVid());}
curVid=t.curVideo.getFullVid();}
t.curVideo.getMP4Url().done(function(url){var $link=t.$elements.find("a");$link.attr("href",url);t.callCBEvent("onplay",t.curVideo.lastQueryVid,t.curVideo);}).fail(function(errCode,errContent){t.showError(errCode,errContent);t.callCBEvent("onerror",errCode,errContent);}).always(function(){curVid=t.curVideo.lastQueryVid;});},getPlayerType:function(){return"mp4";}});tvp.MP4Link.maxId=0;})(tvp,tvp.$);;(function(tvp,$){tvp.BaseFlash=function(){var $me=this;this.swfPathRoot="http://imgcache.qq.com/tencentvideo_v1/player/";this.flashobj=null;this.flashVarsKeyMapToCfg={};}
if(typeof tvp.BaseFlash.maxId!="number"){tvp.BaseFlash.maxId=0;}
tvp.BaseFlash.prototype=new tvp.BasePlayer();$.extend(tvp.BaseFlash.prototype,{getFlashVar:function(){return"";},getFlashVarVal:function(){var val={},config=this.config;$.each(this.flashVarsKeyMapToCfg,function(k,v){var cfgKey=v;if(cfgKey in config){var valType=$.type(config[cfgKey]);if(valType=="boolean"){val[k]=config[cfgKey]?1:0;}else if(valType=="number"||valType==="string"){val[k]=config[cfgKey];}}else{val[k]="";}});return val;},getFlashSwfUrl:function(){var swfurl="";if(this.config.type==tvp.PLAYER_DEFINE.LIVE){if($.isString(this.config.liveFlashUrl)&&this.config.liveFlashUrl.length>0){swfurl=this.config.liveFlashUrl;}else{swfurl=this.swfPathRoot+this.config.liveFlashSwfType.replace(/[^\w+]/ig,"")+".swf";swfurl+="?max_age=86400&v=20121230"}}else{if($.isString(this.config.vodFlashUrl)&&this.config.vodFlashUrl.length>0){swfurl=this.config.vodFlashUrl;}else{swfurl=this.swfPathRoot+this.config.vodFlashType.replace(/[^\w+]/ig,"")+".swf";swfurl+="?max_age=86400&v=20121230"}
var ua=navigator.userAgent;if(ua.indexOf("Maxthon")>0&&ua.indexOf("Chrome")>0){swfurl+=(swfurl.indexOf("?")>0?"&":"?")+"_="+tvp.$.now();}}
swfurl=$.filterXSS(swfurl);return swfurl;},getFlashHTML:function(){var flashvar=this.getFlashVar(),swfurl=this.getFlashSwfUrl();if(!this.config.playerid){this.playerid="tenvideo_flash_player_"+new Date().getTime();}else{this.playerid=this.config.playerid;}
var propStr=['<param name="allowScriptAccess" value="always" />','<param name="movie" value="'+swfurl+'" />','<param name="quality" value="high" />','<param name="allowFullScreen" value="true"/>','<param name="play" value="true" />','<param name="wmode" value="'+$.filterXSS(this.config.flashWmode)+'" />','<param name="flashvars" value="'+flashvar+'"/>','<param name="type" value="application/x-shockwave-flash" />','<param name="pluginspage" value="http://get.adobe.com/cn/flashplayer/" />'].join("\n");var str="";if(!!$.browser.ie){str+='<object data="'+swfurl+'" type="application/x-shockwave-flash" width="'+this.config.width+'" height="'+this.config.height+'" id="'+this.playerid+'" align="middle">\n';str+=propStr;str+=' <a href="http://www.adobe.com/go/getflashplayer" target="_blank">点击此处安装播放视频需要的flash插件</a>\n';str+='</object>';}
else{str+='<embed wmode="'+$.filterXSS(this.config.flashWmode)+'" flashvars="'+flashvar+'" src="'+swfurl+'" quality="high" name="'+this.playerid+'" id="'+this.playerid+'" bgcolor="#000000" width="'+this.config.width+'" height="'+this.config.height+'" align="middle" allowScriptAccess="always" allowFullScreen="true"  type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></embed>';}
return str;},write:function(modId){var el=null;if($.type(modId)=="object"&&modId.nodeType==1){el=modId;}else{el=tvp.$.getByID(modId);}
if(!el)return;var str=this.getFlashHTML(),videoModId="mod_"+this.playerid;el.innerHTML='<div id="'+videoModId+'">'+str+'</div>';this.flashobj=$.browser.ie?document.getElementById(this.playerid):document.embeds[this.playerid];this.videomod=$.getByID(videoModId);},getPlayer:function(){return this.flashobj;}})})(tvp,tvp.$);;(function(tvp,$){tvp.FlashLivePlayer=function(vWidth,vHeight){var $me=this;tvp.BaseFlash.maxId++;this.flashVarsKeyMapToCfg={"showcfg":"isLiveFlashShowCfg","loadingswf":"liveFlashLoadingSwf","share":"share","oid":"oid","apptype":"liveFlashAppType","full":"isLiveflashShowFullBtn","wmark":"liveFlashWatermark","autoplay":"autoplay"};this.swfPathRoot="http://imgcache.qq.com/minivideo_v1/vd/res/";this.config.width=$.filterXSS(vWidth);this.config.height=$.filterXSS(vHeight);this.loginResponse=function(){if(!this.flashobj||typeof this.flashobj.loginCallback=="function"){this.flashobj.loginCallback(tvp.FlashLivePlayer.flashloginParam);tvp.FlashLivePlayer.flashloginParam={};}}
window.playerInit=function(){$me.callCBEvent("oninited");$me.callCBEvent("onplay",$me.curVideo.getChannelId());}}
tvp.FlashLivePlayer.prototype=new tvp.BaseFlash();$.extend(tvp.FlashLivePlayer.prototype,{getChannelURl:function(cnlid){return"http://zb.v.qq.com:1863/?progid="+cnlid;},getFlashVar:function(){var flashvar='',funPrefix="TenVideo_FlashLive_",varsVal=this.getFlashVarVal(),linkChar="";flashvar+="vid="+this.curVideo.getChannelId();flashvar+="&vurl="+this.getChannelURl(this.curVideo.getChannelId());flashvar+="&sktype="+(!!this.curVideo.getIsLookBack()?"vod":"live");linkChar="&";flashvar+=linkChar;flashvar+="funCnlInfo="+funPrefix+"GetChannelInfo"
flashvar+="&funTopUrl="+funPrefix+"GetTopUrl";flashvar+="&funLogin="+funPrefix+"IsLogin";flashvar+="&funOpenLogin="+funPrefix+"OpenLogin";flashvar+="&funSwitchPlayer="+funPrefix+"SwitchPlayer";$.each(varsVal,function(k,v){if(($.isString(v)&&v.length>0)||$.type(v)=="number"){flashvar+="&"+k+"="+$.filterXSS(v);}});for(var p in this.config.liveFlashExtVars){flashvar+=["&",encodeURIComponent(p),"=",encodeURIComponent(this.config.liveFlashExtVars[p])].join("");}
return flashvar;},play:function(video){if(!this.flashobj){return;}
video=video||this.curVideo;if(!video instanceof tvp.VideoInfo){throw new Error("传入的对象不是tvp.VideoInfo的实例");}
var islookback=!!video.getIsLookBack(),cnild=video.getChannelId(),rurl=this.getChannelURl(cnild),flashp2p=tvp.livehub.g_flashp2p||0;if(cnild==""){return;}
if(typeof this.flashobj.setSkinType!="undefined"){this.flashobj.setSkinType(islookback?"vod":"live");}
if(typeof this.flashobj.loadAndPlayVideoFromVID!="undefined"){this.flashobj.loadAndPlayVideoFromVID(rurl,cnild,video.getLiveReTime()||"","",flashp2p);}
this.callCBEvent("onplay",video.getChannelId());this.setCurVideo(video);this.callCBEvent("onchange",video.getChannelId());},stop:function(){if(!this.flashobj){return;}
if(!$.isUndefined(this.flashobj.stopVideo)){this.flashobj.stopVideo();}}});tvp.FlashLivePlayer.ADTYPE={"WEI_DIAN_TAI":"weidiantai","WEI_DIAN_SHI":"weidianshi","LIVE":"live","IN_LIVE":"inlive"}
window.TenVideo_FlashLive_GetChannelInfo=function(){return tvp.livehub.g_curCnlInfo;}
window.TenVideo_FlashLive_GetTopUrl=function(){var href="";try{href=top.location.href;}catch(err){href=document.location.href;}
return href;}
window.TenVideo_FlashLive_IsLogin=function(){return tvp.common.getUin()>10000;}
window.TenVideo_FlashLive_OpenLogin=function(config){tvp.FlashLivePlayer.flashloginParam=config||{};tvp.common.openLogin();}
window.TenVideo_FlashLive_SwitchPlayer=$.noop;})(tvp,tvp.$);var preplay=tvp.$.noop,nextplay=tvp.$.noop,attrationstop=tvp.$.noop,thisplay=tvp.$.noop,playerInit=tvp.$.noop;;(function(tvp,$){var curVid="";tvp.FlashPlayer=function(vWidth,vHeight){var $me=this,pauseTime=-1;this.flashVarsKeyMapToCfg={"cid":"coverId","tpid":"typeId","showend":"isVodFlashShowEnd","showcfg":"isVodFlashShowCfg","searchbar":"isVodFlashShowSearchBar","loadingswf":"vodFlashLoadingSwf","share":"isVodFlashShowShare","pic":"pic","oid":"oid","skin":"vodFlashSkin","shownext":"isVodFlashShowNextBtn","list":"vodFlashListType","autoplay":"autoplay"};tvp.BaseFlash.maxId++;this.isStartPlay=false;this.getPlayerType=function(){return"flash";}
this.config.width=tvp.$.filterXSS(vWidth);this.config.height=tvp.$.filterXSS(vHeight);window.thisplay=function(){$me.isStartPlay=true;$me.callCBEvent("onplaying",$me.getCurVid());}
window.playerInit=function(){if(typeof $me.flashobj.setNextEnable=="function"){$me.flashobj.setNextEnable($me.callCBEvent("ongetnextenable",$me.curVideo.getFullVid())?1:0);}
$me.callCBEvent("oninited");$me.callCBEvent("onplay",$me.curVideo.getFullVid());}
window.attrationstop=window.nextplay=function(vid){$me.callCBEvent("onended",vid);var video=$me.callCBEvent("ongetnext",vid);if(!video){$me.callCBEvent("onallended");return;}
$me.play(video);}
window.__flashplayer_ismax=function(ismax){$me.callCBEvent("onfullscreen",ismax);};window.__tenplay_popwin=function(){if(tvp.$.isFunction($me.onflashpopup)){$me.callCBEvent("onflashpopup");}}
window._showPlayer=function(){$me.showPlayer();}
window._hidePlayer=function(){$me.hidePlayer();}}
tvp.FlashPlayer.fn=tvp.FlashPlayer.prototype=new tvp.BaseFlash();$.extend(tvp.FlashPlayer.fn,{play:function(video){if(!this.flashobj){throw new Error("未找到视频播放器对象，请确认flash播放器是否存在");}
if($.isUndefined(video)&&$.isFunction(this.flashobj.setPlaytime)){this.flashobj.setPlaytime(pauseTime);pauseTime=-1;this.isStartPlay=true;return;}
if(!video instanceof tvp.VideoInfo){throw new Error("传入的对象不是tvp.VideoInfo的实例");}
var isVideChange=curVid!=video.getFullVid();this.setCurVideo(video);if(isVideChange){this.callCBEvent("onchange",this.curVideo.getFullVid());}
curVid=this.curVideo.getFullVid();this.isStartPlay=false;var vstart=0,vend=0,tagstart=0,tagend=0;if(video.getIdx()==0){vstart=video.getPrefix()||0;vend=video.getEndOffset()||0;}else{tagstart=video.getTagStart();tagend=video.getTagEnd();}
var extid=video.getIdx()==0?0:("k"+video.getIdx());if(this.curVideo.getVidList()!=video.getVidList()||video.getIdx()==0){var videoInfo={vid:video.getVidList()||video.getIdx(),duration:video.getDuration()||"",start:tagstart,end:tagend,history:video.getHistoryStart()||0,vstart:vstart,vend:vend,title:video.getTitle()||"",exid:extid,pay:video.getPay(),cdntype:this.curVideo.getCDNType()};if(this.config["starttips"]==0){videoInfo["t"]=video.getHistoryStart()||0;}
if(typeof this.flashobj.loadAndPlayVideoV2=='function'){this.flashobj.loadAndPlayVideoV2(videoInfo);}}else if(video.getTagEnd()-video.getTagStart()>0){flashobj.attractionUpdate(video.getTagStart(),video.getTagEnd(),extid);}
this.isStartPlay=true;this.callCBEvent("onplay",video.getFullVid());if(typeof this.flashobj.setNextEnable=="function"){this.flashobj.setNextEnable(this.callCBEvent("ongetnextenable",this.curVideo.getFullVid())?1:0);}},pause:function(){if(!this.isStartPlay)return;if(!!this.flashobj&&$.isFunction(this.flashobj.getPlaytime)&&$.isFunction(this.flashobj.pauseVideo)){pauseTime=this.flashobj.getPlaytime();this.flashobj.pauseVideo();this.isStartPlay=false;}},getFlashVar:function(){var flashvar='',varsVal=this.getFlashVarVal();flashvar+='vid='+this.curVideo.getVidList();if(this.curVideo.getIdx()>0&&this.curVideo.getTagEnd()-this.curVideo.getTagStart()>0){flashvar+="&attstart="+tvp.$.filterXSS(this.curVideo.getTagStart());flashvar+="&attend="+tvp.$.filterXSS(this.curVideo.getTagEnd());}
if(this.curVideo.getDuration()>0){flashvar+='&duration='+(this.curVideo.getDuration()||"");}
if(this.curVideo.getHistoryStart()>0){flashvar+="&history="+tvp.$.filterXSS(this.curVideo.getHistoryStart());}
if(this.curVideo.getTstart()>0){flashvar+="&t="+tvp.$.filterXSS(this.curVideo.getTstart());}
if(this.curVideo.getIdx()==0&&(this.curVideo.getPrefix()>0||this.curVideo.getTail()>0)){var _piantou=this.curVideo.getPrefix(),_endoffset=this.curVideo.getEndOffset();if(_piantou>0||_endoffset){flashvar+="&vstart="+tvp.$.filterXSS(_piantou);flashvar+="&vend="+tvp.$.filterXSS(_endoffset);}}
tvp.$.each(varsVal,function(k,v){if(($.isString(v)&&v.length>0)||$.type(v)=="number"){flashvar+="&"+k+"="+tvp.$.filterXSS(v);}});if(!!this.curVideo.getPay()){flashvar+="&pay="+($.isTrue(this.curVideo.getPay())?1:0);}
if(this.curVideo.getTitle().length>0){flashvar+="&title="+encodeURIComponent(this.curVideo.getTitle());}
if(!!this.curVideo.getIdx()){flashvar+="&exid=k"+tvp.$.filterXSS(this.curVideo.getIdx());}
if(this.curVideo.getCDNType()>0){flashvar+="&cdntype="+this.curVideo.getCDNType();}
for(var p in this.config.vodFlashExtVars){flashvar+=["&",encodeURIComponent(p),"=",encodeURIComponent(this.config.vodFlashExtVars[p])].join("");}
return flashvar;},getPlaytime:function(){if(!!this.flashobj&&$.isFunction(this.flashobj.getPlaytime)){return this.flashobj.getPlaytime();}
return-1;},setPlaytime:function(time){if(!!this.flashobj&&$.isFunction(this.flashobj.setPlaytime)){return this.flashobj.setPlaytime(time);}},showPlayer:function(){if(!this.flashobj)return;var width=""+this.config.width,height=""+this.config.height;if(width.indexOf("px")<0){width=parseInt(width)+"px";}
if(height.indexOf("px")<0){height=parseInt(height)+"px";}
this.flashobj.style.width=width;this.flashobj.style.height=height;},hidePlayer:function(){if(!this.flashobj)return;this.flashobj.style.width="1px";this.flashobj.style.height="1px";}});})(tvp,tvp.$);;(function(tvp,$){tvp.livehub={g_isFiveCity:false,g_lookback:false,g_flashp2p:false,iretcode:0,g_curCnlInfo:{},checkUserArea:function(){return false},FlashChecker:function(){var $me=this;this.cnlId="";this.extParam={};this.onError=$.noop;this.onCanFlash=$.noop;this.onCanHTML5=$.noop;this.onCanOCX=$.noop;this.onComplete=$.noop;this.onGetCnlId=$.noop;this.onSuccess=function(json){if($.type(json)=="object"&&!$.isUndefined(json.ret)&&json.ret==0){if($.isUndefined(json.isfivecity)){tvp.livehub.g_isFiveCity=json.isfivecity;}
tvp.livehub.iretcode=json.iretcode;tvp.livehub.g_flashp2p=+json.flashp2p||0;tvp.debug("get channel info:cnlid="+json.progid+",lookback="+json.lookback+",isflash="+json.flash+",flashp2p="+json.flashp2p);$me.cnlId=(""+json.progid)||"";$me.onGetCnlId(""+$me.cnlId,!!json.lookback);tvp.livehub.getCurChannelInfo($me.cnlId);if(json.flash==1){tvp.livehub.g_lookback=!!json.lookback;$me.onCanFlash($me.cnlId);}else if(tvp.common.isUseHtml5()){$me.onCanHTML5($me.cnlId);}else if(!!$.os.windows){$me.onCanOCX($me.cnlId);}else{$me.onError(json.iretcode);}}else{$me.onError(500);}}
this.send=function(){var sendData={cnlid:$me.cnlId||"",area:tvp.livehub.checkUserArea()?1:0,qq:tvp.common.getUin(),ios:tvp.common.isUseHtml5()?1:0};var extData={debug:"",key:"",ip:""}
$.each(extData,function(el){extData[el]=$.getUrlParam(el);})
$.extend(sendData,extData);$.extend(sendData,this.extParam);$.ajax({type:"GET",url:"http://zb.s.qq.com/getproginfo.fcgi",data:sendData,dataType:"jsonp",error:function(){$me.onError();$me.onComplete();},success:function(json){$me.onSuccess(json);$me.onComplete();}});}},getCurChannelInfo:function(cnlId){$.ajax({type:"get",url:"http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?otype=json&auto_id=191",data:{cid:cnlId},dataType:"jsonp",success:function(json){if(!!json&&!$.isUndefined(json["channel"])){var channel=json["channel"];tvp.livehub.g_curCnlInfo.cnlId=cnlId;tvp.livehub.g_curCnlInfo.cnlName=channel["cname"];tvp.livehub.g_curCnlInfo.prmInfo=channel["cur_ptime"]+"|"+channel["cur_pname"]}else{tvp.livehub.g_curCnlInfo={};}}});}}})(tvp,tvp.$);;(function(tvp,$){var cfg={},playerClass=null,vodDefer=null,liveDefer={};function checkVodPlayer(){if($.type(vodDefer)==="object"&&$.isFunction(vodDefer.done)){return vodDefer;}
if(vodDefer===null){vodDefer=$.Deferred();}
switch(cfg.playerType){case"flash":{playerClass=tvp.FlashPlayer;break;}
case"html5":{useWhichVodHtml5();break;}
case"ocx":{playerClass=tvp.OcxPlayer;break;}
case"mp4":{playerClass=tvp.MP4Link;break;}
default:{useDefaultVodPlayer();break;}}
vodDefer.resolve();return vodDefer;}
function useDefaultVodPlayer(){if(tvp.common.isEnforceMP4()){playerClass=tvp.MP4Link;return;}
if(tvp.common.isUseHtml5()){useWhichVodHtml5();}else if($.os.android&&$.os.getNumVersion()>=4){playerClass=tvp.MP4Link;}else{playerClass=tvp.FlashPlayer;}}
function checkLivePlayer(video){if(!!video.getChannelId()){var cnlid=video.getChannelId();if($.type(liveDefer[cnlid])=="object"&&$.isFunction(liveDefer[cnlid].done)){return liveDefer[cnlid];}
liveDefer[cnlid]=$.Deferred();var checker=new tvp.livehub.FlashChecker(),isSuc=!!1;checker.cnlId=video.getChannelId();checker.extParam=video.getChannelExtParam();checker.onGetCnlId=function(cnlid,isLookBack){video.setChannelId(cnlid);video.setIsLookBack(!!isLookBack);}
checker.onCanFlash=function(cnlid){playerClass=tvp.FlashLivePlayer;}
checker.onCanHTML5=function(){useWhichLiveHtml5();}
checker.onCanOCX=function(){playerClass=tvp.OcxPlayer;}
checker.onError=function(errcode){useDefaultLivePlayer();isSuc=false;}
checker.onComplete=function(){useConfigLivePlayer();if(isSuc)liveDefer[cnlid].resolve();else liveDefer[cnlid].reject();}
checker.send();return liveDefer[cnlid]}}
function useDefaultLivePlayer(){if(tvp.common.isLiveUseHTML5()){useWhichLiveHtml5();}else if(!!$.os.android){playerClass=tvp.FlashLivePlayer;}else{playerClass=tvp.OcxPlayer;}}
function useConfigLivePlayer(){switch(cfg.playerType){case"flash":{playerClass=tvp.FlashLive;break;}
case"html5":{useWhichLiveHtml5();break;}
case"ocx":{playerClass=tvp.OcxPlayer;break;}}}
function useWhichVodHtml5(){if(cfg.isHTML5UseUI){playerClass=tvp.Html5Player;}else{playerClass=tvp.Html5Tiny;}}
function useWhichLiveHtml5(){if(cfg.isHTML5UseUI){playerClass=tvp.Html5Live;}else{playerClass=tvp.Html5LiveTiny;}}
function reportInitStep(step,sessionId,extdata){var d={cmd:3515,val:step,str1:sessionId,str2:navigator.userAgent};if($.type(extdata)=="object"){$.extend(d,extdata);}
tvp.report(d);}
var create=function(config){var defer=$.Deferred();$.extend(cfg,config);if(!config.video instanceof tvp.VideoInfo){throw new Error("video未初始化");return;}
$.when(config.type==tvp.PLAYER_DEFINE.VOD?checkVodPlayer():checkLivePlayer(config.video)).then(function(){if(!playerClass){throw new Error("您当前使用的统一播放器JS文件不包含指定的播放器内核");return;}
var t=new playerClass();t.init(config);defer.resolve(t);});return defer;};tvp.create=create;var oldParamMap={"player":"playerType","showcfg":["isVodFlashShowCfg","isLiveFlashShowCfg"],"searchbar":["isVodFlashShowSearchBar"],"showend":["isVodFlashShowEnd"],"tpid":["typeId"],"cid":["coverId"],"flashshownext":["isVodFlashShowNextBtn"],"loadingswf":"loadingSwf","wmode":"flashWmode","flashskin":["vodFlashSkin"],"extvars":["vodFlashExtVars"],"swftype":["vodFlashType"],"swfurl":["vodFlashUrl","liveFlashUrl"]};tvp.Player=function(vWidth,vHeight){this.sessionId=$.createGUID();reportInitStep(1,this.sessionId);this.instance=null,this.config={},this._oldcfg={};$.extend(this.config,tvp.defaultConfig);this.setting("width",vWidth);this.setting("height",vHeight);};tvp.Player.fn=tvp.Player.prototype=new tvp.BasePlayer();$.extend(tvp.Player.fn,{setting:function(k,v){this.config[k]=v;},output:function(id){this.setting("modId",id);this.create(this.config);},create:function(config){var t=this;$.extend(t.config,config);reportInitStep(2,this.sessionId);tvp.create(t.config).done(function(f){reportInitStep(3,t.sessionId,{ver:f.getPlayerType()});t.instance=f;t.instance.instance=t;for(var p in t.instance){if(p=="instance")continue;if(p.substr(0,2)=="on"&&$.isFunction(t[p])&&t[p]!=tvp.$.noop)continue;t[p]=t.instance[p];}
f.callCBEvent("onwrite");if(t.config.type==tvp.PLAYER_DEFINE.LIVE){t.play=function(v){if($.isString(v)){t.config.video.setChannelId(v);v=t.config.video;}else if(v instanceof tvp.VideoInfo){$.when(checkLivePlayer(v)).then(function(){if(t.instance instanceof playerClass){t.instance.play(v);}else{config.video=v;create(config);}});}}}
tvp.Player.instance[t.playerid]=t;}).always(function(){function invoke(v){try{var evtName="build"+v;if($.isFunction(t[evtName])){t[evtName].apply(t);}}catch(err){}}
$.each(t.config.plugins,function(k,v){if(!!v){if(k in t.config.pluginUrl){var url=t.config.libpath+t.config.pluginUrl[k];if($.isString(url)&&$.trim(url)!=""){$.getScript(url,function(){invoke(k);})}}else{invoke(k);}}});});},addParam:function(k,v){if(k=="config"&&$.type(v)=="object"){$.extend(this.config,v);}else{this._oldcfg[k]=v;}},setCurVideo:function(v){this.config["video"]=v;},write:function(id){this.config.modId=id;var type=this._oldcfg["type"]==1?1:2,t=this;$.each(this._oldcfg,function(k,v){if(k in oldParamMap){if($.isArray(oldParamMap[k])){if(type==2){t.config[oldParamMap[k][0]]=v;}else if(type==1&&oldParamMap[k].length>=2){t.config[oldParamMap[k][1]]=v;}}else if($.isString(oldParamMap[k])){t.config[oldParamMap[k]]=v;}}else if(k in tvp.defaultConfig){t.config[k]=v;}});delete this._oldcfg;this.create(this.config);}});})(tvp,tvp.$);tvp.Player.instance={};/*  |xGv00|467e706ae52c0849b00ba3f417e8793b */