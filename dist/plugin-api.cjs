'use strict';var chunkBTYKS2RI_cjs=require('./chunk-BTYKS2RI.cjs'),chunkESIMDI4P_cjs=require('./chunk-ESIMDI4P.cjs');require('./chunk-J7VAZASH.cjs'),require('./chunk-AMWQZGCQ.cjs'),require('./chunk-BB3E3O4Y.cjs'),require('./chunk-5TZ4CSAW.cjs'),require('./chunk-4OL5FXSM.cjs'),require('./chunk-3DBPRVY2.cjs'),require('./chunk-RIKWVJP6.cjs'),require('./chunk-FDPTWMJU.cjs');var me=require('react'),prosemirrorState=require('prosemirror-state'),jsxRuntime=require('react/jsx-runtime'),prosemirrorView=require('prosemirror-view');function _interopDefault(e){return e&&e.__esModule?e:{default:e}}var me__default=/*#__PURE__*/_interopDefault(me);var $={position:"right",defaultSize:280,minSize:200,maxSize:500,resizable:true,collapsible:true,defaultCollapsed:false},te=chunkESIMDI4P_cjs.x,ne=`
.plugin-host {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}

.plugin-host-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: visible;
}


.plugin-panels-left,
.plugin-panels-right {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: #f8f9fa;
  border-color: #e9ecef;
}

.plugin-panels-left {
  border-right: 1px solid #e9ecef;
}

.plugin-panels-right {
  border-left: 1px solid #e9ecef;
}

.plugin-panels-bottom {
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

.plugin-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease, height 0.2s ease;
}

.plugin-panel.collapsed {
  overflow: visible;
}

.plugin-panel-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
}

.plugin-panel.collapsed .plugin-panel-toggle {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  flex-direction: column;
  height: 100%;
  padding: 8px 6px;
}

.plugin-panel-toggle:hover {
  background: #e9ecef;
  color: #495057;
}

.plugin-panel-toggle-icon {
  font-weight: bold;
  font-size: 14px;
}

.plugin-panel.collapsed .plugin-panel-toggle-icon {
  transform: rotate(90deg);
}

.plugin-panel-toggle-label {
  font-weight: 500;
}

.plugin-panel-content {
  flex: 1;
  overflow: auto;
}

/* Right panel rendered inside viewport - scrolls with content */
.plugin-panel-in-viewport {
  position: absolute;
  top: 0;
  /* Position is set dynamically via inline styles based on page edge */
  width: 220px;
  pointer-events: auto;
  z-index: 10;
  overflow: visible;
}

.plugin-panel-in-viewport.collapsed {
  width: 32px;
}

.plugin-panel-in-viewport .plugin-panel-toggle {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.plugin-panel-in-viewport-content {
  overflow: visible;
  position: relative;
}

/* Plugin overlay container for rendering highlights/decorations */
.plugin-overlays-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 5;
}

.plugin-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

/* Individual overlay children manage their own pointer-events.
   Do NOT set pointer-events: auto here \u2014 it overrides overlay containers
   that need pointer-events: none to let clicks pass through to the editor. */
`,Re=me.forwardRef(function({plugins:i,children:s,className:r=""},p){let[t,f]=me.useState(null),m=me.useRef(s.props);m.current=s.props;let[a,u]=me.useState(null),l=me.useMemo(()=>new chunkESIMDI4P_cjs.y,[]),x=me.useSyncExternalStore(l.subscribe,l.getSnapshot),[T,h]=me.useState(()=>{let o=new Set;for(let e of i)({...$,...e.panelConfig}).defaultCollapsed&&o.add(e.id);return o}),[v]=me.useState(()=>{let o=new Map;for(let e of i){let d={...$,...e.panelConfig};o.set(e.id,d.defaultSize);}return o});me.useEffect(()=>{if(!t)return;let o=i.map(e=>({id:e.id,styles:e.styles,initialize:e.initialize,onStateChange:e.onStateChange,destroy:e.destroy}));return l.initialize(o,t),()=>{l.destroy();}},[l,t,i]),me.useEffect(()=>{let o=i.filter(e=>e.styles).map(e=>te(e.id,e.styles));return ()=>o.forEach(e=>e())},[i]),me.useEffect(()=>{if(!t?.dom)return;let o=()=>{l.updateStates(t);},e=null,d=()=>{e&&cancelAnimationFrame(e),e=requestAnimationFrame(o);};o();let c=t.dom;c.addEventListener("input",d),c.addEventListener("focus",o),c.addEventListener("click",o);let g=t.dispatch.bind(t);return t.dispatch=y=>{g(y),d();},()=>{c.removeEventListener("input",d),c.removeEventListener("focus",o),c.removeEventListener("click",o),e&&cancelAnimationFrame(e),t.dispatch=g;}},[t,l]),me.useEffect(()=>te("plugin-host-base",ne),[]);let R=me.useCallback(o=>{if(!t)return;if(t.coordsAtPos(o)){t.dom.scrollIntoView({block:"center",inline:"nearest"});let{state:d}=t,c=d.doc.resolve(Math.min(o,d.doc.content.size)),g=d.tr.setSelection(prosemirrorState.TextSelection.near(c));t.dispatch(g),t.focus();}},[t]),P=me.useCallback((o,e)=>{if(!t)return;let{state:d}=t,c=d.doc.content.size,g=Math.max(0,Math.min(o,c)),y=Math.max(0,Math.min(e,c)),L=d.tr.setSelection(prosemirrorState.TextSelection.create(d.doc,g,y));t.dispatch(L),t.focus();},[t]),E=me.useCallback(o=>l.getPluginState(o),[l]),K=me.useCallback((o,e)=>{l.setPluginState(o,e);},[l]),U=me.useCallback(()=>{t&&l.updateStates(t);},[t,l]);me.useImperativeHandle(p,()=>({getPluginState:E,setPluginState:K,getEditorView:()=>t,refreshPluginStates:U}),[E,K,t,U]);let W=me.useMemo(()=>{let o=[];for(let e of i)e.proseMirrorPlugins&&o.push(...e.proseMirrorPlugins);return o},[i]),_=me.useCallback(o=>{h(e=>{let d=new Set(e);return d.has(o)?d.delete(o):d.add(o),d});},[]),[A,F]=me.useState(null);me.useEffect(()=>{if(!a){F(null);return}let o=()=>{let c=a.pagesContainer,g=c.querySelector(".layout-page");if(!g){F(null);return}let y=a.getContainerOffset(),L=g.getBoundingClientRect(),Y=c.getBoundingClientRect(),G=(L.right-Y.left)/a.zoom,xe=y.x+G+5;F(xe);};o();let e=()=>{requestAnimationFrame(o);};window.addEventListener("resize",e);let d=new ResizeObserver(()=>{requestAnimationFrame(o);});return d.observe(a.pagesContainer),()=>{window.removeEventListener("resize",e),d.disconnect();}},[a]);let Z=me.useMemo(()=>{let o=[];if(a){for(let e of i)if(e.renderOverlay){let d=x.states.get(e.id);o.push(jsxRuntime.jsx("div",{className:"plugin-overlay","data-plugin-id":e.id,children:e.renderOverlay(a,d,t)},`overlay-${e.id}`));}}for(let e of i){if(!e.Panel||(e.panelConfig?.position??"right")!=="right")continue;let c={...$,...e.panelConfig},g=T.has(e.id),y=v.get(e.id)??c.defaultSize,L=e.Panel,Y=x.states.get(e.id),G=A!==null?`${A}px`:"calc(50% + 428px)";o.push(jsxRuntime.jsxs("div",{className:`plugin-panel-in-viewport ${g?"collapsed":""}`,style:{width:g?"32px":`${y}px`,left:G},"data-plugin-id":e.id,children:[c.collapsible&&jsxRuntime.jsx("button",{className:"plugin-panel-toggle",onClick:()=>_(e.id),title:g?`Show ${e.name}`:`Hide ${e.name}`,"aria-label":g?`Show ${e.name}`:`Hide ${e.name}`,children:jsxRuntime.jsx("span",{className:"plugin-panel-toggle-icon",children:g?"\u2039":"\u203A"})}),!g&&a&&jsxRuntime.jsx("div",{className:"plugin-panel-in-viewport-content",children:jsxRuntime.jsx(L,{editorView:t,doc:t?.state.doc??null,scrollToPosition:R,selectRange:P,pluginState:Y,panelWidth:y,renderedDomContext:a})})]},`panel-overlay-${e.id}`));}return o.length>0?o:null},[a,i,x.version,t,T,v,R,P,_,A]),j=me.useMemo(()=>{let o=[];for(let e of i){if(!e.getSidebarItems)continue;let d=x.states.get(e.id),c={editorView:t,renderedDomContext:a,anchorPositions:new Map,zoom:a?.zoom??1},g=e.getSidebarItems(d,c);o.push(...g);}return o},[i,x.version,t,a]),B=me.useCallback(o=>{u(o);let e=m.current?.onRenderedDomContextReady;typeof e=="function"&&e(o);},[]),be=me.useMemo(()=>me.cloneElement(s,{externalPlugins:W,pluginOverlays:Z,pluginSidebarItems:j,pluginRenderedDomContext:a,onRenderedDomContextReady:B,onEditorViewReady:o=>{f(o);let e=m.current?.onEditorViewReady;typeof e=="function"&&e(o);}}),[s,W,Z,j,a,B]),O=me.useMemo(()=>{let o=[],e=[],d=[];for(let c of i){if(!c.Panel)continue;let g=c.panelConfig?.position??"right";g==="left"?o.push(c):g==="bottom"?d.push(c):e.push(c);}return {left:o,right:e,bottom:d}},[i]),X=o=>{if(!o.Panel)return null;let e={...$,...o.panelConfig},d=T.has(o.id),c=v.get(o.id)??e.defaultSize,g=o.Panel,y=x.states.get(o.id);return jsxRuntime.jsxs("div",{className:`plugin-panel plugin-panel-${e.position} ${d?"collapsed":""}`,style:{[e.position==="bottom"?"height":"width"]:d?"32px":`${c}px`,minWidth:e.position!=="bottom"?d?"32px":`${e.minSize}px`:void 0,maxWidth:e.position!=="bottom"?`${e.maxSize}px`:void 0,minHeight:e.position==="bottom"?d?"32px":`${e.minSize}px`:void 0,maxHeight:e.position==="bottom"?`${e.maxSize}px`:void 0},"data-plugin-id":o.id,children:[e.collapsible&&jsxRuntime.jsxs("button",{className:"plugin-panel-toggle",onClick:()=>_(o.id),title:d?`Show ${o.name}`:`Hide ${o.name}`,"aria-label":d?`Show ${o.name}`:`Hide ${o.name}`,children:[jsxRuntime.jsx("span",{className:"plugin-panel-toggle-icon",children:d?"\u203A":"\u2039"}),d&&jsxRuntime.jsx("span",{className:"plugin-panel-toggle-label",children:o.name})]}),!d&&jsxRuntime.jsx("div",{className:"plugin-panel-content",children:jsxRuntime.jsx(g,{editorView:t,doc:t?.state.doc??null,scrollToPosition:R,selectRange:P,pluginState:y,panelWidth:c,renderedDomContext:a??null})})]},o.id)};return jsxRuntime.jsxs("div",{className:`plugin-host ${r}`,children:[O.left.length>0&&jsxRuntime.jsx("div",{className:"plugin-panels-left",children:O.left.map(X)}),jsxRuntime.jsxs("div",{className:"plugin-host-editor",children:[be,O.bottom.length>0&&jsxRuntime.jsx("div",{className:"plugin-panels-bottom",children:O.bottom.map(X)})]})]})});var oe=/\{([#/^@]?)([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\}/g,b=new prosemirrorState.PluginKey("template");function He(n,i,s){return `${n}:${i}:${s}`}function ie(n){let i=[];n.descendants((a,u)=>(a.isText&&a.text&&i.push({text:a.text,pos:u}),true));let s="",r=[];for(let a of i){for(let u=0;u<a.text.length;u++)r.push(a.pos+u);s+=a.text;}let p=[],t=[],f=new Map,m;for(oe.lastIndex=0;(m=oe.exec(s))!==null;){let[a,u,l]=m,x=r[m.index],T=r[m.index+a.length-1]+1,h;u==="#"?h="sectionStart":u==="/"?h="sectionEnd":u==="^"?h="invertedStart":u==="@"?h="raw":h="variable";let v=`${h}:${l}`,R=f.get(v)??0;f.set(v,R+1);let P={id:He(h,l,R),type:h,name:l,rawTag:a,from:x,to:T};if(h==="sectionStart"||h==="invertedStart")P.nestedVars=[],t.push(P);else if(h==="sectionEnd"){for(let E=t.length-1;E>=0;E--)if(t[E].name===l){t.splice(E,1);break}}else h==="variable"&&t.length>0&&(t[t.length-1].nestedVars?.push(l),P.insideSection=true);p.push(P);}return p}function Me(n){switch(n){case "sectionStart":case "sectionEnd":return "#3b82f6";case "invertedStart":return "#8b5cf6";case "raw":return "#ef4444";default:return "#f59e0b"}}function q(n,i,s,r){let p=[];for(let t of i){let f=t.id===s,m=t.id===r,a=Me(t.type),u=["docx-template-tag"];f&&u.push("hovered"),m&&u.push("selected"),p.push(prosemirrorView.Decoration.inline(t.from,t.to,{class:u.join(" "),"data-tag-id":t.id,style:`background-color: ${a}22; border-radius: 2px;`},{noOverlay:true}));}return prosemirrorView.DecorationSet.create(n,p)}function ke(n,i){if(n.length!==i.length)return  false;for(let s=0;s<n.length;s++)if(n[s].id!==i[s].id)return  false;return  true}function N(){return new prosemirrorState.Plugin({key:b,state:{init(n,i){let s=ie(i.doc);return {tags:s,decorations:q(i.doc,s)}},apply(n,i,s,r){if(n.docChanged){let t=ie(r.doc),f=ke(i.tags,t);return {tags:t,decorations:f?i.decorations.map(n.mapping,n.doc):q(r.doc,t,i.hoveredId,i.selectedId),hoveredId:i.hoveredId,selectedId:i.selectedId}}let p=n.getMeta(b);if(p){let t=p.hoveredId??i.hoveredId,f=p.selectedId??i.selectedId;return {...i,hoveredId:t,selectedId:f,decorations:q(r.doc,i.tags,t,f)}}return {...i,decorations:i.decorations.map(n.mapping,n.doc)}}},props:{decorations(n){return b.getState(n)?.decorations??prosemirrorView.DecorationSet.empty},handleClick(n,i){let r=(b.getState(n.state)?.tags??[]).find(t=>i>=t.from&&i<=t.to);return r?(n.dispatch(n.state.tr.setMeta(b,{selectedId:r.id})),true):(b.getState(n.state)?.selectedId&&n.dispatch(n.state.tr.setMeta(b,{selectedId:void 0})),false)},handleDOMEvents:{mouseover(n,i){let r=i.target.closest?.("[data-tag-id]")?.getAttribute("data-tag-id")||void 0,p=b.getState(n.state)?.hoveredId;return r!==p&&n.dispatch(n.state.tr.setMeta(b,{hoveredId:r})),false},mouseout(n,i){return i.relatedTarget?.closest?.("[data-tag-id]")||b.getState(n.state)?.hoveredId&&n.dispatch(n.state.tr.setMeta(b,{hoveredId:void 0})),false}}}})}function ae(n){return b.getState(n)?.tags??[]}function z(n,i){n.dispatch(n.state.tr.setMeta(b,{hoveredId:i}));}function D(n,i){n.dispatch(n.state.tr.setMeta(b,{selectedId:i}));}var V=`
.docx-template-tag {
  cursor: pointer;
  transition: background-color 0.1s;
}

.docx-template-tag:hover,
.docx-template-tag.hovered {
  filter: brightness(0.95);
}

.docx-template-tag.selected {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
`;var Ne={variable:"rgba(245, 158, 11, 0.3)",sectionStart:"rgba(59, 130, 246, 0.3)",sectionEnd:"rgba(59, 130, 246, 0.3)",invertedStart:"rgba(139, 92, 246, 0.3)",raw:"rgba(239, 68, 68, 0.3)"},De={variable:"rgba(245, 158, 11, 0.5)",sectionStart:"rgba(59, 130, 246, 0.5)",sectionEnd:"rgba(59, 130, 246, 0.5)",invertedStart:"rgba(139, 92, 246, 0.5)",raw:"rgba(239, 68, 68, 0.5)"};function de({context:n,tags:i,hoveredId:s,selectedId:r,onHover:p,onSelect:t}){let[f,m]=me.useState(0),a=me.useCallback(()=>{let l=n.getContainerOffset(),x=[];for(let T of i){let h=n.getRectsForRange(T.from,T.to);for(let v of h)x.push({tagId:T.id,tagType:T.type,x:v.x+l.x,y:v.y+l.y,width:v.width,height:v.height});}return x},[n,i]),u=me.useMemo(()=>a(),[a,f]);return me.useEffect(()=>{let l=()=>{requestAnimationFrame(()=>m(x=>x+1));};return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]),me.useEffect(()=>{let l=new ResizeObserver(()=>{requestAnimationFrame(()=>m(x=>x+1));});return l.observe(n.pagesContainer),()=>l.disconnect()},[n.pagesContainer]),u.length===0?null:jsxRuntime.jsx("div",{className:"template-highlight-overlay",children:u.map((l,x)=>{let T=l.tagId===s,h=l.tagId===r,v=T||h?De[l.tagType]:Ne[l.tagType];return jsxRuntime.jsx("div",{className:`template-highlight ${T?"hovered":""} ${h?"selected":""}`,style:{position:"absolute",left:l.x,top:l.y,width:l.width,height:l.height,backgroundColor:v,borderRadius:2,cursor:"pointer"},onMouseEnter:()=>p?.(l.tagId),onMouseLeave:()=>p?.(void 0),onClick:()=>t?.(l.tagId)},`${l.tagId}-${x}`)})})}var pe=`
.template-highlight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: visible;
}

.template-highlight {
  pointer-events: auto;
  transition: background-color 0.1s ease;
}

.template-highlight:hover,
.template-highlight.hovered {
  filter: brightness(0.9);
}

.template-highlight.selected {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.6);
}
`;var Ve={variable:"#f59e0b",sectionStart:"#3b82f6",sectionEnd:"#3b82f6",invertedStart:"#8b5cf6",raw:"#ef4444"};function _e(n){switch(n){case "sectionStart":return "LOOP / IF";case "invertedStart":return "IF NOT";case "raw":return "HTML";default:return ""}}var ge=`
.template-annotation-chip {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  background: white;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #6c757d;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  max-width: 200px;
}

.template-annotation-chip:hover,
.template-annotation-chip.hovered {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.template-annotation-chip.selected {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.template-chip-badge {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.template-chip-dot {
  font-size: 8px;
}

.template-chip-name {
  color: #334155;
  font-weight: 500;
}

.template-chip-nested {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.template-nested-var {
  font-size: 10px;
  color: #64748b;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 6px;
  border-radius: 3px;
}

.template-nested-var:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #1e40af;
}
`;function ue({tag:n,isHovered:i,measureRef:s,onHover:r,onSelect:p}){let t=_e(n.type),f=Ve[n.type],m=n.type==="sectionStart"||n.type==="invertedStart";return jsxRuntime.jsxs("div",{ref:s,style:{display:"flex",alignItems:"flex-start"},children:[jsxRuntime.jsx("div",{style:{width:20,height:1,background:i?"#3b82f6":"#d0d0d0",marginTop:12,marginRight:4,flexShrink:0}}),jsxRuntime.jsxs("div",{className:`template-annotation-chip ${i?"hovered":""}`,style:{borderLeftColor:f},onMouseEnter:()=>r(n.id),onMouseLeave:()=>r(void 0),onClick:a=>{a.stopPropagation(),p(n.id);},onMouseDown:a=>a.stopPropagation(),title:m?`${n.rawTag}
Iterates over ${n.name}[]. Access nested properties via ${n.name}.property`:n.rawTag,children:[t&&jsxRuntime.jsx("span",{className:"template-chip-badge",style:{background:f},children:t}),!t&&jsxRuntime.jsx("span",{className:"template-chip-dot",style:{color:f},children:"\u25CF"}),jsxRuntime.jsx("span",{className:"template-chip-name",children:n.name}),m&&n.nestedVars&&n.nestedVars.length>0&&jsxRuntime.jsx("div",{className:"template-chip-nested",children:n.nestedVars.map((a,u)=>jsxRuntime.jsx("span",{className:"template-nested-var",title:`Access: ${n.name}.${a}`,children:a.includes(".")?a.split(".").pop():a},u))})]})]})}function fe(n,i,s){if(!n)return;D(n,s);let r=i.find(p=>p.id===s);if(r){let p=n.state.tr.setSelection(prosemirrorState.TextSelection.near(n.state.doc.resolve(r.from)));n.dispatch(p),n.focus();}}function he(n={}){return {id:"template",name:"Template",proseMirrorPlugins:[N()],onStateChange:s=>{let r=b.getState(s.state);if(r)return {tags:r.tags,hoveredId:r.hoveredId,selectedId:r.selectedId}},initialize:s=>({tags:[]}),getSidebarItems:(s,r)=>!s||s.tags.length===0?[]:s.tags.filter(t=>t.type!=="sectionEnd"&&!t.insideSection).map(t=>({id:`template-${t.id}`,anchorPos:t.from,priority:10,estimatedHeight:32,render:f=>me__default.default.createElement(ue,{...f,tag:t,isHovered:t.id===s.hoveredId,onHover:m=>{r.editorView&&z(r.editorView,m);},onSelect:m=>fe(r.editorView,s.tags,m)})})),renderOverlay:(s,r,p)=>!r||r.tags.length===0?null:me__default.default.createElement(de,{context:s,tags:r.tags,hoveredId:r.hoveredId,selectedId:r.selectedId,onHover:t=>{p&&z(p,t);},onSelect:t=>fe(p,r.tags,t)}),styles:`
${V}
${ge}
${pe}
`}}var Fe=he();Object.defineProperty(exports,"RenderedDomContextImpl",{enumerable:true,get:function(){return chunkBTYKS2RI_cjs.a}});Object.defineProperty(exports,"createRenderedDomContext",{enumerable:true,get:function(){return chunkBTYKS2RI_cjs.b}});exports.PLUGIN_HOST_STYLES=ne;exports.PluginHost=Re;exports.TEMPLATE_DECORATION_STYLES=V;exports.createTemplatePlugin=he;exports.createTemplateProseMirrorPlugin=N;exports.getTemplatePluginTags=ae;exports.setHoveredElement=z;exports.setSelectedElement=D;exports.templatePlugin=Fe;exports.templatePluginKey=b;