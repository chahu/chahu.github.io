"use strict";function findRelativeLocation(t,e){return function e(n,o,c,s){if(o-n<s)return(n+o)/2;const a=[],r=(o-n)/49;let i;for(let e=0;e<50;++e){const o=n+r*e,s=t.getPointAtLength(o),u=(l=s,d=c,Math.sqrt(Math.pow(l.x-d.x,2)+Math.pow(l.y-d.y,2)));a.push({length:o,point:s,distance:u}),(void 0===i||u<a[i].distance)&&(i=e)}var l,d;return e(a[0==i?0:i-1].length,a[49==i?i:i+1].length,c,s)}(0,t.getTotalLength(),{x:e[0],y:e[1]},.01)}function setup(t){const e=t.select("svg");function n(t,n,o){const c=o[n],s=findRelativeLocation(c,d3.mouse(e.node())),a=c.getPointAtLength(s),r=`${$(c).attr("id")} : ${s} (${a.x}, ${a.y})`;console.log(r),$("#info").text(r),e.select("circle.mouse").attr("cx",a.x).attr("cy",a.y)}e.append("circle").attr("class","mouse").attr("fill","none").attr("stroke","red").attr("stroke-width","1").attr("cx",-100).attr("cy",-100).attr("r",5),d3.selectAll("#walls-layer path").on("mouseover",n).on("mousemove",n)}$(document).ready(async()=>{const t=d3.select("#svg-container");d3.xml("img/cliffsmap.svg").then(e=>{t.node().append(e.documentElement),setup(t)})});
