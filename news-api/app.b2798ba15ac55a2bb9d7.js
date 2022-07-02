(()=>{"use strict";var t;!function(t){t[t.OK=200]="OK",t[t["Bad Request"]=400]="Bad Request",t[t.Unauthorized=401]="Unauthorized",t[t["Too Many Requests"]=429]="Too Many Requests",t[t["Server Error"]=500]="Server Error"}(t||(t={}));function e(t,e="div"){const s=document.createElement(e);return s.className=t,s}(new class extends class extends class{constructor(t="https://nodenews.herokuapp.com/",e={apiKey:"5047a34f4b7b485e99531f450503d77b"}){this.baseLink=t,this.options=e}getResp({endpoint:t,options:e={}},s=(()=>{console.error("No callback for GET response")})){this.load("GET",t,s,e)}makeUrl(t,e){const s=Object.assign(Object.assign({},this.options),t);let n=`${this.baseLink}${e}?`;return Object.keys(s).forEach((t=>{n+=`${t}=${s[t]}&`})),n.slice(0,-1)}load(t,e,s,n){fetch(this.makeUrl(n,e),{method:t}).then(this.errorHandler).then((t=>t.json())).then((t=>s(t))).catch((t=>console.error(t)))}errorHandler(e){return e.ok||(e.status in Object.values(t)?console.log(`${e.status} error: ${e.statusText}`):console.log(`Unknown Error: ${e.statusText}`)),e}}{constructor(){super(),this.memorizer=new class{getStorage(t){const e=sessionStorage.getItem(t);return e?JSON.parse(e):null}setStorage(t,e){sessionStorage.setItem(t,JSON.stringify(e))}},this.appData=new class{constructor(t=[],e=[]){this.news=t,this.sources=e}set(t){"articles"in t?this.news=t.articles:this.sources=t.sources}sort(t){const e=new RegExp(`^${t}`,"i");return this.sources.filter((t=>t.name.match(e)))}newsPage(t){return this.news.slice(10*t,10*t+10)}},this.appView=new class{constructor(){this.news=new class{draw(t){const s=document.querySelector(".news");if(s.innerHTML="",!t.length){const t=e("message");return t.textContent="Sorry, no news found",void s.append(t)}t.forEach(((t,n)=>{const a=e("news__item");n%2&&a.classList.add("alt");const r=e("news__meta"),o=e("news__meta-photo");o.style.backgroundImage=`url(${t.urlToImage||"./assets/news_placeholder.jpg"})`;const i=e("news__meta-details","ul"),c=e("news__meta-author","li");c.textContent=t.author||t.source.name;const p=e("news__meta-date","li");p.textContent=t.publishedAt.slice(0,10).split("-").reverse().join("-"),i.append(c,p),r.append(o,i);const u=e("news__description"),h=e("news__description-title","h2");h.textContent=t.title;const l=e("news__description-source","h3");l.textContent=t.source.name;const d=e("news__description-content","p");d.innerHTML=t.description;const g=e("news__read-more","p");g.innerHTML=`<a href=${t.url} target="_blank">Read More</a>`,u.append(h,l,d,g),a.append(r,u),s.append(a)})),s.scrollIntoView(!0)}},this.sources=new class{draw(t){const s=document.querySelector(".sources__buttons");if(s.innerHTML="",!t.length){const t=e("message");return t.textContent="Sorry, no sources found",void s.append(t)}t.forEach((t=>{const n=e("source__item");n.setAttribute("data-source-id",t.id);const a=e("source__item-name");a.textContent=t.name,n.append(a),s.append(n)}))}},this.alphabet=new class{constructor(){this.alphabet="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"}draw(){const t=document.querySelector(".sources__headers");return this.alphabet.split(" ").forEach((s=>{const n=e("sources__headers-item");n.textContent=s,t.append(n)})),t}}}},this.pagination=new class{constructor(t=0,e=0){this.page=t,this.pages=e,this.nextButton=document.getElementById("next"),this.prevButton=document.getElementById("prev"),this.buttons=[this.prevButton,this.nextButton]}new(t){this.buttons.forEach((t=>t.classList.remove("active"))),this.pages=Math.floor(t/10),this.page=0,this.pages>0&&this.nextButton.classList.add("active")}leaf(t){return t.target===this.nextButton&&(this.page+=1),t.target===this.prevButton&&(this.page-=1),this.page===this.pages?this.nextButton.classList.remove("active"):0===this.page?this.prevButton.classList.remove("active"):this.buttons.forEach((t=>t.classList.add("active"))),this.page}}}init(){super.getResp({endpoint:"top-headlines/sources"},(t=>{this.appData.set(t),this.appView.sources.draw(this.appData.sort("A"))})),this.appView.alphabet.draw().addEventListener("click",(t=>this.getSources(t)))}getSources(t){const e=t.target.textContent;if(!e)return;const s=this.appData.sort(e);this.appView.sources.draw(s)}getNews(t){let e=t.target;const s=t.currentTarget;for(;e!==s;){if(e.classList.contains("source__item")){const t=e.getAttribute("data-source-id");if(s.getAttribute("data-source")!==t){s.setAttribute("data-source",t);const e=this.memorizer.getStorage(t);e?(this.appData.news=e,this.pagination.new(e.length),this.appView.news.draw(this.appData.newsPage(0))):super.getResp({endpoint:"everything",options:{sources:t}},(e=>{this.appData.set(e),this.memorizer.setStorage(t,this.appData.news),this.pagination.new(this.appData.news.length),this.appView.news.draw(this.appData.newsPage(0))}))}return}e=e.parentElement}}leaf(t){if(t.target===t.currentTarget)return;const e=this.pagination.leaf(t);this.appView.news.draw(this.appData.newsPage(e))}}{start(){super.init(),document.querySelector(".sources").addEventListener("click",(t=>super.getNews(t))),document.querySelector(".pagination").addEventListener("click",(t=>super.leaf(t)))}}).start()})();