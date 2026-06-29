'use strict';var chunkAMWQZGCQ_cjs=require('./chunk-AMWQZGCQ.cjs'),chunkBB3E3O4Y_cjs=require('./chunk-BB3E3O4Y.cjs');function k(e){let t=new Set,o=e.package;if(o.theme&&$(o.theme,t),o.styles&&G(o.styles,t),o.document)for(let n of o.document.content)p(n,t);if(o.headers)for(let n of o.headers.values())P(n,t);if(o.footers)for(let n of o.footers.values())P(n,t);if(o.footnotes)for(let n of o.footnotes)q(n,t);if(o.endnotes)for(let n of o.endnotes)Q(n,t);return Array.from(t).sort()}function $(e,t){let o=e.fontScheme;o&&(o.majorFont&&E(o.majorFont,t),o.minorFont&&E(o.minorFont,t));}function E(e,t){if(e.latin&&t.add(e.latin),e.ea&&t.add(e.ea),e.cs&&t.add(e.cs),e.fonts)for(let o of Object.values(e.fonts))o&&t.add(o);}function G(e,t){e.docDefaults&&(e.docDefaults.rPr&&g(e.docDefaults.rPr,t),e.docDefaults.pPr?.runProperties&&g(e.docDefaults.pPr.runProperties,t));for(let o of e.styles)o.rPr&&g(o.rPr,t),o.pPr?.runProperties&&g(o.pPr.runProperties,t);}function g(e,t){let o=e.fontFamily;o&&(o.ascii&&t.add(o.ascii),o.hAnsi&&t.add(o.hAnsi),o.eastAsia&&t.add(o.eastAsia),o.cs&&t.add(o.cs));}function z(e,t){e.runProperties&&g(e.runProperties,t);}function p(e,t){e.type==="paragraph"?U(e,t):e.type==="table"&&X(e,t);}function U(e,t){e.formatting&&z(e.formatting,t);for(let o of e.content)j(o,t);}function j(e,t){if(e.type==="run")m(e,t);else if(e.type==="hyperlink")K(e,t);else if(e.type==="simpleField"||e.type==="complexField"){if("content"in e)for(let o of e.content)o.type==="run"&&m(o,t);if("fieldResult"in e)for(let o of e.fieldResult)m(o,t);}}function m(e,t){e.formatting&&g(e.formatting,t);}function K(e,t){for(let o of e.children)o.type==="run"&&m(o,t);}function X(e,t){for(let o of e.rows)V(o,t);}function V(e,t){for(let o of e.cells)Y(o,t);}function Y(e,t){for(let o of e.content)p(o,t);}function P(e,t){for(let o of e.content)p(o,t);}function q(e,t){for(let o of e.content)p(o,t);}function Q(e,t){for(let o of e.content)p(o,t);}var J=new Set(["serif","sans-serif","monospace","cursive","fantasy","system-ui"]);function v(e,t={}){let o=t.canRender??chunkAMWQZGCQ_cjs.f,n=new Set;for(let l of t.exclude??[])n.add(l.trim().toLowerCase());let r=new Set;for(let l of t.embeddedFamilies??[])r.add(l.trim().toLowerCase());let i=[],a=new Set;for(let l of e){let c=l.trim(),d=c.toLowerCase();!c||J.has(d)||n.has(d)||a.has(d)||!r.has(d)&&!o(c)||(a.add(d),i.push({name:c,fontFamily:chunkBB3E3O4Y_cjs.m(c).cssFallback,category:"other"}));}return i}function Z(e,t={}){return v(k(e),t)}function ee(e,t){if(!e||e.length===0)return [];let o=new Set;for(let i of t)o.add(i.trim().toLowerCase());let n=new Set,r=[];for(let i of e){let a=i.name.trim().toLowerCase();o.has(a)||n.has(a)||(n.add(a),r.push(i));}return r}var H={backgroundColor:"rgba(26, 115, 232, 0.3)",borderRadius:0,zIndex:0,opacity:1,mixBlendMode:"multiply"};function D(e){let t=window.getSelection();if(!t||t.rangeCount===0||t.isCollapsed)return [];let o=t.getRangeAt(0);if(e&&!e.contains(o.commonAncestorContainer))return [];let n=o.getClientRects(),r=[],i=0,a=0;if(e){let l=e.getBoundingClientRect();i=l.left+e.scrollLeft,a=l.top+e.scrollTop;}for(let l=0;l<n.length;l++){let c=n[l];c.width===0&&c.height===0||r.push({left:c.left-i,top:c.top-a,width:c.width,height:c.height});}return r}function O(e,t=2){if(e.length<=1)return e;let o=[...e].sort((i,a)=>Math.abs(i.top-a.top)<t?i.left-a.left:i.top-a.top),n=[],r={...o[0]};for(let i=1;i<o.length;i++){let a=o[i],l=Math.abs(a.top-r.top)<t,c=a.left<=r.left+r.width+t;if(l&&c){let d=Math.max(r.left+r.width,a.left+a.width);r.width=d-r.left,r.height=Math.max(r.height,a.height);}else n.push(r),r={...a};}return n.push(r),n}function te(e){let t=D(e);return O(t)}function oe(){let e=window.getSelection();return e!==null&&!e.isCollapsed&&e.rangeCount>0}function ne(){let e=window.getSelection();return e?e.toString():""}function re(e){let t=window.getSelection();if(!t||t.rangeCount===0)return  false;let o=t.getRangeAt(0);return e.contains(o.commonAncestorContainer)}var u=null;function ie(e=H){I();let t=`
    /* DOCX Editor Selection Highlighting */

    /* Base selection style for all editable content */
    .docx-editor [contenteditable="true"]::selection,
    .docx-editor [contenteditable="true"] *::selection,
    .docx-run-editable::selection,
    .docx-run-editable *::selection {
      background-color: ${e.backgroundColor} !important;
      color: inherit !important;
    }

    /* Firefox selection */
    .docx-editor [contenteditable="true"]::-moz-selection,
    .docx-editor [contenteditable="true"] *::-moz-selection,
    .docx-run-editable::-moz-selection,
    .docx-run-editable *::-moz-selection {
      background-color: ${e.backgroundColor} !important;
      color: inherit !important;
    }

    /* Ensure selection is visible against all backgrounds */
    .docx-run-highlighted::selection,
    .docx-run-highlighted *::selection {
      /* For highlighted (yellow background) text, use darker selection */
      background-color: rgba(26, 115, 232, 0.5) !important;
    }

    .docx-run-highlighted::-moz-selection,
    .docx-run-highlighted *::-moz-selection {
      background-color: rgba(26, 115, 232, 0.5) !important;
    }

    /* Selection in dark text */
    .docx-run-dark-bg::selection,
    .docx-run-dark-bg *::selection {
      /* Use lighter selection for dark backgrounds */
      background-color: rgba(100, 181, 246, 0.5) !important;
    }

    .docx-run-dark-bg::-moz-selection,
    .docx-run-dark-bg *::-moz-selection {
      background-color: rgba(100, 181, 246, 0.5) !important;
    }

    /* Programmatic highlight class */
    .docx-selection-highlight {
      background-color: ${e.backgroundColor};
      ${e.borderRadius?`border-radius: ${e.borderRadius}px;`:""}
      ${e.mixBlendMode?`mix-blend-mode: ${e.mixBlendMode};`:""}
    }

    /* Find/replace highlight */
    .docx-find-highlight {
      background-color: rgba(255, 235, 59, 0.5);
      border-radius: 2px;
    }

    .docx-find-highlight-current {
      background-color: rgba(255, 152, 0, 0.6);
      border-radius: 2px;
      outline: 2px solid rgba(255, 152, 0, 0.8);
    }

    /* AI action selection preview */
    .docx-ai-selection-preview {
      background-color: rgba(156, 39, 176, 0.2);
      border-bottom: 2px dashed rgba(156, 39, 176, 0.6);
    }
  `;u=document.createElement("style"),u.id="docx-selection-styles",u.textContent=t,document.head.appendChild(u);}function I(){u&&(u.remove(),u=null);let e=document.getElementById("docx-selection-styles");e&&e.remove();}function ae(){return u!==null||document.getElementById("docx-selection-styles")!==null}var L="rgba(255, 235, 59, 0.55)";var h="docx-paragraph-flash",T=new WeakMap;function le(e){let t=globalThis;return typeof t.CSS?.escape=="function"?t.CSS.escape(e):e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function se(e){return e?.color?.trim()||L}function ce(e){let t=e?.durationMs;return t==null||!Number.isFinite(t)||t<0?1200:t}function N(e,t){if(!t||!t.trim())return [];let o=le(t);return Array.from(e.querySelectorAll(`.layout-paragraph[data-para-id="${o}"]`))}function M(e,t){let o=0,n=se(t),r=ce(t);for(let i of e){o++;let a=T.get(i);a!==void 0&&clearTimeout(a),i.classList.remove(h),i.offsetWidth,i.style.setProperty("--docx-paragraph-flash-color",n),i.style.setProperty("--docx-paragraph-flash-duration",`${r}ms`),i.classList.add(h);let l=setTimeout(()=>{i.classList.remove(h),i.style.removeProperty("--docx-paragraph-flash-color"),i.style.removeProperty("--docx-paragraph-flash-duration"),T.delete(i);},r);T.set(i,l);}return o}function de(e,t,o){let n=N(e,t);return M(n,o)>0}function _(e,t,o){let n=0;for(let r=t;r<t+o&&r<e.length;r++)n+=e[r];return n}function ue(e,t,o,n){let r=_(e,t,o),i=Math.floor(r/Math.max(n,1)),a=r-i*n,l=Array.from({length:n},(c,d)=>i+(d<a?1:0));return [...e.slice(0,t),...l,...e.slice(t+o)]}function fe(e,t,o,n,r,i){let a=o-t.rowspan,l=n-t.colspan,c=r+a,d=t.row+t.rowspan,R=t.col+t.colspan,x=[];for(let s of e){if(s===t)continue;let f=s.row+s.rowspan,b=s.col+s.colspan,F=s.row<d&&f>t.row,w=s.col<R&&b>t.col;x.push({data:s.data,row:s.row>=d?s.row+a:s.row,col:s.col>=R?s.col+l:s.col,rowspan:s.rowspan+(a>0&&F&&!w?a:0),colspan:s.colspan+(l>0&&w&&!F?l:0)});}for(let s=0;s<o;s++)for(let f=0;f<n;f++){let b=s===0&&f===0;x.push({data:i(b,s,f),row:t.row+s,col:t.col+f,rowspan:1,colspan:1});}return {anchors:x,deltaRows:a,deltaCols:l,newRowCount:c}}function ge(e){let t=new Map,o=new Map;for(let n of e){t.set(`${n.row}-${n.col}`,n);for(let r=n.row;r<n.row+n.rowspan;r++)for(let i=n.col;i<n.col+n.colspan;i++)o.set(`${r}-${i}`,n);}return {byStart:t,byCoveredSlot:o}}function pe(e,t){let o=e>1||t>1;return {minRows:e,minCols:t,initialRows:e,initialCols:o?t:t+1}}var me=/[\p{L}\p{N}\p{M}_''\-]/u,he=/\s/;function C(e){return !e||e.length===0?false:me.test(e)}function y(e){return !e||e.length===0?false:he.test(e)}function xe(e,t){if(!e||e.length===0)return [0,0];t=Math.max(0,Math.min(t,e.length-1));let o=e[t];if(y(o)){let n=t,r=t;for(;n>0&&y(e[n-1]);)n--;for(;r<e.length&&y(e[r]);)r++;return [n,r]}if(C(o)){let n=t,r=t;for(;n>0&&C(e[n-1]);)n--;for(;r<e.length&&C(e[r]);)r++;return [n,r]}return [t,t+1]}async function be(e){let t=e.target;if(!t||!t.files)return null;let o=t.files[0];return t.value="",o?{buffer:await o.arrayBuffer(),name:o.name.replace(/\.docx$/i,"")}:null}var B="(prefers-color-scheme: dark)";function W(){return typeof window<"u"&&typeof window.matchMedia=="function"}function Se(){return W()?window.matchMedia(B).matches:false}function Te(e,t){return e==="dark"||e==="system"&&t}function Ce(e){if(!W())return ()=>{};let t=window.matchMedia(B);e(t.matches);let o=n=>e(n.matches);return t.addEventListener("change",o),()=>t.removeEventListener("change",o)}exports.a=Z;exports.b=ee;exports.c=H;exports.d=te;exports.e=oe;exports.f=ne;exports.g=re;exports.h=ie;exports.i=ae;exports.j=de;exports.k=_;exports.l=ue;exports.m=fe;exports.n=ge;exports.o=pe;exports.p=xe;exports.q=be;exports.r=Se;exports.s=Te;exports.t=Ce;