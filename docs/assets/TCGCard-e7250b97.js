import{j as r,aG as y,$ as u,a9 as rt,aH as nt,Z as l,aI as A,a0 as D,r as _}from"./index-7e977a80.js";import{g as st}from"./quizUtils-caec836a.js";const p={WIDTH:330,HEIGHT:450,BORDER_RADIUS:8,BORDER_WIDTH:4,MARGIN_Y:16,MARGIN_BOTTOM:8,PADDING:6.4,FONT_SIZE:18,IMAGE_WIDTH:200,IMAGE_HEIGHT:276,INFO_LEFT:-10,INFO_BOTTOM:-5,INFO_FULL_ART_LEFT:-110,INFO_FULL_ART_BOTTOM:-340,INFO_WIDTH:220,INFO_BORDER_RADIUS:15,INFO_PADDING_X:8,INFO_PADDING_Y:.8,INFO_FONT_SIZE:10,STAR_LEFT:2,STAR_SIZE:10,STAR_STROKE_WIDTH:1.5,ID_LEFT:2,ID_BOTTOM:0,ID_FONT_SIZE:8,SLIDE_OUT_DISTANCE:-500},b={TOP:125,LEFT_DEFAULT:-160,LEFT_FULL_ART:-250,BORDER_RADIUS:14,HEIGHT:50,WIDTH:270,PADDING_Y:.5*8,PADDING_X:2*8,FONT_SIZE_NORMAL:18,FONT_SIZE_LONG:14,LONG_TEXT_THRESHOLD:30},E=({zIndex:n,art:s="default",size:i=1})=>{const d=p.STAR_SIZE*i,o=p.STAR_STROKE_WIDTH*i;return r.jsxs("svg",{width:d,height:d,viewBox:"0 0 25 25",style:{zIndex:n},children:[s==="default"&&r.jsx("defs",{children:r.jsxs("linearGradient",{id:"starGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"12%",stopColor:"rgba(242, 216, 111, 1)"}),r.jsx("stop",{offset:"41%",stopColor:"rgba(244, 223, 139, 1)"}),r.jsx("stop",{offset:"57%",stopColor:"rgba(247, 234, 181, 1)"}),r.jsx("stop",{offset:"83%",stopColor:"rgba(242, 216, 111, 1)"}),r.jsx("stop",{offset:"91%",stopColor:"rgba(242, 216, 111, 1)"})]})}),s==="full"&&r.jsx("defs",{children:r.jsxs("linearGradient",{id:"starGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"12%",stopColor:"rgba(218, 218, 218, 1)"}),r.jsx("stop",{offset:"41%",stopColor:"rgba(232, 230, 223, 1)"}),r.jsx("stop",{offset:"57%",stopColor:"rgba(248, 248, 249, 1)"}),r.jsx("stop",{offset:"83%",stopColor:"rgba(218, 218, 218, 1)"}),r.jsx("stop",{offset:"91%",stopColor:"rgba(218, 218, 218, 1)"})]})}),r.jsx("polygon",{points:"12.5,2 15.5,9.5 23.5,9.5 17,14.5 19.5,22.5 12.5,17 5.5,22.5 8,14.5 1.5,9.5 9.5,9.5",fill:"url(#starGradient)",stroke:"black",strokeWidth:o})]})};function N(n){const s=n.Genre.split(" "),i=[];return s.includes("Action")&&i.push(u.cards.bg.action),s.includes("Comedy")&&i.push(u.cards.bg.comedy),(s.includes("Romance")||s.includes("Romantic"))&&i.push(u.cards.bg.romance),s.includes("Drama")&&i.push(u.cards.bg.drama),(s.includes("Fantasy")||s.includes("Adventure"))&&i.push(u.cards.bg.fantasy),s.includes("Fighting-Shounen")&&i.push(u.cards.bg.shounen),(s.includes("Supernatural")||s.includes("Horror"))&&i.push(u.cards.bg.supernatural),i.length===1&&i.push(y(i[0],.3)),i.length===0&&i.push(u.cards.bg.default,y(u.cards.bg.default,.3)),i}async function gt(n){const d="./assets/tcg/"+(n.toString()+"_full_art")+".webp";return new Promise(o=>{const h=new Image;h.onload=()=>o(d),h.onerror=()=>o(""),h.src=d})}function it(n){return"./assets/tcg/"+(n.toString()+"_full_art")+".webp"}function $t(n,s,i,d){const o=i==="full"?"F":"N";let h="";switch(s){case"Common":h="C";break;case"Uncommon":h="U";break;case"Rare":h="R";break;case"SuperRare":h="SR";break;case"UltraRare":h="UR";break;case"SecretRare":h="SSR";break}return`${d}-${n}-${h}-${o}`}function ut(n){const s=rt();s&&(s.collection?(s.collection.cards.push(n),s.collection.totalCards+=1,s.collection.lastUpdated=new Date().toISOString()):s.collection={cards:[n],totalCards:1,lastUpdated:new Date().toISOString()},nt(s))}function xt(n,s){return n.filter(i=>s.mainAnime.includes(i.Anime_Id))}const ot=({card:n,text:s,isFullArt:i,size:d=1})=>{const o=s.length>b.LONG_TEXT_THRESHOLD,h=b.TOP*d,I=i?b.LEFT_FULL_ART*d:b.LEFT_DEFAULT*d,x=`${b.BORDER_RADIUS*d}px`,e=`${b.HEIGHT*d}px`,t=`${b.WIDTH*d}px`,$=b.PADDING_Y*d/8,a=b.PADDING_X*d/8,g=(o?b.FONT_SIZE_LONG:b.FONT_SIZE_NORMAL)*d;return r.jsx(l,{sx:{display:"flex",position:"absolute",top:h,left:I},children:r.jsxs(l,{sx:{borderRadius:x,display:"flex",alignItems:"center",justifyContent:"center",transform:"rotate(90deg)",height:e,maxWidth:t,minWidth:t,width:t,paddingY:$,paddingX:a},children:[i&&r.jsx(l,{sx:{background:`linear-gradient(90deg,${A(u.cards.rare,.3)} 0%, ${u.cards.rare} 50%, ${A(u.cards.rare,.3)} 100%)`,position:"absolute",minWidth:"100%",height:"100%",borderRadius:x,zIndex:-1,opacity:.8}}),r.jsx(D,{sx:{fontFamily:'"Exo 2", sans-serif',fontSize:g,color:A(N(n.character)[0],.3),whiteSpace:o?"normal":"nowrap",wordBreak:o?"break-word":"normal",textAlign:"center",lineHeight:1.2},children:s})]})})},lt=({width:n="330px",height:s="450px",intensity:i=.5,enabled:d=!0,animating:o=!0})=>{const[h,I]=_.useState(0);if(_.useEffect(()=>{if(!o)return;const t=Date.now(),$=()=>{const g=(Date.now()-t)/2e3;I(g),requestAnimationFrame($)},a=requestAnimationFrame($);return()=>cancelAnimationFrame(a)},[o]),!d)return null;const e=-25+Math.sin(h*Math.PI/5)*40;return r.jsx(l,{sx:{position:"absolute",left:0,top:0,width:n,height:s,overflow:"hidden",pointerEvents:"none",zIndex:100,backfaceVisibility:"hidden"},children:r.jsx(l,{sx:{background:"black",position:"absolute",inset:0,width:"100%",height:"100%",backgroundPosition:"center",mixBlendMode:"color-dodge",opacity:i*.1,backgroundImage:`linear-gradient(
                        ${e}deg,
                        hsl(0, 0%, 0%) 0%,
                        hsl(0, 0%, 0%) 10%,
                        hsl(275, 100%, 60%) 20%,
                        hsl(240, 100%, 70%) 30%,
                        hsl(180, 100%, 60%) 40%,
                        hsl(120, 100%, 50%) 50%,
                        hsl(60, 100%, 50%) 60%,
                        hsl(30, 100%, 50%) 70%,
                        hsl(0, 100%, 50%) 80%,
                        hsl(0, 0%, 0%) 90%,
                        hsl(0, 0%, 0%) 100%
                    )`,transition:"background-image 0.1s linear"},children:r.jsx(l,{sx:{background:"black",mixBlendMode:"multiply",position:"absolute",inset:0,width:"100%",height:"100%",backgroundPosition:"center",backgroundImage:`repeating-linear-gradient(
                            ${e+115}deg,
                            hsl(0, 0%, 0%) 0px,
                            hsl(0, 0%, 100%) 1px,
                            hsl(0, 0%, 100%) 3px,
                            hsl(0, 0%, 0%) 4px,
                            hsl(0, 0%, 0%) 8px
                        )`,transition:"background-image 0.1s linear"}})})})},ct=({width:n,height:s,intensity:i=.5,enabled:d=!0,animating:o=!1})=>{const[h,I]=_.useState(0);if(_.useEffect(()=>{if(!o)return;const F=Date.now(),T=()=>{const m=(Date.now()-F)/1e3;I(m),requestAnimationFrame(T)},k=requestAnimationFrame(T);return()=>cancelAnimationFrame(k)},[o]),!d)return null;const x=o?Math.sin(h*Math.PI/5)*40:0,e=50+x*.5,t=50+(o?Math.cos(h*Math.PI/5)*20:0),$=50+x*.8,a=50+(o?Math.sin(h*Math.PI/5)*15:0),g=1.2,f=200;return r.jsxs(l,{sx:{position:"absolute",left:0,top:0,width:n,height:s,pointerEvents:"none",overflow:"hidden",borderRadius:"8px",zIndex:50},children:[r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",background:`
            repeating-linear-gradient(
              45deg,
              hsla(0,0%,100%, 0.05) 0%,
              hsla(0,0%,100%, 0.05) ${g}%,
              hsla(0,0%,100%, 0.15) ${g+.01}%,
              hsla(0,0%,100%, 0.15) ${g*2}%,
              hsla(0,0%,100%, 0.08) ${g*2+.01}%,
              hsla(0,0%,100%, 0.08) ${g*3}%,
              hsla(0,0%,100%, 0.05) ${g*3+.01}%,
              hsla(0,0%,100%, 0.05) ${g*4}%
            ),
            repeating-linear-gradient(
              -45deg,
              hsla(0,0%,100%, 0.05) 0%,
              hsla(0,0%,100%, 0.05) ${g}%,
              hsla(0,0%,100%, 0.15) ${g+.01}%,
              hsla(0,0%,100%, 0.15) ${g*2}%,
              hsla(0,0%,100%, 0.08) ${g*2+.01}%,
              hsla(0,0%,100%, 0.08) ${g*3}%,
              hsla(0,0%,100%, 0.05) ${g*3+.01}%,
              hsla(0,0%,100%, 0.05) ${g*4}%
            )
          `,backgroundSize:"210% 210%, 210% 210%",backgroundPosition:`
            ${($-50)*1.5+50}% ${(a-50)*1.5+50}%,
            ${($-50)*1.5+50}% ${(a-50)*1.5+50}%
          `,mixBlendMode:"overlay",opacity:i*.6}}),r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",background:`
            repeating-linear-gradient(
              55deg,
              hsla(3, 95%, 85%, 0.15) ${f*1}px,
              hsla(207, 100%, 84%, 0.15) ${f*2}px,
              hsla(29, 100%, 85%, 0.15) ${f*3}px,
              hsla(160, 100%, 86%, 0.15) ${f*4}px,
              hsla(309, 94%, 87%, 0.15) ${f*5}px,
              hsla(188, 95%, 85%, 0.15) ${f*6}px,
              hsla(3, 95%, 85%, 0.15) ${f*7}px
            )
          `,backgroundSize:"400% 100%",backgroundPosition:`
            ${($-50)*-2.5+50}% ${(a-50)*-2.5+50}%
          `,mixBlendMode:"screen",opacity:i*.4}}),r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",background:`
            radial-gradient(
              farthest-corner circle at ${e}% ${t}%,
              hsla(0, 0%, 100%, 0.2) 0%,
              transparent 50%
            )
          `,mixBlendMode:"overlay",opacity:i*.5}})]})},dt=({width:n,height:s,intensity:i=.5,enabled:d=!0,animating:o=!1})=>{const[h,I]=_.useState(0);if(_.useEffect(()=>{if(!o)return;const g=Date.now(),f=()=>{const T=(Date.now()-g)/1e3;I(T),requestAnimationFrame(f)},F=requestAnimationFrame(f);return()=>cancelAnimationFrame(F)},[o]),!d)return null;const e=50+(o?Math.sin(h*Math.PI/5)*40:0)*.8,t=50+(o?Math.sin(h*Math.PI/5)*15:0),$=o?h*2%1:.5,a=o?Math.sin($*Math.PI*2)*.5+.5:.6;return r.jsxs(l,{sx:{position:"absolute",left:0,top:0,width:n,height:s,pointerEvents:"none",overflow:"hidden",borderRadius:"8px",zIndex:60},children:[r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",background:`
            radial-gradient(circle at 12% 18%, hsla(0, 0%, 100%, ${a*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 22% 25%, hsla(60, 100%, 90%, ${a*.9}) 0%, transparent 0.7%),
            radial-gradient(circle at 8% 35%, hsla(180, 100%, 90%, ${a*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 18% 48%, hsla(0, 0%, 100%, ${a*.85}) 0%, transparent 0.7%),
            radial-gradient(circle at 15% 62%, hsla(120, 100%, 90%, ${a*.9}) 0%, transparent 0.8%),
            radial-gradient(circle at 25% 75%, hsla(300, 100%, 90%, ${a*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 10% 88%, hsla(200, 100%, 90%, ${a*.85}) 0%, transparent 0.7%),
            
            radial-gradient(circle at 38% 12%, hsla(0, 0%, 100%, ${a*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 45% 28%, hsla(270, 100%, 90%, ${a*.9}) 0%, transparent 0.8%),
            radial-gradient(circle at 42% 42%, hsla(0, 0%, 100%, ${a*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 35% 58%, hsla(45, 100%, 90%, ${a*.85}) 0%, transparent 0.75%),
            radial-gradient(circle at 48% 68%, hsla(180, 100%, 90%, ${a*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 40% 82%, hsla(0, 0%, 100%, ${a*.9}) 0%, transparent 0.7%),
            
            radial-gradient(circle at 58% 8%, hsla(60, 100%, 90%, ${a*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 65% 22%, hsla(0, 0%, 100%, ${a*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 62% 38%, hsla(300, 100%, 90%, ${a*.9}) 0%, transparent 0.8%),
            radial-gradient(circle at 55% 52%, hsla(120, 100%, 90%, ${a*.85}) 0%, transparent 0.75%),
            radial-gradient(circle at 68% 65%, hsla(0, 0%, 100%, ${a*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 60% 78%, hsla(200, 100%, 90%, ${a*.9}) 0%, transparent 0.8%),
            radial-gradient(circle at 58% 92%, hsla(270, 100%, 90%, ${a*.85}) 0%, transparent 0.75%),
            
            radial-gradient(circle at 78% 15%, hsla(0, 0%, 100%, ${a*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 85% 28%, hsla(180, 100%, 90%, ${a*.9}) 0%, transparent 0.75%),
            radial-gradient(circle at 82% 45%, hsla(45, 100%, 90%, ${a*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 75% 58%, hsla(0, 0%, 100%, ${a*.85}) 0%, transparent 0.7%),
            radial-gradient(circle at 88% 72%, hsla(60, 100%, 90%, ${a*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 80% 85%, hsla(300, 100%, 90%, ${a*.9}) 0%, transparent 0.8%),
            radial-gradient(circle at 92% 95%, hsla(0, 0%, 100%, ${a*.85}) 0%, transparent 0.7%)
          `,backgroundPosition:`
            ${e*.4+8}% ${t*.3+15}%,
            ${e*-.3+18}% ${t*.4+22}%,
            ${e*.5+5}% ${t*-.2+32}%,
            ${e*-.4+15}% ${t*.5+45}%,
            ${e*.3+12}% ${t*-.3+59}%,
            ${e*-.5+22}% ${t*.4+72}%,
            ${e*.4+7}% ${t*-.4+85}%,
            
            ${e*-.3+35}% ${t*.5+9}%,
            ${e*.4+42}% ${t*-.2+25}%,
            ${e*-.4+39}% ${t*.3+39}%,
            ${e*.5+32}% ${t*-.4+55}%,
            ${e*-.3+45}% ${t*.4+65}%,
            ${e*.3+37}% ${t*-.5+79}%,
            
            ${e*-.4+55}% ${t*.5+5}%,
            ${e*.5+62}% ${t*-.3+19}%,
            ${e*-.5+59}% ${t*.4+35}%,
            ${e*.4+52}% ${t*-.4+49}%,
            ${e*-.3+65}% ${t*.3+62}%,
            ${e*.5+57}% ${t*-.5+75}%,
            ${e*-.4+55}% ${t*.4+89}%,
            
            ${e*.5+75}% ${t*-.3+12}%,
            ${e*-.4+82}% ${t*.4+25}%,
            ${e*.4+79}% ${t*-.5+42}%,
            ${e*-.5+72}% ${t*.5+55}%,
            ${e*.3+85}% ${t*-.3+69}%,
            ${e*-.4+77}% ${t*.4+82}%,
            ${e*.5+89}% ${t*-.4+92}%
          `,mixBlendMode:"screen",opacity:i*1,filter:"blur(0.5px)"}}),r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",background:`
            radial-gradient(circle at 15% 12%, hsla(0, 0%, 100%, ${(1-a)*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 5% 28%, hsla(270, 100%, 90%, ${(1-a)*.9}) 0%, transparent 0.7%),
            radial-gradient(circle at 20% 42%, hsla(180, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 10% 55%, hsla(45, 100%, 90%, ${(1-a)*.85}) 0%, transparent 0.75%),
            radial-gradient(circle at 18% 70%, hsla(0, 0%, 100%, ${(1-a)*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 8% 85%, hsla(60, 100%, 90%, ${(1-a)*.9}) 0%, transparent 0.8%),
            
            radial-gradient(circle at 32% 8%, hsla(120, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 42% 22%, hsla(0, 0%, 100%, ${(1-a)*.9}) 0%, transparent 0.7%),
            radial-gradient(circle at 38% 38%, hsla(300, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 48% 52%, hsla(200, 100%, 90%, ${(1-a)*.85}) 0%, transparent 0.75%),
            radial-gradient(circle at 35% 68%, hsla(0, 0%, 100%, ${(1-a)*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 45% 88%, hsla(180, 100%, 90%, ${(1-a)*.9}) 0%, transparent 0.8%),
            
            radial-gradient(circle at 62% 15%, hsla(0, 0%, 100%, ${(1-a)*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 55% 32%, hsla(45, 100%, 90%, ${(1-a)*.9}) 0%, transparent 0.7%),
            radial-gradient(circle at 68% 48%, hsla(270, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 58% 62%, hsla(0, 0%, 100%, ${(1-a)*.85}) 0%, transparent 0.75%),
            radial-gradient(circle at 65% 78%, hsla(60, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.7%),
            
            radial-gradient(circle at 85% 10%, hsla(300, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.8%),
            radial-gradient(circle at 78% 25%, hsla(0, 0%, 100%, ${(1-a)*.9}) 0%, transparent 0.75%),
            radial-gradient(circle at 88% 42%, hsla(120, 100%, 90%, ${(1-a)*1}) 0%, transparent 0.7%),
            radial-gradient(circle at 82% 58%, hsla(180, 100%, 90%, ${(1-a)*.85}) 0%, transparent 0.8%),
            radial-gradient(circle at 75% 75%, hsla(0, 0%, 100%, ${(1-a)*1}) 0%, transparent 0.75%),
            radial-gradient(circle at 90% 88%, hsla(200, 100%, 90%, ${(1-a)*.9}) 0%, transparent 0.7%)
          `,backgroundPosition:`
            ${e*-.4+12}% ${t*.5+9}%,
            ${e*.5+2}% ${t*-.3+25}%,
            ${e*-.5+17}% ${t*.4+39}%,
            ${e*.4+7}% ${t*-.4+52}%,
            ${e*-.3+15}% ${t*.5+67}%,
            ${e*.5+5}% ${t*-.5+82}%,
            
            ${e*-.5+29}% ${t*.4+5}%,
            ${e*.4+39}% ${t*-.5+19}%,
            ${e*-.3+35}% ${t*.5+35}%,
            ${e*.5+45}% ${t*-.4+49}%,
            ${e*-.4+32}% ${t*.3+65}%,
            ${e*.4+42}% ${t*-.5+85}%,
            
            ${e*-.3+59}% ${t*.5+12}%,
            ${e*.5+52}% ${t*-.4+29}%,
            ${e*-.5+65}% ${t*.4+45}%,
            ${e*.4+55}% ${t*-.3+59}%,
            ${e*-.4+62}% ${t*.5+75}%,
            
            ${e*.5+82}% ${t*-.4+7}%,
            ${e*-.4+75}% ${t*.5+22}%,
            ${e*.3+85}% ${t*-.5+39}%,
            ${e*-.5+79}% ${t*.4+55}%,
            ${e*.4+72}% ${t*-.3+72}%,
            ${e*-.3+87}% ${t*.5+85}%
          `,mixBlendMode:"screen",opacity:i*.8,filter:"blur(0.5px)"}})]})},ft=["Common","Uncommon","Rare","SuperRare","UltraRare","SecretRare"],mt=({card:n,visible:s,slideOnClick:i=!1,move:d=!1,size:o="large",showRarityAnimation:h=!0,showInspectAnimation:I=!1})=>{const[x,e]=_.useState(!1),t=n.art==="full"?it(n.characterId):"",$=h||s&&h,a=d&&!x||I,g=n.rarity==="SuperRare"&&$,f=n.rarity==="UltraRare"&&$,F=n.rarity==="SecretRare"&&$,T=n.rarity==="UltraRare"&&$,k=(n.rarity==="UltraRare"||n.rarity==="SecretRare")&&$,m=n.art==="full"&&t!=="",R=N(n.character),c=o==="small"?2/3:1,S=`${p.WIDTH*c}px`,O=`${p.HEIGHT*c}px`,w=`${p.BORDER_RADIUS*c}px`,C=p.BORDER_WIDTH*c,L=p.MARGIN_Y*c/8,G=p.MARGIN_BOTTOM*c/8,P=p.PADDING*c/8,B=p.FONT_SIZE*c,M=`${p.IMAGE_WIDTH*c}px`,H=`${p.IMAGE_HEIGHT*c}px`,U=p.INFO_LEFT*c,z=p.INFO_BOTTOM*c,W=p.INFO_FULL_ART_LEFT*c,v=p.INFO_FULL_ART_BOTTOM*c,X=`${p.INFO_WIDTH*c}px`,Y=p.INFO_BORDER_RADIUS*c,Z=p.INFO_PADDING_X*c/8,q=p.INFO_PADDING_Y*c/8,j=p.INFO_FONT_SIZE*c,K=p.STAR_LEFT*c,V=o==="small"?-5.5:-4.5,J=p.ID_LEFT*c,Q=p.ID_BOTTOM*c,tt=p.ID_FONT_SIZE*c,at=p.SLIDE_OUT_DISTANCE*c;function et(){i&&!x&&e(!0)}return r.jsxs(l,{onClick:et,sx:{width:S,height:O,borderRadius:w,borderColor:n.rarity==="SecretRare"?u.cards.secretRareBorder:u.cards.border,borderWidth:C,borderStyle:"solid",boxShadow:2,background:m?R[1]:void 0,backgroundImage:m?`url(${t})`:`linear-gradient(230deg,${R[0]} 29%, ${R[1]} 100%)`,backgroundSize:"cover",backgroundPosition:"center",position:"relative",animation:x?"slideOut 1s forwards":a?"inspect 5s infinite ease-in-out alternate":void 0,pointerEvents:x?"none":"auto","@keyframes inspect":{from:{transform:"rotateY(-20deg) rotateX(10deg)"},to:{transform:"rotateY(20deg) rotateX(-10deg)"}},"@keyframes slideOut":{from:{transform:"translateX(0px)"},to:{transform:`translateX(${at}px)`,zIndex:-1}},cursor:i?"pointer":"default",overflow:"hidden"},children:[r.jsxs(l,{sx:{display:"flex",flexDirection:"column",alignItems:"center",marginY:L},children:[r.jsxs(l,{sx:{marginBottom:G,textAlign:"center",boxShadow:1,borderRadius:1,width:"90%",height:"40px",position:"relative"},children:[r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",background:`linear-gradient(180deg,${A(R[0],.2)} 0%, ${R[0]} 50%, ${A(R[0],.2)} 100%)`,opacity:m?.5:1,borderRadius:1}}),r.jsx(l,{sx:{position:"absolute",width:"100%",height:"100%",padding:P,backgroundColor:"transparent",top:o==="small"?"6.5px":"0"},children:r.jsx(D,{sx:{fontFamily:'"Exo 2", sans-serif',fontSize:B,fontWeight:"bold"},children:n==null?void 0:n.character.Name})})]}),r.jsxs(l,{sx:{position:"relative"},children:[r.jsx(ot,{card:n,text:n==null?void 0:n.character.Anime,isFullArt:m,size:c}),n.art==="default"&&r.jsx(l,{width:M,component:"img",height:H,sx:{objectFit:"cover",border:"1px solid black",borderColor:u.cards.border,borderRadius:1},src:st(n.characterId)}),r.jsxs(l,{sx:{position:"absolute",left:m?W:U,bottom:m?v:z,background:"linear-gradient(180deg,rgba(224, 224, 224, 1) 34%, rgba(224, 224, 224, 1) 0%, rgba(250, 250, 250, 1) 49%, rgba(199, 199, 199, 1) 71%)",width:X,borderRadius:Y,display:"flex",justifyContent:"center",alignItems:"center",paddingX:Z,paddingY:q,boxShadow:1,gap:1},children:[r.jsx(D,{sx:{fontFamily:'"Exo 2", sans-serif',fontSize:j},children:`DOB: ${(n==null?void 0:n.character.Birthday)??"???"}`}),r.jsx(D,{sx:{fontFamily:'"Exo 2", sans-serif',fontSize:j},children:`HT: ${(n==null?void 0:n.character.Height)??"???"}`})]})]}),r.jsxs(l,{children:[r.jsxs(l,{sx:{position:"absolute",left:K,bottom:V,zIndex:20},children:[!m&&n.rarity==="Common"&&r.jsx(l,{sx:{width:"7px",height:"7px",backgroundColor:u.cards.rare,position:"absolute",top:"-14px",left:2,zIndex:100,border:"1px solid black",borderRadius:"50%"}}),n.rarity==="Uncommon"&&r.jsx(l,{sx:{width:"6px",height:"6px",backgroundColor:u.cards.rare,position:"absolute",top:"-14px",left:2,zIndex:100,border:"1px solid black",transform:"rotate(45deg)"}}),n.rarity!=="Common"&&n.rarity!=="Uncommon"&&r.jsx(E,{zIndex:30,size:c}),m&&n.rarity==="Common"&&r.jsx(E,{zIndex:30,art:"full",size:c}),(n.rarity==="SecretRare"||n.rarity==="UltraRare")&&r.jsx(E,{art:m?"full":"default",zIndex:30,size:c}),n.rarity==="SecretRare"&&r.jsx(E,{zIndex:30,art:m?"full":"default",size:c})]}),r.jsxs(l,{children:[r.jsx(l,{sx:{position:"absolute",right:2,bottom:1,width:"50px",height:"12px",backdropFilter:"blur(2px)",zIndex:1,borderRadius:"50%"}}),r.jsx(l,{sx:{position:"absolute",right:J,bottom:Q,zIndex:30},children:r.jsx(D,{sx:{fontFamily:'"Exo 2", sans-serif',fontSize:tt},children:n.cardId})})]})]})]}),f&&r.jsx(l,{sx:{position:"absolute",left:-4,top:-4,height:O,width:S,background:u.cards.ultraRare,backgroundSize:"300% 100%",backgroundPosition:"0% 0%",animation:$?"shimmer 3s infinite linear alternate":"none","@keyframes shimmer":{from:{backgroundPosition:"0% 0%"},to:{backgroundPosition:"100% 0%"}}}}),g&&r.jsx(l,{sx:{position:"absolute",left:-4,top:-4,height:O,width:S,background:u.cards.shimmer,backgroundSize:"300%",backgroundPositionX:"100%",animation:$?"shimmer 2.5s infinite linear alternate":"none","@keyframes shimmer":{from:{backgroundPosition:"0% 0%"},to:{backgroundPosition:"100% 0%"}}}}),r.jsx(lt,{width:S,height:O,intensity:1,enabled:F,animating:$}),r.jsx(ct,{width:S,height:O,intensity:.7,enabled:T,animating:$}),r.jsx(dt,{width:S,height:O,intensity:.7,enabled:k,animating:$})]})};export{ft as R,mt as T,$t as a,it as b,ut as c,xt as f,gt as g};
