import{P as m}from"./ProductService-c3f21ab6.js";import{_ as u,r as i,o as _,b as h,c as v,d as b,e as a,f as g,g as c,p as x,k as S}from"./index-c7ae716c.js";class k{getImages(){return fetch("demo/data/photos.json").then(t=>t.json()).then(t=>t.data)}}const V=e=>(x("data-v-37c2751c"),e=e(),S(),e),f={class:"grid p-fluid"},I={class:"col-12"},w={class:"card"},y=V(()=>a("h5",null,"Galleria",-1)),M=["src","alt"],B=["src","alt"],G={__name:"Media",setup(e){const t=i([]),n=i([]),l=i([{breakpoint:"1024px",numVisible:5},{breakpoint:"960px",numVisible:4},{breakpoint:"768px",numVisible:3},{breakpoint:"560px",numVisible:1}]);i([{breakpoint:"1024px",numVisible:3,numScroll:3},{breakpoint:"768px",numVisible:2,numScroll:2},{breakpoint:"560px",numVisible:1,numScroll:1}]);const r=new m,p=new k;return _(()=>{r.getProductsSmall().then(o=>t.value=o),p.getImages().then(o=>n.value=o)}),(o,O)=>{const d=h("Galleria");return v(),b("div",f,[a("div",I,[a("div",w,[y,g(d,{value:n.value,responsiveOptions:l.value,numVisible:7,circular:!0,containerStyle:"max-width: 800px; margin: auto"},{item:c(s=>[a("img",{src:s.item.itemImageSrc,alt:s.item.alt,style:{width:"100%",display:"block"}},null,8,M)]),thumbnail:c(s=>[a("img",{src:s.item.thumbnailImageSrc,alt:s.item.alt,tyle:"width: 100%; display: block;"},null,8,B)]),_:1},8,["value","responsiveOptions"])])])])}}},N=u(G,[["__scopeId","data-v-37c2751c"]]);export{N as default};