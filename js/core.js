function load_svg(t,e="img/cliffsmap.svg"){function o(t,e,o){return function(t){const e=o[0].getTotalLength();return d3.interpolateString("0,"+e,e+","+e)(t)}}return d3.xml("img/cliffsmap.svg").then(async e=>{const n="localhost"===location.hostname?100:3e3,r=d3.select(t.node().appendChild(e.documentElement)),l=r.selectAll("g#pads-layer,g#roof-layer,g#structures-layer").style("opacity",0);return r.selectAll("g#walls-layer > path").each((t,e,r)=>{d3.select(r[e]).transition().duration(n).attrTween("stroke-dasharray",o)}),await l.transition().delay(n).duration(1e3).style("opacity",1).end(),r})}function sleep(t){return new Promise(e=>setTimeout(e,t))}function string_to_date(t){const e=t.split("-");return new Date(e[0],e[1]-1,e[2])}function date_to_string(t){return t.toISOString().split("T")[0]}function get_color(t){const e={Red:"#ff0000",Blue:"#0000ff",Green:"#00ff00",Grey:"#888888",Gray:"#888888","Lime Green":"#00d221",White:"#ffffff",Black:"#000000",Purple:"#6d00c1",Pink:"#ffa0e9",Yellow:"#fcdc00",Tan:"#eacca5",Orange:"#ff9000"};for(;!e[t];){let e;if(!(e=t.match(/^(.*) [^ ]+$/)))break;t=e[1]}try{return e[t]}catch(e){return console.log("No color for "+t),console.log(e),"#000000"}}function contrast_color(t,e){return"white"!=t&&"#ffffff"!=t||"#ffffff"!=e&&"white"!=e?t:"#eeeeee"}function avoid_collision(t){const e=avoid_collision;if(e.reset||(e.reset=()=>e.cache={by_wall:{},by_event:{}}),e.cache||(e.cache={by_wall:{},by_event:{}}),e.cache.by_event[t.id])return e.cache.by_event[t.id];const o={"Bouldering 3D":6,"Bouldering Prow":7,"*":8},n=o[t.category]||o["*"],r=e.cache.by_wall,l=e.cache.by_event,c=d3.select("#"+t.wall).node(),i=c.getTotalLength(),a=Math.round(t.offset/n)*n;r[t.wall]||(r[t.wall]={});const s=r[t.wall];if(!s[a])return s[a]=!0,l[t.id]=c.getPointAtLength(a),l[t.id];for(let e=2;;++e){const o=a+Math.trunc(e/2)*(e%2==0?1:-1)*n;if(!s[o]&&o>=0&&o<=i)return s[o]=!0,l[t.id]=c.getPointAtLength(o),l[t.id];if(e>100)return console.log("Couldn't avoid a collision with data:"),console.log(t),{x:t.x,y:t.y}}}function point_distance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function get_length_at_point(t,e,o){return function e(o,n,r,l,c,i){const a=(o+n)/2;if(n-o<l)return c?{length:a,distance:i}:a;const s=[],f=(n-o)/49;let d;for(let e=0;e<50;++e){const n=o+f*e,l=t.getPointAtLength(n),c=point_distance(l,r);s.push({length:n,point:l,distance:c}),(void 0===d||c<s[d].distance)&&(d=e)}return e(s[0==d?0:d-1].length,s[49==d?d:d+1].length,r,l,c,s[d].distance)}(0,t.getTotalLength(),e=void 0===e.x?{x:e[0],y:e[1]}:e,.001,o)}function hover(t,e){const o=$("#info_div"),n=$("#svg_container svg"),r=n.get(0).getBoundingClientRect(),l=n.get(0).getScreenCTM(),c=["x","y","offset","route_id","id","wall","start_date","end_date","event"];let i=l.a*e.x+l.c*e.y+l.e-r.x,a=l.b*e.x+l.d*e.y+l.f-r.y,s="";Object.keys(t).forEach(e=>{if(c.includes(e)||""==t[e])return;let o=t[e];if("route_color"==e&&(bg_color=get_color(t.route_color),border_color=contrast_color(get_color(t.route_color),"white"),style=`border-color:${border_color};background-color:${bg_color}`,o=`<div class='swatch_color' style='${style}'></div> ${o}`),"rating"==e){if(!o)return;o+=" / 5"}s+=`<div>${e}: ${o}</div>\n`}),o.html(s),e.x>n.outerWidth()/2&&(i-=o.outerWidth(!0)),e.y>n.outerHeight()/2&&(a-=o.outerHeight(!0)),d3.select("#info_div").transition().duration(100).style("opacity",1).style("border-color",contrast_color(get_color(t.route_color),"white")).style("left",i+"px").style("top",a+"px")}
