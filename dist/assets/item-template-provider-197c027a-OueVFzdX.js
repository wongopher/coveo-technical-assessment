import{nt as e}from"./headless.esm-eaee1560-BcsCVvSB.js";import{t}from"./template-provider-67066474-tudk7L2l.js";var n=class extends t{constructor(t,n){super(t,()=>e(t.bindings.engine)),this.gridCellLinkTarget=n}makeDefaultTemplate(){let e=document.createDocumentFragment(),t=document.createElement(`atomic-result-link`);e.appendChild(t);let n=document.createDocumentFragment(),r=`
      <atomic-result-link>
      ${this.gridCellLinkTarget?`<a slot="attributes" target="${this.gridCellLinkTarget}"></a>`:``}
      </atomic-result-link>
    `,i=document.createElement(`template`);return i.innerHTML=r.trim(),n.appendChild(i.content),{content:e,linkContent:n,conditions:[]}}};export{n as t};