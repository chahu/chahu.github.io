"use strict";function init(t){const e=t.select("svg");function o(t,o,n){const s=n[o],c=d3.mouse(e.node()),a=get_length_at_point(s,c),i=s.getPointAtLength(a),r=`${$(s).attr("id")} : ${a.toFixed(3)} (${i.x.toFixed(3)}, ${i.y.toFixed(3)})`;console.log(r),$("#info").text(r),e.select("circle.mouse").attr("cx",i.x).attr("cy",i.y)}e.append("circle").attr("class","mouse").attr("fill","none").attr("stroke","red").attr("stroke-width","1").attr("cx",-100).attr("cy",-100).attr("r",5),d3.selectAll("svg g path").on("mouseover",o).on("mousemove",o);for(const t of $("svg g")){const e=t.getAttribute("id"),o=e+"-check",n="none"!=$(t).css("display");e.match("^avatar")||($(`<span><input type='checkbox' id='${o}'><label for='${o}'>${e}</label></span>`).appendTo($("#layers-div")),$("#"+o).prop("checked",n).change(()=>{$("#"+o)[0].checked?$(t).css("display","inline"):$(t).css("display","none")}))}}$(document).ready(async()=>{const t=d3.select("#svg-container");load_svg(t).then(e=>init(t))});
