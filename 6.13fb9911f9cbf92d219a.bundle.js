(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{9:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return c}));var n=s(1),a=s(0);class c extends n.a{constructor(){super(),this.name="searcher",this.contentBlock=document.createElement("div"),this.contentBlock.classList.add("content-block","content-searcher"),this.addNavigationBlock(this.contentBlock),this.addNavigationTitle("Buscador"),this.searchDiv=document.createElement("div"),this.searchDiv.classList.add("search-box"),this.searchInput=document.createElement("input"),this.searchInput.classList.add("search-input"),this.searchInput.placeholder="Nombre de usuario",this.searchDiv.appendChild(this.searchInput);var e=document.createElement("button");e.classList.add("search-user"),this.searchDiv.appendChild(e),e.addEventListener("click",e=>{conector.checkUser(this.searchInput.value).then(e=>{if(!0===(e={success:!0,username:"Paula",usersurname:"some other name"}).success){let t=document.createElement("div");t.classList.add("user-list-item");let s=document.createElement("button");s.classList.add("check-in-user"),t.appendChild(s);let n=document.createElement("div");n.classList.add("data-item"),t.appendChild(n);let a=document.createElement("div");a.classList.add("user-name-item"),a.innerText=e.username+" "+e.usersurname,n.appendChild(a);let c=document.createElement("div");c.classList.add("u-name-item"),c.innerText="("+this.searchInput.value+")",n.appendChild(c),this.contentBlock.appendChild(t)}else a.snackbar.show(e.message)})},!1),this.contentBlock.appendChild(this.searchDiv)}show(e){nav.backupPage(this),this.container&&this.container.contains(this.content)||super.show(e),cleaner(this.content),this.content.appendChild(this.contentBlock)}}}}]);