import{n as e,t}from"./sections-ae00b53a-DeZCNEUM.js";function n(e){return`only screen and (min-width: ${e})`}function r(r,i,a,o,s,c,l,u){let d=`${a}#${r.id}`,f=`${o}:not(.${s}, .${c})`,p=`@media ${n(i)}`;return[`${d} { display: grid }`,`${p} {
    ${d} ${e(`search`)} {
      justify-self: start;
      width: 80%;
    }
  }`,(()=>{let n=t(r,`facets`),i=t(r,`main`);if(!n||!i)return``;let a=n.minWidth||`17rem`,o=n.maxWidth||`22rem`,s=i.minWidth||`50%`,c=i.maxWidth||`70rem`;return`${p} {
      ${d} {
        grid-template-areas:
        '. .                     atomic-section-search .'
        '. atomic-section-main   atomic-section-main   .';
        grid-template-columns:
          1fr minmax(${a}, ${o}) minmax(${s}, ${c}) 1fr;
        column-gap: var(--atomic-layout-spacing-x);
      }

      ${f} ${d} {
        grid-template-areas:
          '. .                     atomic-section-search .'
          '. atomic-section-facets atomic-section-main   .'
          '. atomic-section-facets .                     .';
      }

      ${f} ${d} ${e(`facets`)} {
        display: block;
      }
    }`})(),(()=>{let n=t(r,`status`);if(!n||!n.querySelector(l))return``;let i=`${d} ${e(`status`)}`;return`${i} ${u} {
      display: none;
    }

    ${p} {
     ${i} ${u} {
       display: block;
      }

      ${i} ${l} {
        display: none;
       }
    }`})(),`${p} {
      ${d} ${e(`horizontal-facets`)} > atomic-popover:not(.atomic-hidden) {
        display: block;
      }
    }`].filter(e=>e!==``).join(`

`)}export{r as t};