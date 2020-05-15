function load_svg(t,e="img/cliffsmap.svg"){function n(t,e,n){return function(t){const e=n[0].getTotalLength();return d3.interpolateString("0,"+e,e+","+e)(t)}}return d3.xml("img/cliffsmap.svg").then(async e=>{const o="localhost"===location.hostname?100:3e3,r=d3.select(t.node().appendChild(e.documentElement)),i=r.selectAll("g#pads-layer,g#roof-layer,g#structures-layer").style("opacity",0);return r.selectAll("g#walls-layer > path").each((t,e,r)=>{d3.select(r[e]).transition().duration(o).attrTween("stroke-dasharray",n)}),await i.transition().delay(o).duration(1e3).style("opacity",1).end(),r})}async function load_avatar(t,e){try{t=t.node?t.node():t;const n="g#avatar-layer",o=await d3.xml(`img/avatar/${e}.svg`),r=await d3.json(`img/avatar/${e}.json`),i=o.documentElement.querySelector(n),l=t.querySelector(n);if($(i).css("opacity",0),!l||!i)throw console.log(l,i),new Error("Failed to find the two elements to replace");return l.replaceWith(i),{layer:i,json:r}}catch(n){if("default"!=e)return load_avatar(t,"default")}}function sleep(t){return new Promise(e=>setTimeout(e,t))}function url_param(t,e){let n={};try{n=Object.fromEntries(document.location.hash.substr(1).split(";").map(t=>t.split("=").map(decodeURI)))}catch(t){}const o=n[t];return null==o?e:o}function string_to_date(t){const e=t.split("-");return new Date(e[0],e[1]-1,e[2])}function date_to_string(t){return t.toISOString().split("T")[0]}function get_color(t){const e={Red:"#ff0000",Blue:"#0000ff",Green:"#00ff00",Grey:"#888888",Gray:"#888888","Lime Green":"#00d221",White:"#ffffff",Black:"#000000",Purple:"#6d00c1",Pink:"#ffa0e9",Yellow:"#fcdc00",Tan:"#eacca5",Orange:"#ff9000"};for(;!e[t];){let e;if(!(e=t.match(/^(.*) [^ ]+$/)))break;t=e[1]}return e[t]||"#000000"}function contrast_color(t,e){return"white"!=t&&"#ffffff"!=t||"#ffffff"!=e&&"white"!=e?t:"#eeeeee"}function avoid_collision(t){const e=avoid_collision;if(e.reset||(e.reset=()=>e.cache={by_wall:{},by_event:{}}),e.cache||(e.cache={by_wall:{},by_event:{}}),e.cache.by_event[t.id])return e.cache.by_event[t.id];const n={"Bouldering 3D":6,"Bouldering Prow":7,"*":8},o=n[t.category]||n["*"],r=e.cache.by_wall,i=e.cache.by_event,l=d3.select("#"+t.wall).node(),a=l.getTotalLength(),c=Math.round(t.offset/o)*o;r[t.wall]||(r[t.wall]={});const s=r[t.wall];if(!s[c])return s[c]=!0,i[t.id]=l.getPointAtLength(c),i[t.id];for(let e=2;;++e){const n=c+Math.trunc(e/2)*(e%2==0?1:-1)*o;if(!s[n]&&n>=0&&n<=a)return s[n]=!0,i[t.id]=l.getPointAtLength(n),i[t.id];if(e>100)return console.log("Couldn't avoid a collision with data:"),console.log(t),{x:t.x,y:t.y}}}function point_distance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function get_length_at_point(t,e,n){return function e(n,o,r,i,l,a){const c=(n+o)/2;if(o-n<i)return l?{length:c,distance:a}:c;const s=[],d=(o-n)/49;let g;for(let e=0;e<50;++e){const o=n+d*e,i=t.getPointAtLength(o),l=point_distance(i,r);s.push({length:o,point:i,distance:l}),(void 0===g||l<s[g].distance)&&(g=e)}return e(s[0==g?0:g-1].length,s[49==g?g:g+1].length,r,i,l,s[g].distance)}(0,"walkway-boulders"==(t="string"==typeof t?document.getElementById(t):t).getAttribute("id")?475:t.getTotalLength(),e=void 0===e.x?{x:e[0],y:e[1]}:e,.001,n)}function hover(t,e){const n=$("#info_div"),o=$("#svg_container svg"),r=o.get(0).getBoundingClientRect(),i=o.get(0).getScreenCTM(),l=["x","y","offset","route_id","id","wall","start_date","end_date","event"],a={route_color:"Color",route_grade:"Grade",type:"Type",category:"Wall",rating:"Rating"};let c=i.a*e.x+i.c*e.y+i.e-r.x,s=i.b*e.x+i.d*e.y+i.f-r.y,d="";if(Object.keys(t).forEach(e=>{if(l.includes(e)||""==t[e])return;let n=t[e];if("route_color"==e&&(bg_color=get_color(t.route_color),border_color=contrast_color(get_color(t.route_color),"white"),style=`border-color:${border_color};background-color:${bg_color}`,n=`<div class='swatch_color' style='${style}'></div> ${n}`),"rating"==e){if(!n)return;let t="";n>=4?t='<img src="img/thumbsup.png">':n<=2&&(t='<img src="img/thumbsdown.png">'),n=`${n}/5 ${t}`}d+=`<div>${a[e]}: ${n}</div>\n`}),t.event){if(d+="<hr>",t.event.rating){let e="";t.event.rating>3?e='<img src="img/thumbsup.png">':t.event.rating>0&&t.event.rating<3&&(e='<img src="img/thumbsdown.png">'),console.log(e),d+=`<div>User Rating: ${t.event.rating} ${e}</div>\n`}if(t.event.style){let e="";"Onsight"!=t.event.style&&"Flash"!=t.event.style||(e='<img src="img/flash.png">'),d+=`<div>Style: ${t.event.style} ${e}</div>\n`}if(t.event.comment){d+=`<div>User Comment: ${'<img src="img/comment.png">'} ${t.event.comment}</div>\n`}}n.html(d),e.x>o.outerWidth()/2&&(c-=n.outerWidth(!0)),e.y>o.outerHeight()/2&&(s-=n.outerHeight(!0)),d3.select("#info_div").transition().duration(100).style("opacity",1).style("border-color",contrast_color(get_color(t.route_color),"white")).style("left",c+"px").style("top",s-18+"px")}
