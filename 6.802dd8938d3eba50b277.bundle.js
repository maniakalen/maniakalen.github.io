(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{9:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return i}));var n=s(1),c=s(0);class i extends n.a{constructor(){super(),this.event=null,this.name="searcher",this.contentBlock=document.createElement("div"),this.contentBlock.classList.add("content-block","content-searcher"),this.addNavigationBlock(this.contentBlock),this.addNavigationTitle("Buscador"),this.searchDiv=document.createElement("div"),this.searchDiv.classList.add("search-box"),this.searchInput=document.createElement("input"),this.searchInput.classList.add("search-input"),this.searchInput.placeholder="Nombre de usuario",this.searchDiv.appendChild(this.searchInput),this.searchInput.addEventListener("keyup",e=>{this.searchInput.value.length>3&&conector.searchUser(this.searchInput.value,this.event.id).then(e=>{e.success&&(cleaner(this.resultsBlock),e.data.forEach(e=>{this.resultsBlock.appendChild(this.addUserLine(e))}))})},!1),this.contentBlock.appendChild(this.searchDiv),this.resultsBlock=document.createElement("div"),this.resultsBlock.classList.add("results-list"),this.contentBlock.appendChild(this.resultsBlock)}show(e){nav.backupPage(this),this.container&&this.container.contains(this.content)||super.show(e),cleaner(this.content),this.content.appendChild(this.contentBlock)}createAnswerButton(e,t){let s=document.createElement("button");return s.classList.add("answer-option"),s.addEventListener("click",()=>{conector.setAnswer(e,t.id).then(e=>c.snackbar.show(e.message))},!1),s.innerText=t.name,s}getEvent(){return this.event}setEvent(e){return this.event=e}addUserLine(e){let t=document.createElement("div");t.classList.add("result-item");let s=document.createElement("button");s.classList.add("check-in-user"),"1"===e.ischecked&&s.classList.add("user-checked"),s.addEventListener("click",t=>{conector.checkUser(e.usrlogin,this.event.id).then(e=>{e.success&&s.classList.add("user-checked"),c.snackbar.show(e.message)})},!1),t.appendChild(s);let n=document.createElement("div");n.classList.add("list-item-content"),t.appendChild(n);let i=document.createElement("div");i.classList.add("item-names"),i.innerText=e.usrname+" "+e.usrsurname,n.appendChild(i);let a=document.createElement("div");return a.classList.add("item-username"),a.innerText="("+e.usrlogin+")",n.appendChild(a),t}}}}]);