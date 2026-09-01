import{l as e,o as t}from"./index-B7fxLJ5C.js";import{b as n}from"./utils-fec71534-SDU5lF7A.js";import{r}from"./initialization-utils-18d62c3c-uA-afwMF.js";import{n as i,t as a}from"./sections-ae00b53a-DeZCNEUM.js";var o=`atomic-insight-tabs`,s=`atomic-insight-refine-modal`,c=`atomic-insight-search-box`,l=[`atomic-insight-refine-toggle`,`atomic-insight-edit-toggle`,`atomic-insight-history-toggle`],u=[`atomic-insight-smart-snippet-suggestions`,`atomic-insight-smart-snippet`],d=`atomic-insight-generated-answer`;function f(e,t){let n=`atomic-insight-layout#${e.id}`,r=!!a(e,`search`)?.querySelector(o);return[t?`
  ${n} {
    display: grid;
    grid-template-rows: auto auto 8fr 1fr;
    max-height: 100%;
    box-sizing: border-box;
  }
  ${n} ${s} {
    grid-row-start: 5;
  }`:``,`${i(`search`)} {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      grid-gap: 0.5rem;
      background: var(--atomic-neutral-light);
      padding-top: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      box-sizing: border-box;
      min-width: 0;
      ${r?``:`padding-bottom: 1.5rem;`}
    }

    ${i(`search`)} ${c} {
      flex-grow: 1;
    }

    ${l.map(e=>`${i(`search`)} ${e} {
      flex-shrink: 0;
    }`)}

    ${i(`search`)} ${o} {
      width: 100%;
    }
    `,`${i(`facets`)} {
      display: none;
    }
    `,`
    ${i(`results`)} {
      overflow: auto;
    }

    ${i(`results`)} ${u.join(`,`)} {
      padding: 1.5rem 1.5rem 0px;
    }

    ${i(`results`)} ${d} {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }
    `].filter(e=>e!==``).join(`

`)}var p=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},m=class{constructor(t){e(this,t),this.widget=!1,this.widget=!1}updateStyles(){this.styleTag?this.styleTag.innerHTML=f(this.host,this.widget):this.makeStyleTag()}makeStyleTag(){this.styleTag=this.bindings.createStyleElement(),this.styleTag.innerHTML=f(this.host,this.widget),this.host.appendChild(this.styleTag)}componentDidLoad(){let e=this.host.id||n(`atomic-insight-layout-`);this.host.id=e,this.makeStyleTag()}get host(){return t(this)}static get watchers(){return{widget:[`updateStyles`]}}};p([r()],m.prototype,`bindings`,void 0);export{m as atomic_insight_layout};