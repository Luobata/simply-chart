!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports["simply-chart"]=i():t["simply-chart"]=i()}("undefined"!=typeof self?self:this,function(){return function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="/",e(e.s=0)}([function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e(1);i.default=s.a},function(t,i,e){"use strict";i.a=class{constructor(t){this.margin=2,this.config=t,this.defaultValue(),this.canvasInit(),this.dom.appendChild(this.canvas)}update(t){return this.data=t,this}reset(){this.canvas.height=this.canvas.height}render(){const t=(this.config.width-2*this.margin)/(this.data.length-1),i=Math.max(...this.data),e=Math.min(...this.data),s=(this.config.height-2*this.margin)/(i-e);this.reset(),this.ctx.save(),this.axiesChange(),this.ctx.lineCap="round",this.ctx.strokeStyle=this.config.color,this.ctx.lineWidth=this.config.lineWidth,this.ctx.beginPath();for(let i=0;i<this.data.length;i+=1)this.ctx.lineTo(i*t*this.pixelRatio,(this.data[i]-e)*s*this.pixelRatio);return this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore(),this}defaultValue(){this.config.color=this.config.color||"blue",this.config.lineWidth=this.config.lineWidth||5}canvasInit(){"string"==typeof this.config.dom?this.dom=document.querySelector(this.config.dom):this.dom=this.config.dom,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.pixelRatio=window.devicePixelRatio,this.canvas.width=this.config.width*this.pixelRatio,this.canvas.height=this.config.height*this.pixelRatio,this.canvas.style.width=`${this.config.width}px`,this.canvas.style.height=`${this.config.height}px`}axiesChange(){this.ctx.scale(1,-1),this.ctx.translate(this.margin,-this.config.height*this.pixelRatio+this.margin)}}}])});
//# sourceMappingURL=simply-chart.js.map