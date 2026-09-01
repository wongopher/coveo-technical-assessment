import{_ as e}from"./headless.esm-317baf9e-OGxCImPc.js";import{t}from"./template-provider-67066474-tudk7L2l.js";var n=class extends t{constructor(t,n){super(t,()=>e()),this.gridCellLinkTarget=n}makeDefaultTemplate(){let e=document.createDocumentFragment(),t=document.createElement(`template`);t.innerHTML=`<atomic-product-section-name>
        <atomic-product-link class="font-bold"></atomic-product-link>
      </atomic-product-section-name>
      <atomic-product-section-visual>
        <atomic-product-image field="ec_thumbnails"></atomic-product-image>
      </atomic-product-section-visual>`,e.appendChild(t.content);let n=document.createDocumentFragment(),r=`
      <atomic-product-link>
      ${this.gridCellLinkTarget?`<a slot="attributes" target="${this.gridCellLinkTarget}"></a>`:``}
      </atomic-product-link>
    `,i=document.createElement(`template`);return i.innerHTML=r.trim(),n.appendChild(i.content),{content:e,linkContent:n,conditions:[]}}};export{n as t};