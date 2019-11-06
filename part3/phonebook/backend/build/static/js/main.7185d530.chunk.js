(window.webpackJsonpphonebook_frontend=window.webpackJsonpphonebook_frontend||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),c=t.n(o),u=t(14),l=t(2),i=function(e){var n=e.newName,t=e.newNumber,r=e.addNameEventHandler,o=e.newNameEventHandler,c=e.newNumberEventHandler;return console.log("Rendering PersonForm..."),a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"Name: ",a.a.createElement("input",{value:n,onChange:o})),a.a.createElement("div",null,"Number: ",a.a.createElement("input",{value:t,onChange:c})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.search,t=e.searchEventHandler;return console.log("Rendering Filter..."),a.a.createElement("div",null,"filter shown with ",a.a.createElement("input",{value:n,onChange:t}))},s=function(e){var n=e.Name,t=e.Number,r=e.deleteEventHandler;return console.log("Rendering Person..."),a.a.createElement("div",null,n," : ",t," ",a.a.createElement("button",{onClick:r},"delete"))},m=function(e){var n=e.persons,t=e.search,r=e.deleteEventHandler;console.log("Rendering Persons...");var o=function(){return n.filter((function(e){return""===t||e.name.toUpperCase().includes(t.toUpperCase())})).map((function(e){return a.a.createElement(s,{key:e.id,Name:e.name,Number:e.number,deleteEventHandler:function(){r(e)}})}))};return a.a.createElement("div",null,o())},f=function(e){var n=e.notice;return null===n||void 0===n?null:a.a.createElement("p",{className:!0===n.isError?"error":"success"},n.message)},p=t(3),b=t.n(p),v="/api/persons",E=function(){return b.a.get(v).then((function(e){return e.data}))},h=function(e){return b.a.post(v,e).then((function(e){return e.data}))},g=function(e){return b.a.delete("".concat(v,"/").concat(e)).then((function(e){return e.status}))},w=function(e){return b.a.put("".concat(v,"/").concat(e.id),e).then((function(e){return e.data}))};function O(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var j=function(){var e=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];J({message:e,isError:n}),setTimeout((function(){J(null)}),5e3)},n=function(){N(""),k(""),R("")},t=function(e){p(s.filter((function(n){return n.id!==e})))},o=Object(r.useState)([]),c=Object(l.a)(o,2),s=c[0],p=c[1],b=Object(r.useState)(""),v=Object(l.a)(b,2),j=v[0],N=v[1],y=Object(r.useState)(""),P=Object(l.a)(y,2),H=P[0],k=P[1],C=Object(r.useState)(""),S=Object(l.a)(C,2),D=S[0],R=S[1],A=Object(r.useState)(null),F=Object(l.a)(A,2),I=F[0],J=F[1];Object(r.useEffect)((function(){E().then((function(e){p(e)})).catch((function(n){e("Error: Can't get persons",!0)}))}),[]);return console.log("Rendering Application..."),a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(f,{notice:I}),a.a.createElement(d,{search:D,searchEventHandler:function(e){R(e.target.value)}}),a.a.createElement("h3",null,"Add a new"),a.a.createElement(i,{newName:j,newNumber:H,addNameEventHandler:function(t){t.preventDefault();var r=s.find((function(e){return e.name===j}));if(void 0!==r)if(r.number!==H){if(window.confirm("".concat(j," is already added to phonebook, replace the old number with a new one?"))){var a=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?O(t,!0).forEach((function(n){Object(u.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},r,{number:H});w(a).then((function(t){p(s.map((function(e){return e.id!==t.id?e:t}))),console.log("Person changed",t),e("Changed ".concat(t.name)),n()})).catch((function(n){e("Error: Can't update the person",!0)}))}}else alert("".concat(j," is already added to phonebook"));else h(function(e,n){return{name:e,number:n}}(j,H)).then((function(t){p(s.concat(t)),console.log("Person created",t),e("Added ".concat(t.name)),n()})).catch((function(n){e("Error: Can't add a new person. "+n.response.data.error,!0)}))},newNameEventHandler:function(e){N(e.target.value)},newNumberEventHandler:function(e){k(e.target.value)}}),a.a.createElement("h3",null,"Numbers"),a.a.createElement(m,{persons:s,search:D,deleteEventHandler:function(n){window.confirm("Delete ".concat(n.name," ?"))&&g(n.id).then((function(r){t(n.id),console.log("Person deleted",n),e("Deleted ".concat(n.name))})).catch((function(r){t(n.id),e("Information of ".concat(n.name," has already been removed from server."),!0)}))}}))};t(37);console.log("Part3: 20"),console.log("Starting Application ["+(new Date).toLocaleTimeString()+"]"),c.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.7185d530.chunk.js.map