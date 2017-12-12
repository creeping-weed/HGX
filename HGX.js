/**
 * Created by 胡国兴 on 2017/11/24.
 */
(function (window){
    //公用变量
    var arr=[];
    var push=arr.push;
    var slice=arr.slice;

    //框架的核心结构
    function HGX(selector){
        return new HGX.fn.inint(selector);
    }
    HGX.fn= HGX.prototype={
        constructor:HGX,
        length:0,
        each:function(callback){
            return HGX.each(this,callback);
        },
        map:function(callback){
            return HGX.map(this,callback);
        },
        toArray:function(){
            return slice.apply(this);
        },
        get:function(index){
            if(index>=0&&typeof index==='number'){
                return this[index];
            }else if(index<0&&typeof index==='number'){
                return this[arr.length+index];
            }else if(index===undefined){
                return this.toArray();
            }
            return this;
        },
        //储存上级对象
        pushStack:function(newObj){
            newObj.prevObj=this;
            return newObj;
        },
        //返回上级链
        end:function(){
            return this.prevObj||this;
        }
    };


    //框架的静态方法
    HGX.select=function(selector){
        return document.querySelectorAll(selector);
    };
    HGX.isArrayLike=function(array){
        var length=array&&array.length;
        return typeof length==='number'&&length>=0;
    };
    HGX.each=function(array,callback){
        var i, k;
        if(H.isArrayLike(array)){
            for(i=0;i<array.length;i++){
                if(callback.call(array[i],i,array[i])===false){
                    break;
                }
            }
        }else {
            for(k in array){
                if(callback.call(array[k],k,array[k])===false){
                    break;
                }
            }
        }
        return array;
    };
    HGX.map=function(array,callback){
        var i, k,tmp,arr=[];
        if(H.isArrayLike(array)){
            for(i=0;i<array.length;i++){
                tmp=callback.call(array[i],array[i],i);
                if(tmp!==undefined){
                    arr.push(tmp);
                }
            }
        }else {
            for(k in array) {
                tmp = callback.call(array[k], array[k], k);
                if(tmp!==undefined){
                    arr.push(tmp);
                }
            }
        }
        return arr;
    };
    HGX.unique=function(arr){
        var ret=[];
        for(var i=0;i<arr.length;i++){
            if(ret.indexOf(arr[i])==-1){
                ret.push(arr[i]);
            }
        }
        return ret;
    };
    //extend方法
    HGX.extend=HGX.fn.extend=function(obj){
        for(var k in obj){
            this[k]=obj[k];
        }
    };

    //框架对外公开的变量
    window.H=window.HGX=HGX;
}(window));
/**
 * Created by 胡国兴 on 2017/11/24.
 */
(function(window){
    var HGX=window.HGX,
        H=HGX,
        arr=[],
        push=arr.push;
    H.fn.type='HGX';
    var inint=H.fn.inint=function(selector){
        //当selector为空或undifand
        if(!selector) return this;
        if(typeof selector=='string'){
            if(selector.charAt(0)=='<'&&selector.charAt(selector.length-1)=='>'){
                push.apply(this, H.parseHTML(selector));
                return this;
            }else{
                //当他是选择器的时候
                push.apply(this,H.select(selector));
                return this;
            }
        }
        //当传的的是单个dom对象的时候
        if(selector.nodeType){
            push.call(this,selector);
            return this;
        }
        //当传的的是‘HGX’对象的时候
        if(selector.type='HGX'){
            push.apply(this,selector);
            return this;
        }
        //当传的是函数的时候
        if(typeof selector=='function'){
            window.addEventListener('load',selector);
        }
    };
    inint.prototype= H.fn;
}(window));
/**
 * Created by 胡国兴 on 2017/11/24.
 */
(function(window){
    //parseHTML方法
    var HGX=window.HGX,
        arr=[],
        push=arr.push,
        H=HGX;
    H.parseHTML=function(dom){
        var i,arr=[],lists,div=document.createElement('div');
        div.innerHTML=dom;
        lists=div.childNodes;
        for(i=0;i<lists.length;i++){
            arr.push(lists[i]);
        }
        return arr;
    };
    H.fn.appendTo=function(selector){
        var arr=HGX(selector), i,tmp,newObj=new HGX.fn.inint;
        this.each(function(){
            for(i=0;i<arr.length;i++){
                tmp=i<=arr.length-1?this.cloneNode(true):this;
                arr[i].appendChild(tmp);
                push.call(newObj,tmp);
            }
        });
        this.pushStack(newObj);
        return newObj;
    };
    //成员访问方法
    H.fn.parent=function(){
        var newObj=H();
        var ret=this.map(function(v){
            return v.parentNode;
        });
        push.apply(newObj,H.unique(ret));
        return this.pushStack(newObj);
    };
}(window));

/**
 * Created by 胡国兴 on 2017/12/2.
 */
(function(window){
    var HGX=window.HGX,
        H=HGX;
    H.fn.extend({
        on:function(evenName,callback){
            return this.each(function(){
                this.addEventListener(evenName,callback);
            })
        },
        off:function(evenName,callback){
            return this.each(function(){
                this.removeEventListener(evenName,callback);
            })
        }
    });
    H.each(("abort,blur,cancel,canplay,canplaythrough,change,click,close,contextmenu,cuechange,dblclick,drag,"+
        "dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,error,focus,input,"+
        "invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,loadstart,mousedown,mouseenter,mouseleave,"+
        "mousemove,mouseout,mouseover,mouseup,mousewheel,pause,play,playing,progress,ratechange,reset,resize,scroll,"+
        "seeked,seeking,select,stalled,submit,suspend,timeupdate,toggle,volumechange,waiting,wheel,gotpointercapture,"+
        "lostpointercapture,pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerenter,"+
        "pointerleave,auxclick,beforecopy,beforecut,beforepaste,copy,cut,paste,search,selectstart,"+
        "webkitfullscreenchange,webkitfullscreenerror").split(','),function(i,v){
        H.fn[v]=function(callback){
            return this.on(v,callback);
        }
    })
}(window));
/**
 * Created by 胡国兴 on 2017/12/2.
 */
(function(window){
    var HGX=window.HGX,
        H=HGX;
    H.fn.extend({
        css:function(name,value){
            if(value===undefined){
                if(typeof name=='string'){
                    return this[0].style[name]||getComputedStyle(this[0])[name];
                }else{
                    return this.each(function(){
                        var that=this;
                        H.each(name,function(i,v){
                            that.style[i]=v;
                        })
                    })
                }
            }else{
                return this.each(function(){
                    this.style[name]=value;
                })
            }
        },
        addClass:function(name){
            return this.each(function(){
                //if(this.className){
                //    this.className+=' '+name;
                //}else{
                //    this.className=name;
                //}
                this.className?this.className+=' '+name:this.className=name;
            })
        },
        removeClass:function(name){
            return this.each(function (){
                var names=this.className&&this.className.split(' ')||[];
                var newNames=names.filter(function(v){
                    return v!=name;
                });
                this.className=newNames.join(' ');
            })
        },
        hasClass:function(name){
            var names=this[0].className&&this[0].className.split(' ')||[];
            for(var i=0;i<names.length;i++){
                if(names[i]==name){
                    return true;
                }
            }
            return false;
        },
        toggleClass:function(name){
            return this.each(function(){
                var newObj=H(this);
                if(newObj.hasClass(name)){
                    newObj.removeClass(name);
                }else{
                    newObj.addClass(name);
                }
            })
        }
    });
}(window));

/**
 * Created by 胡国兴 on 2017/12/2.
 */
(function(window){
    var HGX=window.HGX,
        H=HGX;
    H.fn.extend({
        attr:function(name,value){
            if(value===undefined){
                return this[0].getAttribute(name);
            }else{
                return this.each(function(){
                    this.setAttribute(name,value)
                })
            }
        },
        prop:function(name,value){
            if(value===undefined){
                return this[0][name];
            }else{
                return this.each(function(){
                    this[name]=value;
                })
            }
        }
    });
    H.each({
        html:'innerHTML',
        val:'value',
        text:'innerText'
    },function(i,v){
        H.fn[i]=function(value){
            if(value===undefined){
                return this[0][v];
            }else{
                return this.each(function(){
                    this[v]=value;
                })
            }
        }
    })
})(window);
