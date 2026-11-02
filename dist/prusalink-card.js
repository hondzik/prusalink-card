var e="https://github.com/hondzik/prusalink-card";function t(e,t,i,n){var a,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(o=(s<3?a(o):s>3?a(t,i,o):a(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,n=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new o(i,e,a)},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:_}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",v=f.reactiveElementPolyfillSupport,y=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!c(e,t),k={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=k){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&d(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:a}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const s=n?.call(this);a?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??k}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(n)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of t){const t=document.createElement("style"),a=i.litNonce;void 0!==a&&t.setAttribute("nonce",a),t.textContent=n.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=n;const s=a.fromAttribute(t,e.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(e,t,i,n=!1,a){if(void 0!==e){const s=this.constructor;if(!1===n&&(a=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??b)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:a},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==a||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,v?.({ReactiveElement:$}),(f.reactiveElementVersions??=[]).push("2.1.2");const z=globalThis,x=e=>e,A=z.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,O=`<${C}>`,j=document,H=()=>j.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,D=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),W=new WeakMap,K=j.createTreeWalker(j,129);function G(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,n=[];let a,s=2===t?"<svg>":3===t?"<math>":"",o=N;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===N?"!--"===l[1]?o=L:void 0!==l[1]?o=D:void 0!==l[2]?(F.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=a??N,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?R:'"'===l[3]?I:V):o===I||o===V?o=R:o===L||o===D?o=N:(o=R,a=void 0);const p=o===R&&e[t+1].startsWith("/>")?" ":"";s+=o===N?i+O:c>=0?(n.push(r),i.slice(0,c)+P+i.slice(c)+E+p):i+E+(-2===c?t:p)}return[G(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class X{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let a=0,s=0;const o=e.length-1,r=this.parts,[l,c]=J(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=K.nextNode())&&r.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(P)){const t=c[s++],i=n.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?ne:"@"===o[1]?ae:te}),n.removeAttribute(e)}else e.startsWith(E)&&(r.push({type:6,index:a}),n.removeAttribute(e));if(F.test(n.tagName)){const e=n.textContent.split(E),t=e.length-1;if(t>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],H()),K.nextNode(),r.push({type:2,index:++a});n.append(e[t],H())}}}else if(8===n.nodeType)if(n.data===C)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=n.data.indexOf(E,e+1));)r.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){const i=j.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,n){if(t===B)return t;let a=void 0!==n?i._$Co?.[n]:i._$Cl;const s=T(t)?void 0:t._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(e),a._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=a:i._$Cl=a),void 0!==a&&(t=Q(e,a._$AS(e,t.values),a,n)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??j).importNode(t,!0);K.currentNode=n;let a=K.nextNode(),s=0,o=0,r=i[0];for(;void 0!==r;){if(s===r.index){let t;2===r.type?t=new ee(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new se(a,this,e)),this._$AV.push(t),r=i[++o]}s!==r?.index&&(a=K.nextNode(),s++)}return K.currentNode=j,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),T(e)?e===Z||null==e||""===e?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Z&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Y(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const a of e)n===t.length?t.push(i=new ee(this.O(H()),this.O(H()),this,this.options)):i=t[n],i._$AI(a),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,a){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(e,t=this,i,n){const a=this.strings;let s=!1;if(void 0===a)e=Q(this,e,t,0),s=!T(e)||e!==this._$AH&&e!==B,s&&(this._$AH=e);else{const n=e;let o,r;for(e=a[0],o=0;o<a.length-1;o++)r=Q(this,n[i+o],t,o),r===B&&(r=this._$AH[o]),s||=!T(r)||r!==this._$AH[o],r===Z?e=Z:e!==Z&&(e+=(r??"")+a[o+1]),this._$AH[o]=r}s&&!n&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}}class ne extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Z)}}class ae extends te{constructor(e,t,i,n,a){super(e,t,i,n,a),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??Z)===B)return;const i=this._$AH,n=e===Z&&i!==Z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==Z&&(i===Z||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const oe=z.litHtmlPolyfillSupport;oe?.(X,ee),(z.litHtmlVersions??=[]).push("3.3.3");const re=globalThis;let le=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let a=n._$litPart$;if(void 0===a){const e=i?.renderBefore??null;n._$litPart$=a=new ee(t.insertBefore(H(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};le._$litElement$=!0,le.finalized=!0,re.litElementHydrateSupport?.({LitElement:le});const ce=re.litElementPolyfillSupport;ce?.({LitElement:le}),(re.litElementVersions??=[]).push("4.2.2");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},he=(e=pe,t,i)=>{const{kind:n,metadata:a}=i;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,a,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const a=this[n];t.call(this,i),this.requestUpdate(n,a,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function ue(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return ue({...e,state:!0,attribute:!1})}var fe={title_off:"Vypnout zásuvku?",text_off:"Vypnutím zásuvky se odpojí napájení tiskárny.",title_cancel:"Zrušit tisk?",text_cancel:"Probíhající tisk bude zrušen a nelze jej obnovit.",confirm:"Potvrdit",back:"Zpět",resume:"Pokračovat",pause:"Pozastavit",cancel:"Zrušit tisk",preview:"Náhled tisku",nozzle:"Tryska",heatbed:"Vyhřívaná podložka",filament:"Filament",not_found:"Pro vybranou entitu nebyla nalezena tiskárna PrusaLink.",speed:"Rychlost tisku",flow:"Průtok",title_busy:"Zásuvku nelze vypnout",text_busy:"Akci nelze provést, protože tiskárna není v klidu (tiskne, je pozastavená nebo je ještě horká).",switch_off_when_possible:"Vypnout, až to půjde",waiting_off:"Čeká se na možnost vypnout zásuvku (kliknutím zrušíte)"},me={entity:"Entita tiskárny",switch_entity:"Zásuvka (nepovinné)",name:"Název zásuvky",state_content:"Druhotné informace zásuvky",progress_text:"Hodnota u průběhu",percent_done:"% hotovo",percent_remaining:"% zbývá",time_remaining:"Zbývající čas",finish_time:"Čas dokončení",show_speed:"Zobrazit rychlost tisku",show_flow:"Zobrazit průtok",secondary_entities:"Další hodnoty zásuvky (např. odběr)",icon:"Ikona zásuvky",image:"Obrázek zásuvky",use_image:"Použít obrázek (vypnuto = zobrazit ikonu)",pending_off_entity:"Pomocník pro vypnutí (input_boolean)",create_automation:"Vytvořit pomocníka a automatizaci",automation_created:"Vytvořeno. Zásuvku teď vypne přímo Home Assistant.",automation_failed:"Vytvoření se nezdařilo (potřebná práva správce)."},ge={card:fe,editor:me},ve={title_off:"Steckdose ausschalten?",text_off:"Das Ausschalten der Steckdose trennt den Drucker vom Strom.",title_cancel:"Druck abbrechen?",text_cancel:"Der laufende Druck wird abgebrochen und kann nicht fortgesetzt werden.",confirm:"Bestätigen",back:"Zurück",resume:"Fortsetzen",pause:"Pausieren",cancel:"Druck abbrechen",preview:"Druckvorschau",nozzle:"Düse",heatbed:"Heizbett",filament:"Filament",not_found:"Für die gewählte Entität wurde kein PrusaLink-Drucker gefunden.",speed:"Druckgeschwindigkeit",flow:"Flussrate",title_busy:"Steckdose kann nicht ausgeschaltet werden",text_busy:"Die Aktion kann nicht ausgeführt werden, da der Drucker nicht im Ruhezustand ist (er druckt, ist pausiert oder noch heiß).",switch_off_when_possible:"Ausschalten, sobald möglich",waiting_off:"Steckdose wird ausgeschaltet, sobald der Drucker es erlaubt (Klick zum Abbrechen)"},ye={entity:"Drucker-Entität",switch_entity:"Steckdose (optional)",name:"Name der Steckdose",state_content:"Zusatzinfo der Steckdose",progress_text:"Fortschrittswert",percent_done:"% erledigt",percent_remaining:"% verbleibend",time_remaining:"Verbleibende Zeit",finish_time:"Fertigstellungszeit",show_speed:"Druckgeschwindigkeit anzeigen",show_flow:"Flussrate anzeigen",secondary_entities:"Weitere Werte der Steckdose (z. B. Leistung)",icon:"Symbol der Steckdose",image:"Bild der Steckdose",use_image:"Bild verwenden (aus = Symbol anzeigen)",pending_off_entity:"Hilfsschalter zum Ausschalten (input_boolean)",create_automation:"Hilfsschalter und Automatisierung erstellen",automation_created:"Erstellt. Die Steckdose wird nun von Home Assistant selbst ausgeschaltet.",automation_failed:"Erstellen fehlgeschlagen (Administratorrechte erforderlich)."},we={card:ve,editor:ye},be={title_off:"Turn off the socket?",text_off:"Turning off the socket cuts the power to the printer.",title_cancel:"Cancel the print?",text_cancel:"The running print will be cancelled and cannot be resumed.",confirm:"Confirm",back:"Back",resume:"Resume",pause:"Pause",cancel:"Cancel print",preview:"Print preview",nozzle:"Nozzle",heatbed:"Heatbed",filament:"Filament",not_found:"No PrusaLink printer found for the selected entity.",speed:"Print speed",flow:"Flow rate",title_busy:"Cannot turn off the socket",text_busy:"The action cannot be performed because the printer is not idle (it is printing, paused or still hot).",switch_off_when_possible:"Switch off when possible",waiting_off:"Switching off the socket when the printer allows it (click to cancel)"},ke={entity:"Printer entity",switch_entity:"Socket (optional)",name:"Socket name",state_content:"Socket secondary info",progress_text:"Progress value",percent_done:"% done",percent_remaining:"% remaining",time_remaining:"Time remaining",finish_time:"Finish time",show_speed:"Show print speed",show_flow:"Show flow rate",secondary_entities:"Socket extra values (e.g. power draw)",icon:"Socket icon",image:"Socket picture",use_image:"Use the picture (off = show the icon)",pending_off_entity:"Switch-off helper (input_boolean)",create_automation:"Create helper and automation",automation_created:"Created. The socket will now be switched off by Home Assistant itself.",automation_failed:"Creating failed (administrator rights needed)."},$e={card:be,editor:ke},ze={title_off:"¿Apagar el enchufe?",text_off:"Al apagar el enchufe se corta la alimentación de la impresora.",title_cancel:"¿Cancelar la impresión?",text_cancel:"La impresión en curso se cancelará y no se podrá reanudar.",confirm:"Confirmar",back:"Volver",resume:"Reanudar",pause:"Pausar",cancel:"Cancelar impresión",preview:"Vista previa de impresión",nozzle:"Boquilla",heatbed:"Cama caliente",filament:"Filamento",not_found:"No se encontró ninguna impresora PrusaLink para la entidad seleccionada.",speed:"Velocidad de impresión",flow:"Flujo",title_busy:"No se puede apagar el enchufe",text_busy:"No se puede realizar la acción porque la impresora no está en reposo (imprime, está en pausa o sigue caliente).",switch_off_when_possible:"Apagar cuando sea posible",waiting_off:"Se apagará el enchufe cuando la impresora lo permita (clic para cancelar)"},xe={entity:"Entidad de la impresora",switch_entity:"Enchufe (opcional)",name:"Nombre del enchufe",state_content:"Información secundaria del enchufe",progress_text:"Valor de progreso",percent_done:"% completado",percent_remaining:"% restante",time_remaining:"Tiempo restante",finish_time:"Hora de finalización",show_speed:"Mostrar velocidad de impresión",show_flow:"Mostrar flujo",secondary_entities:"Valores adicionales del enchufe (p. ej. consumo)",icon:"Icono del enchufe",image:"Imagen del enchufe",use_image:"Usar la imagen (apagado = mostrar el icono)",pending_off_entity:"Ayudante de apagado (input_boolean)",create_automation:"Crear ayudante y automatización",automation_created:"Creado. Home Assistant apagará el enchufe por sí mismo.",automation_failed:"Error al crear (se necesitan permisos de administrador)."},Ae={card:ze,editor:xe},Se={title_off:"Éteindre la prise ?",text_off:"L'extinction de la prise coupe l'alimentation de l'imprimante.",title_cancel:"Annuler l'impression ?",text_cancel:"L'impression en cours sera annulée et ne pourra pas être reprise.",confirm:"Confirmer",back:"Retour",resume:"Reprendre",pause:"Pause",cancel:"Annuler l'impression",preview:"Aperçu de l'impression",nozzle:"Buse",heatbed:"Plateau chauffant",filament:"Filament",not_found:"Aucune imprimante PrusaLink trouvée pour l'entité sélectionnée.",speed:"Vitesse d'impression",flow:"Débit",title_busy:"Impossible d'éteindre la prise",text_busy:"L'action ne peut pas être effectuée car l'imprimante n'est pas au repos (elle imprime, est en pause ou est encore chaude).",switch_off_when_possible:"Éteindre dès que possible",waiting_off:"La prise sera éteinte dès que l'imprimante le permet (cliquer pour annuler)"},Pe={entity:"Entité de l'imprimante",switch_entity:"Prise (facultatif)",name:"Nom de la prise",state_content:"Informations secondaires de la prise",progress_text:"Valeur de progression",percent_done:"% effectué",percent_remaining:"% restant",time_remaining:"Temps restant",finish_time:"Heure de fin",show_speed:"Afficher la vitesse d'impression",show_flow:"Afficher le débit",secondary_entities:"Valeurs supplémentaires de la prise (p. ex. consommation)",icon:"Icône de la prise",image:"Image de la prise",use_image:"Utiliser l'image (désactivé = afficher l'icône)",pending_off_entity:"Assistant d'extinction (input_boolean)",create_automation:"Créer l'assistant et l'automatisation",automation_created:"Créé. La prise sera désormais éteinte par Home Assistant lui-même.",automation_failed:"Échec de la création (droits administrateur requis)."},Ee={card:Se,editor:Pe},Ce={title_off:"לכבות את השקע?",text_off:"כיבוי השקע ינתק את המתח מהמדפסת.",title_cancel:"לבטל את ההדפסה?",text_cancel:"ההדפסה הנוכחית תבוטל ולא ניתן יהיה לחדשה.",confirm:"אישור",back:"חזרה",resume:"המשך",pause:"השהיה",cancel:"ביטול הדפסה",preview:"תצוגה מקדימה",nozzle:"פיית הדפסה",heatbed:"משטח מחומם",filament:"חוט הדפסה",not_found:"לא נמצאה מדפסת PrusaLink עבור הישות שנבחרה.",speed:"מהירות הדפסה",flow:"קצב זרימה",title_busy:"לא ניתן לכבות את השקע",text_busy:"לא ניתן לבצע את הפעולה מפני שהמדפסת אינה במנוחה (היא מדפיסה, מושהית או עדיין חמה).",switch_off_when_possible:"כבה כשיתאפשר",waiting_off:"השקע יכובה ברגע שהמדפסת תאפשר זאת (לחץ לביטול)"},Oe={entity:"ישות המדפסת",switch_entity:"שקע (אופציונלי)",name:"שם השקע",state_content:"מידע משני של השקע",progress_text:"ערך התקדמות",percent_done:"% הושלם",percent_remaining:"% נותר",time_remaining:"זמן שנותר",finish_time:"שעת סיום",show_speed:"הצג מהירות הדפסה",show_flow:"הצג קצב זרימה",secondary_entities:"ערכים נוספים של השקע (למשל צריכת חשמל)",icon:"סמל השקע",image:"תמונת השקע",use_image:"השתמש בתמונה (כבוי = הצג סמל)",pending_off_entity:"עוזר כיבוי (input_boolean)",create_automation:"צור עוזר ואוטומציה",automation_created:"נוצר. השקע יכובה כעת על ידי Home Assistant עצמו.",automation_failed:"היצירה נכשלה (נדרשות הרשאות מנהל)."},je={card:Ce,editor:Oe},He={title_off:"Kikapcsolja a konnektort?",text_off:"A konnektor kikapcsolása megszakítja a nyomtató áramellátását.",title_cancel:"Megszakítja a nyomtatást?",text_cancel:"A folyamatban lévő nyomtatás megszakad, és nem folytatható.",confirm:"Megerősítés",back:"Vissza",resume:"Folytatás",pause:"Szünet",cancel:"Nyomtatás megszakítása",preview:"Nyomtatás előnézete",nozzle:"Fúvóka",heatbed:"Fűtött asztal",filament:"Filament",not_found:"A kiválasztott entitáshoz nem található PrusaLink nyomtató.",speed:"Nyomtatási sebesség",flow:"Átfolyás",title_busy:"A konnektor nem kapcsolható ki",text_busy:"A művelet nem hajtható végre, mert a nyomtató nem tétlen (nyomtat, szünetel vagy még forró).",switch_off_when_possible:"Kikapcsolás, amint lehet",waiting_off:"A konnektor kikapcsol, amint a nyomtató engedi (kattintson a megszakításhoz)"},Te={entity:"Nyomtató entitás",switch_entity:"Konnektor (nem kötelező)",name:"Konnektor neve",state_content:"Konnektor másodlagos információja",progress_text:"Haladás értéke",percent_done:"% kész",percent_remaining:"% hátravan",time_remaining:"Hátralévő idő",finish_time:"Befejezési idő",show_speed:"Nyomtatási sebesség megjelenítése",show_flow:"Átfolyás megjelenítése",secondary_entities:"A konnektor további értékei (pl. fogyasztás)",icon:"A konnektor ikonja",image:"A konnektor képe",use_image:"Kép használata (kikapcsolva = ikon megjelenítése)",pending_off_entity:"Kikapcsolási segéd (input_boolean)",create_automation:"Segéd és automatizálás létrehozása",automation_created:"Létrehozva. A konnektort mostantól maga a Home Assistant kapcsolja ki.",automation_failed:"A létrehozás sikertelen (rendszergazdai jogosultság szükséges)."},Me={card:He,editor:Te},Ue={title_off:"Spegnere la presa?",text_off:"Spegnendo la presa si interrompe l'alimentazione della stampante.",title_cancel:"Annullare la stampa?",text_cancel:"La stampa in corso verrà annullata e non potrà essere ripresa.",confirm:"Conferma",back:"Indietro",resume:"Riprendi",pause:"Pausa",cancel:"Annulla stampa",preview:"Anteprima di stampa",nozzle:"Ugello",heatbed:"Piatto riscaldato",filament:"Filamento",not_found:"Nessuna stampante PrusaLink trovata per l'entità selezionata.",speed:"Velocità di stampa",flow:"Flusso",title_busy:"Impossibile spegnere la presa",text_busy:"L'azione non può essere eseguita perché la stampante non è a riposo (sta stampando, è in pausa o è ancora calda).",switch_off_when_possible:"Spegni quando possibile",waiting_off:"La presa verrà spenta appena la stampante lo consente (clic per annullare)"},Ne={entity:"Entità della stampante",switch_entity:"Presa (facoltativo)",name:"Nome della presa",state_content:"Informazioni secondarie della presa",progress_text:"Valore di avanzamento",percent_done:"% completato",percent_remaining:"% rimanente",time_remaining:"Tempo rimanente",finish_time:"Ora di fine",show_speed:"Mostra velocità di stampa",show_flow:"Mostra flusso",secondary_entities:"Valori aggiuntivi della presa (es. consumo)",icon:"Icona della presa",image:"Immagine della presa",use_image:"Usa l'immagine (spento = mostra l'icona)",pending_off_entity:"Aiutante di spegnimento (input_boolean)",create_automation:"Crea aiutante e automazione",automation_created:"Creato. La presa verrà spenta direttamente da Home Assistant.",automation_failed:"Creazione non riuscita (servono i permessi di amministratore)."},Le={card:Ue,editor:Ne},De={title_off:"コンセントをオフにしますか？",text_off:"コンセントをオフにするとプリンターへの電源が切れます。",title_cancel:"印刷をキャンセルしますか？",text_cancel:"実行中の印刷はキャンセルされ、再開できません。",confirm:"確認",back:"戻る",resume:"再開",pause:"一時停止",cancel:"印刷をキャンセル",preview:"印刷プレビュー",nozzle:"ノズル",heatbed:"ヒートベッド",filament:"フィラメント",not_found:"選択したエンティティに PrusaLink プリンターが見つかりません。",speed:"印刷速度",flow:"流量",title_busy:"コンセントをオフにできません",text_busy:"プリンターが待機状態ではないため（印刷中、一時停止中、またはまだ高温）、この操作は実行できません。",switch_off_when_possible:"可能になり次第オフ",waiting_off:"プリンターが許可し次第コンセントをオフにします（クリックでキャンセル）"},Re={entity:"プリンターのエンティティ",switch_entity:"コンセント（任意）",name:"コンセント名",state_content:"コンセントの補足情報",progress_text:"進捗の表示値",percent_done:"% 完了",percent_remaining:"% 残り",time_remaining:"残り時間",finish_time:"終了時刻",show_speed:"印刷速度を表示",show_flow:"流量を表示",secondary_entities:"コンセントの追加値（例：消費電力）",icon:"コンセントのアイコン",image:"コンセントの画像",use_image:"画像を使用（オフ = アイコンを表示）",pending_off_entity:"オフ用ヘルパー（input_boolean）",create_automation:"ヘルパーとオートメーションを作成",automation_created:"作成しました。コンセントは Home Assistant 自身がオフにします。",automation_failed:"作成に失敗しました（管理者権限が必要です）。"},Ve={card:De,editor:Re},Ie={title_off:"Stopcontact uitschakelen?",text_off:"Door het stopcontact uit te schakelen wordt de printer van stroom losgekoppeld.",title_cancel:"Print annuleren?",text_cancel:"De lopende print wordt geannuleerd en kan niet worden hervat.",confirm:"Bevestigen",back:"Terug",resume:"Hervatten",pause:"Pauzeren",cancel:"Print annuleren",preview:"Printvoorbeeld",nozzle:"Nozzle",heatbed:"Verwarmd bed",filament:"Filament",not_found:"Geen PrusaLink-printer gevonden voor de geselecteerde entiteit.",speed:"Printsnelheid",flow:"Doorvoer",title_busy:"Stopcontact kan niet worden uitgeschakeld",text_busy:"De actie kan niet worden uitgevoerd omdat de printer niet in rust is (hij print, is gepauzeerd of is nog heet).",switch_off_when_possible:"Uitschakelen zodra mogelijk",waiting_off:"Stopcontact wordt uitgeschakeld zodra de printer het toelaat (klik om te annuleren)"},Fe={entity:"Printerentiteit",switch_entity:"Stopcontact (optioneel)",name:"Naam van het stopcontact",state_content:"Secundaire info van het stopcontact",progress_text:"Voortgangswaarde",percent_done:"% gereed",percent_remaining:"% resterend",time_remaining:"Resterende tijd",finish_time:"Eindtijd",show_speed:"Printsnelheid tonen",show_flow:"Doorvoer tonen",secondary_entities:"Extra waarden van het stopcontact (bijv. verbruik)",icon:"Pictogram van het stopcontact",image:"Afbeelding van het stopcontact",use_image:"Afbeelding gebruiken (uit = pictogram tonen)",pending_off_entity:"Hulpmiddel voor uitschakelen (input_boolean)",create_automation:"Hulpmiddel en automatisering aanmaken",automation_created:"Aangemaakt. Home Assistant schakelt het stopcontact nu zelf uit.",automation_failed:"Aanmaken mislukt (beheerdersrechten nodig)."},qe={card:Ie,editor:Fe},Be={title_off:"Slå av stikkontakten?",text_off:"Når stikkontakten slås av, kuttes strømmen til skriveren.",title_cancel:"Avbryte utskriften?",text_cancel:"Den pågående utskriften avbrytes og kan ikke gjenopptas.",confirm:"Bekreft",back:"Tilbake",resume:"Gjenoppta",pause:"Pause",cancel:"Avbryt utskrift",preview:"Forhåndsvisning",nozzle:"Dyse",heatbed:"Varmeseng",filament:"Filament",not_found:"Fant ingen PrusaLink-skriver for den valgte enheten.",speed:"Utskriftshastighet",flow:"Flyt",title_busy:"Stikkontakten kan ikke slås av",text_busy:"Handlingen kan ikke utføres fordi skriveren ikke er i hvile (den skriver ut, er pauset eller er fortsatt varm).",switch_off_when_possible:"Slå av når det er mulig",waiting_off:"Stikkontakten slås av så snart skriveren tillater det (klikk for å avbryte)"},Ze={entity:"Skriverentitet",switch_entity:"Stikkontakt (valgfritt)",name:"Navn på stikkontakten",state_content:"Sekundær informasjon for stikkontakten",progress_text:"Fremdriftsverdi",percent_done:"% ferdig",percent_remaining:"% gjenstår",time_remaining:"Gjenstående tid",finish_time:"Sluttid",show_speed:"Vis utskriftshastighet",show_flow:"Vis flyt",secondary_entities:"Ekstra verdier for stikkontakten (f.eks. effekt)",icon:"Ikon for stikkontakten",image:"Bilde for stikkontakten",use_image:"Bruk bildet (av = vis ikonet)",pending_off_entity:"Hjelper for avslåing (input_boolean)",create_automation:"Opprett hjelper og automatisering",automation_created:"Opprettet. Stikkontakten slås nå av av Home Assistant selv.",automation_failed:"Opprettelsen mislyktes (krever administratorrettigheter)."},We={card:Be,editor:Ze},Ke={title_off:"Wyłączyć gniazdko?",text_off:"Wyłączenie gniazdka odetnie zasilanie drukarki.",title_cancel:"Anulować drukowanie?",text_cancel:"Trwający wydruk zostanie anulowany i nie będzie można go wznowić.",confirm:"Potwierdź",back:"Wstecz",resume:"Wznów",pause:"Wstrzymaj",cancel:"Anuluj wydruk",preview:"Podgląd wydruku",nozzle:"Dysza",heatbed:"Podgrzewany stół",filament:"Filament",not_found:"Nie znaleziono drukarki PrusaLink dla wybranej encji.",speed:"Prędkość druku",flow:"Przepływ",title_busy:"Nie można wyłączyć gniazdka",text_busy:"Nie można wykonać akcji, ponieważ drukarka nie jest w spoczynku (drukuje, jest wstrzymana lub jest jeszcze gorąca).",switch_off_when_possible:"Wyłącz, gdy będzie można",waiting_off:"Gniazdko zostanie wyłączone, gdy drukarka na to pozwoli (kliknij, aby anulować)"},Ge={entity:"Encja drukarki",switch_entity:"Gniazdko (opcjonalnie)",name:"Nazwa gniazdka",state_content:"Informacje dodatkowe gniazdka",progress_text:"Wartość postępu",percent_done:"% gotowe",percent_remaining:"% pozostało",time_remaining:"Pozostały czas",finish_time:"Czas zakończenia",show_speed:"Pokaż prędkość druku",show_flow:"Pokaż przepływ",secondary_entities:"Dodatkowe wartości gniazdka (np. pobór mocy)",icon:"Ikona gniazdka",image:"Obraz gniazdka",use_image:"Użyj obrazu (wyłączone = pokaż ikonę)",pending_off_entity:"Pomocnik wyłączania (input_boolean)",create_automation:"Utwórz pomocnika i automatyzację",automation_created:"Utworzono. Gniazdko wyłączy teraz sam Home Assistant.",automation_failed:"Tworzenie nie powiodło się (wymagane uprawnienia administratora)."},Je={card:Ke,editor:Ge},Xe={title_off:"Desligar a tomada?",text_off:"Desligar a tomada corta a alimentação da impressora.",title_cancel:"Cancelar a impressão?",text_cancel:"A impressão em curso será cancelada e não poderá ser retomada.",confirm:"Confirmar",back:"Voltar",resume:"Retomar",pause:"Pausar",cancel:"Cancelar impressão",preview:"Pré-visualização da impressão",nozzle:"Bico",heatbed:"Mesa aquecida",filament:"Filamento",not_found:"Nenhuma impressora PrusaLink encontrada para a entidade selecionada.",speed:"Velocidade de impressão",flow:"Fluxo",title_busy:"Não é possível desligar a tomada",text_busy:"A ação não pode ser executada porque a impressora não está em repouso (está a imprimir, em pausa ou ainda quente).",switch_off_when_possible:"Desligar quando possível",waiting_off:"A tomada será desligada quando a impressora o permitir (clique para cancelar)"},Qe={entity:"Entidade da impressora",switch_entity:"Tomada (opcional)",name:"Nome da tomada",state_content:"Informação secundária da tomada",progress_text:"Valor de progresso",percent_done:"% concluído",percent_remaining:"% restante",time_remaining:"Tempo restante",finish_time:"Hora de conclusão",show_speed:"Mostrar velocidade de impressão",show_flow:"Mostrar fluxo",secondary_entities:"Valores adicionais da tomada (ex. consumo)",icon:"Ícone da tomada",image:"Imagem da tomada",use_image:"Usar a imagem (desligado = mostrar o ícone)",pending_off_entity:"Auxiliar de desligamento (input_boolean)",create_automation:"Criar auxiliar e automação",automation_created:"Criado. A tomada será desligada pelo próprio Home Assistant.",automation_failed:"Falha ao criar (são necessárias permissões de administrador)."},Ye={card:Xe,editor:Qe},et={title_off:"Vypnúť zásuvku?",text_off:"Vypnutím zásuvky sa odpojí napájanie tlačiarne.",title_cancel:"Zrušiť tlač?",text_cancel:"Prebiehajúca tlač bude zrušená a nedá sa obnoviť.",confirm:"Potvrdiť",back:"Späť",resume:"Pokračovať",pause:"Pozastaviť",cancel:"Zrušiť tlač",preview:"Náhľad tlače",nozzle:"Tryska",heatbed:"Vyhrievaná podložka",filament:"Filament",not_found:"Pre vybranú entitu sa nenašla tlačiareň PrusaLink.",speed:"Rýchlosť tlače",flow:"Prietok",title_busy:"Zásuvku nemožno vypnúť",text_busy:"Akciu nemožno vykonať, pretože tlačiareň nie je v pokoji (tlačí, je pozastavená alebo je ešte horúca).",switch_off_when_possible:"Vypnúť, keď to pôjde",waiting_off:"Čaká sa na možnosť vypnúť zásuvku (kliknutím zrušíte)"},tt={entity:"Entita tlačiarne",switch_entity:"Zásuvka (nepovinné)",name:"Názov zásuvky",state_content:"Doplnkové informácie zásuvky",progress_text:"Hodnota pri priebehu",percent_done:"% hotovo",percent_remaining:"% zostáva",time_remaining:"Zostávajúci čas",finish_time:"Čas dokončenia",show_speed:"Zobraziť rýchlosť tlače",show_flow:"Zobraziť prietok",secondary_entities:"Ďalšie hodnoty zásuvky (napr. odber)",icon:"Ikona zásuvky",image:"Obrázok zásuvky",use_image:"Použiť obrázok (vypnuté = zobraziť ikonu)",pending_off_entity:"Pomocník na vypnutie (input_boolean)",create_automation:"Vytvoriť pomocníka a automatizáciu",automation_created:"Vytvorené. Zásuvku teraz vypne priamo Home Assistant.",automation_failed:"Vytvorenie zlyhalo (potrebné práva správcu)."},it={card:et,editor:tt},nt={title_off:"Stänga av uttaget?",text_off:"Om uttaget stängs av bryts strömmen till skrivaren.",title_cancel:"Avbryta utskriften?",text_cancel:"Pågående utskrift avbryts och kan inte återupptas.",confirm:"Bekräfta",back:"Tillbaka",resume:"Återuppta",pause:"Pausa",cancel:"Avbryt utskrift",preview:"Förhandsvisning",nozzle:"Munstycke",heatbed:"Värmebädd",filament:"Filament",not_found:"Ingen PrusaLink-skrivare hittades för den valda entiteten.",speed:"Utskriftshastighet",flow:"Flöde",title_busy:"Uttaget kan inte stängas av",text_busy:"Åtgärden kan inte utföras eftersom skrivaren inte är i vila (den skriver ut, är pausad eller är fortfarande varm).",switch_off_when_possible:"Stäng av när det går",waiting_off:"Uttaget stängs av så snart skrivaren tillåter det (klicka för att avbryta)"},at={entity:"Skrivarentitet",switch_entity:"Uttag (valfritt)",name:"Uttagets namn",state_content:"Sekundär information för uttaget",progress_text:"Förloppsvärde",percent_done:"% klart",percent_remaining:"% kvar",time_remaining:"Återstående tid",finish_time:"Sluttid",show_speed:"Visa utskriftshastighet",show_flow:"Visa flöde",secondary_entities:"Extra värden för uttaget (t.ex. effekt)",icon:"Ikon för uttaget",image:"Bild för uttaget",use_image:"Använd bilden (av = visa ikonen)",pending_off_entity:"Hjälpare för avstängning (input_boolean)",create_automation:"Skapa hjälpare och automation",automation_created:"Skapad. Uttaget stängs nu av av Home Assistant själv.",automation_failed:"Det gick inte att skapa (administratörsrättigheter krävs)."},st={card:nt,editor:at},ot={title_off:"Вимкнути розетку?",text_off:"Вимкнення розетки відключить живлення принтера.",title_cancel:"Скасувати друк?",text_cancel:"Поточний друк буде скасовано, і його не можна буде відновити.",confirm:"Підтвердити",back:"Назад",resume:"Продовжити",pause:"Призупинити",cancel:"Скасувати друк",preview:"Попередній перегляд друку",nozzle:"Сопло",heatbed:"Підігрівний стіл",filament:"Філамент",not_found:"Для вибраної сутності не знайдено принтер PrusaLink.",speed:"Швидкість друку",flow:"Потік",title_busy:"Неможливо вимкнути розетку",text_busy:"Дію неможливо виконати, оскільки принтер не в стані спокою (друкує, призупинений або ще гарячий).",switch_off_when_possible:"Вимкнути, щойно можна",waiting_off:"Розетку буде вимкнено, щойно принтер це дозволить (натисніть, щоб скасувати)"},rt={entity:"Сутність принтера",switch_entity:"Розетка (необов’язково)",name:"Назва розетки",state_content:"Додаткова інформація розетки",progress_text:"Значення прогресу",percent_done:"% виконано",percent_remaining:"% залишилось",time_remaining:"Залишилось часу",finish_time:"Час завершення",show_speed:"Показувати швидкість друку",show_flow:"Показувати потік",secondary_entities:"Додаткові значення розетки (напр. споживання)",icon:"Іконка розетки",image:"Зображення розетки",use_image:"Використовувати зображення (вимк. = показати іконку)",pending_off_entity:"Допоміжний елемент вимкнення (input_boolean)",create_automation:"Створити допоміжний елемент і автоматизацію",automation_created:"Створено. Розетку тепер вимкне сам Home Assistant.",automation_failed:"Не вдалося створити (потрібні права адміністратора)."},lt={card:ot,editor:rt},ct={title_off:"关闭插座？",text_off:"关闭插座将切断打印机的电源。",title_cancel:"取消打印？",text_cancel:"正在进行的打印将被取消且无法恢复。",confirm:"确认",back:"返回",resume:"继续",pause:"暂停",cancel:"取消打印",preview:"打印预览",nozzle:"喷嘴",heatbed:"热床",filament:"耗材",not_found:"未找到所选实体对应的 PrusaLink 打印机。",speed:"打印速度",flow:"流量",title_busy:"无法关闭插座",text_busy:"打印机未处于空闲状态（正在打印、已暂停或仍然很热），无法执行该操作。",switch_off_when_possible:"可关闭时自动关闭",waiting_off:"待打印机允许后将关闭插座（点击取消）"},dt={entity:"打印机实体",switch_entity:"插座（可选）",name:"插座名称",state_content:"插座次要信息",progress_text:"进度数值",percent_done:"已完成 %",percent_remaining:"剩余 %",time_remaining:"剩余时间",finish_time:"完成时间",show_speed:"显示打印速度",show_flow:"显示流量",secondary_entities:"插座附加数值（例如功率）",icon:"插座图标",image:"插座图片",use_image:"使用图片（关闭 = 显示图标）",pending_off_entity:"关闭辅助项（input_boolean）",create_automation:"创建辅助项和自动化",automation_created:"已创建。现在由 Home Assistant 自己关闭插座。",automation_failed:"创建失败（需要管理员权限）。"},pt={card:ct,editor:dt};const ht={cs:Object.freeze({__proto__:null,card:fe,default:ge,editor:me}),de:Object.freeze({__proto__:null,card:ve,default:we,editor:ye}),en:Object.freeze({__proto__:null,card:be,default:$e,editor:ke}),es:Object.freeze({__proto__:null,card:ze,default:Ae,editor:xe}),fr:Object.freeze({__proto__:null,card:Se,default:Ee,editor:Pe}),he:Object.freeze({__proto__:null,card:Ce,default:je,editor:Oe}),hu:Object.freeze({__proto__:null,card:He,default:Me,editor:Te}),it:Object.freeze({__proto__:null,card:Ue,default:Le,editor:Ne}),ja:Object.freeze({__proto__:null,card:De,default:Ve,editor:Re}),nl:Object.freeze({__proto__:null,card:Ie,default:qe,editor:Fe}),no:Object.freeze({__proto__:null,card:Be,default:We,editor:Ze}),pl:Object.freeze({__proto__:null,card:Ke,default:Je,editor:Ge}),pt:Object.freeze({__proto__:null,card:Xe,default:Ye,editor:Qe}),sk:Object.freeze({__proto__:null,card:et,default:it,editor:tt}),sv:Object.freeze({__proto__:null,card:nt,default:st,editor:at}),uk:Object.freeze({__proto__:null,card:ot,default:lt,editor:rt}),zh:Object.freeze({__proto__:null,card:ct,default:pt,editor:dt})};function ut(e,t){try{return e.split(".").reduce((e,t)=>e[t],ht[t])}catch{return}}function _t(e){return function(t){return ut(t,e?.locale.language??"en")||ut(t,"en")||t}}const ft="prusalink";function mt(e,t){const i=e.entities??{},n=t?i[t]?.device_id:void 0;return n?Object.entries(i).filter(([,e])=>e.device_id===n).map(([e])=>e):[]}function gt(e,t){return!!t&&e.entities?.[t]?.platform===ft}const vt=2;class yt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class wt extends yt{constructor(e){if(super(e),this.it=Z,e.type!==vt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Z||null==e)return this._t=void 0,this.it=e;if(e===B)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}wt.directiveName="unsafeHTML",wt.resultType=1;const bt=(e=>(...t)=>({_$litDirective$:e,values:t}))(wt),kt={status_filament:'<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 231.76 231.76"><path fill="currentColor" d="M115.88 0C51.88 0 0 51.88 0 115.88c0 21.47 5.84 41.57 16.02 58.8v-59.05c.13-55.04 44.8-99.62 99.85-99.62 88.68 0 133.36 107.72 70.6 170.47-47.62 47.63-121.14 33.36-153.82-15.06v25.08c21.06 21.73 50.56 35.24 83.2 35.24 64 0 115.88-51.88 115.88-115.88S179.87-.01 115.87-.01zm30.67 85.2c-27.24-27.25-74.03-7.86-74.03 30.67 0 38.52 46.8 57.92 74.03 30.67 16.93-16.94 16.94-44.4 0-61.33zm-30.67-.54c-17.23 0-31.2 13.97-31.2 31.2s13.97 31.2 31.2 31.2 31.2-13.97 31.2-31.2-13.97-31.2-31.2-31.2"/><path fill="#fa6831" d="M115.88 16.02c88.68 0 133.36 107.72 70.6 170.47-47.62 47.63-121.14 33.36-153.82-15.06v51.42a8.32 8.32 0 1 1-16.64 0v-107.2c.13-55.04 44.8-99.62 99.85-99.62zm30.67 69.2c-27.24-27.25-74.03-7.86-74.03 30.67 0 38.52 46.8 57.92 74.03 30.67 16.93-16.94 16.94-44.4 0-61.33z"/></svg>',status_heatbed:'<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 10.08 8.18"><path fill="#fa6831" d="M3.12 5.02c-.8-.78-.9-1.24-.2-2.13.24-.3.35-.62.35-.92C3.27 1.34 2.8.72 2.2 0l-.95.9c.9 1.05.82 1.16.17 2.08q-.3.45-.3.9c0 .76.57 1.48 1.1 2.02l.9-.87zm5.7 0c-.8-.78-.9-1.24-.2-2.13.24-.3.35-.62.35-.92C8.96 1.34 8.5.72 7.9 0l-.95.9c.9 1.05.82 1.16.17 2.08q-.3.45-.3.9c0 .76.57 1.48 1.1 2.02l.9-.87zm-2.88 0c-.8-.78-.9-1.24-.2-2.13.24-.3.35-.62.35-.92 0-.63-.46-1.25-1.06-1.97l-.95.9c.9 1.05.82 1.16.17 2.08q-.3.45-.3.9c0 .76.57 1.48 1.1 2.02l.9-.87z"/><path fill="currentColor" fill-rule="nonzero" d="M0 6.8h10.08v1.4H0z"/></svg>',status_nozzle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.2 8.97"><path fill="#fa6831" d="M4.16 4.4v1.1a.56.56 0 0 1-.56.56H1.12v.34h5.53a.56.56 0 0 1 .56.56v1.45a.56.56 0 0 1-.56.56H.57a.56.56 0 1 1 0-1.12H6.1v-.34H.57a.56.56 0 0 1-.56-.56V5.5a.56.56 0 0 1 .56-.56h2.48V4.4h1.12z"/><path fill="currentColor" d="M6.13 0v2.06L4.34 4.4H2.86l-1.8-2.33V0H2.2v1.68l1.2 1.6h.4L5 1.68V0z"/></svg>',status_prnflow:'<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 61.95 67.58"><path fill="#fa6831" d="M25.32 50.7h-8.47l14.08 16.9L45 50.7z"/><path fill="currentColor" d="m36.56 47.38.02.02c0-15 15.37-36.93 25.37-47.4H49.6c-4.32 4.1-9.08 10.27-13.02 16.9V0H25.33v16.9C21.4 10.27 16.7 4.1 12.37 0H.01c10 10.47 25.3 32.4 25.3 47.4l.02-.02h11.24z"/></svg>',status_prnspeed:'<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 1028.03 771.02"><path fill="currentColor" d="M1028.03 514c0 93.56-25.1 181.33-68.97 256.96L884.7 728c36.46-63 57.65-135.96 57.65-214C942.35 277.42 750.6 85.66 514 85.66 277.44 85.66 85.68 277.42 85.68 514c0 78.05 21.2 151 57.65 214l-74.36 42.97C25.1 695.32 0 607.55 0 514 0 230.6 230.6 0 514 0c283.43 0 514.02 230.6 514.02 514zM514 771.02c-55.43 0-100.35-44.92-100.35-100.35 0-37.82 20.95-70.76 51.82-87.86L514 342.67l48.54 240.08c30.92 17.1 51.82 50.03 51.82 87.86 0 55.47-44.92 100.4-100.36 100.4z"/><path fill="#fa6831" d="M541.77 156.87c-9.37-.78-18.7-1.1-27.8-1.1-9.08 0-18.46.4-27.84 1.1v119.25c9.26-1.06 18.6-1.63 27.84-1.63 9.26 0 18.6.5 27.8 1.63zM789.83 287.9a377 377 0 0 0-39.32-40.99l-80.97 84.35c14.52 12.08 27.72 25.87 39.32 41l80.97-84.35zm-111.4-91.23c-16.58-8.77-33.84-16.23-51.4-22.22l-43.86 110.22a240.7 240.7 0 0 1 51.4 22.22zM274.3 462.24c5.18-18.63 12.33-36.6 21.34-53.54l-105.77-45.65a384 384 0 0 0-21.34 53.53l105.77 45.65zm118.2-154.9a240.8 240.8 0 0 1 51.32-22.4l-44.3-110.04a357 357 0 0 0-51.32 22.44zm-73.47 64.9a254 254 0 0 1 39.38-41l-80.97-84.35c-14.05 12.6-27.28 26.34-39.32 41l80.9 84.35zm538.57 38.68c-6.04-18.3-13.45-36.15-22.1-53.2L730.37 405.1c9.3 16.87 16.7 34.7 22.15 53.2l105.07-47.37z"/></svg>'};function $t(e){return q`${bt(kt[e]??"")}`}const zt=["unavailable","unknown",""];function xt(e){return!!e&&!zt.includes(e.state)}function At(e){if(!xt(e))return;const t=Number(e.state);return Number.isFinite(t)?t:void 0}function St(e){return"printing"===e||"paused"===e}const Pt=["idle","ready","finished","stopped"];function Et(e,t){return void 0===e?"–":`${Math.round(e)}/${Math.round(t??0)} °C`}function Ct(e){return void 0===e?"–":`${Math.round(e)} %`}function Ot(e,t,i,n){const a=e.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit",timeZone:n});if(function(e,t,i){const n=new Intl.DateTimeFormat("en-CA",{timeZone:i});return n.format(e)===n.format(t)}(e,t,n))return a;return`${e.toLocaleDateString(i,{day:"numeric",month:"numeric",timeZone:n})} ${a}`}function jt(e){if(!xt(e))return;const t=new Date(e.state);return Number.isNaN(t.getTime())?void 0:t}function Ht({mode:e,progress:t,finish:i,now:n,language:a,timeZone:s}){switch(e){case"percent_remaining":return void 0===t?"–":`${Math.round(100-t)} %`;case"time_remaining":return i?function(e){const t=Math.max(0,Math.round(e/6e4)),i=Math.floor(t/60),n=t%60;return 0===i?`${n} min`:`${i} h ${n.toString().padStart(2,"0")} min`}(i.getTime()-n.getTime()):"–";case"finish_time":return i?Ot(i,n,a,s):"–";default:return void 0===t?"–":`${Math.round(t)} %`}}function Tt(e){return!!e&&"unavailable"!==e.state}function Mt(e,t,i){if(Tt(e))return{kind:"pause",button:e};const n=function(e,t){return Tt(t)&&!Tt(e)?t:e??t}(t,i);return Tt(n)?{kind:"resume",button:n}:{kind:"pause",button:e}}const Ut={"sensor.":"state","sensor.filename":"filename","sensor.progress":"progress","sensor.print_finish":"finish","sensor.nozzle_temperature":"nozzle","sensor.nozzle_target_temperature":"nozzleTarget","sensor.heatbed_temperature":"bed","sensor.heatbed_target_temperature":"bedTarget","sensor.material":"material","sensor.print_speed":"speed","sensor.print_flow":"flow","button.resume_job":"resume","button.continue_job":"continue","button.pause_job":"pause","button.cancel_job":"cancel"},Nt=e=>e.replace(/_\d+$/,"");function Lt(e){const t=e.map(e=>{const[t,i=""]=e.split(".");return{id:e,domain:t,stripped:Nt(i)}}),i=t.map(e=>e.stripped).reduce((e,t)=>t.length<e.length?t:e,t[0]?.stripped??"");if(!i)return{};const n={};for(const{id:e,domain:a,stripped:s}of t){if(s!==i&&!s.startsWith(`${i}_`))continue;const t=s.slice(i.length+1);if("camera"===a&&t.startsWith("preview")){n.preview??=e;continue}const o=Ut[`${a}.${t}`];o&&(n[o]??=e)}return n}const Dt=r`
  :host {
    display: block;
    height: 100%;
    /* Prusa orange: progress bar and the socket icon while it is on */
    --prusa-orange: #fa6831;
  }

  ha-card {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .block {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    min-width: 0;
  }

  .not-found {
    flex: 1;
    min-height: 56px;
    color: var(--secondary-text-color);
  }

  /* -- socket block (Tile card copy): one grid row, as high as a Tile card -- */

  .tile {
    flex: none;
    height: 56px;
    /* set inline: Prusa orange while the socket is on, the inactive color otherwise */
    --tile-color: var(--state-inactive-color);
  }

  /* icon circle of the Tile card: tinted background, icon in the state color */
  .tile-icon {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tile-color);
    background-color: color-mix(in srgb, var(--tile-color) 20%, transparent);
    --mdc-icon-size: 24px;
    transition:
      color 0.2s,
      background-color 0.2s;
  }

  /* a picture instead of the icon: round, with a ring in the state color */
  .tile-icon img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 2px var(--tile-color);
  }

  .tile-icon.interactive {
    cursor: pointer;
  }

  .tile-icon.interactive:hover {
    background-color: color-mix(in srgb, var(--tile-color) 30%, transparent);
  }

  /* waiting for the printer to allow switching off: the icon slowly pulses (click cancels) */
  .tile-icon.pending {
    animation: pulse 2.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 0 0 color-mix(in srgb, var(--tile-color) 60%, transparent);
    }
    50% {
      opacity: 0.45;
      box-shadow: 0 0 0 6px color-mix(in srgb, var(--tile-color) 0%, transparent);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tile-icon.pending {
      animation: none;
      opacity: 0.6;
    }
  }

  .tile.unavailable {
    opacity: 0.6;
  }

  .tile-info {
    flex: 1;
    min-width: 0;
    cursor: pointer;
  }

  /* -- printer block -- */

  /* two grid rows (2 × 56 px + the 8 px gap between them = 120 px) */
  .printer {
    flex: 1;
    min-height: 120px;
    padding: 8px 10px;
  }

  .preview {
    flex: none;
    /* as tall as the block (so the bottom row never sticks out below it), square */
    align-self: stretch;
    aspect-ratio: 1;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }

  .preview.clickable {
    cursor: pointer;
  }

  /* no picture available: an empty frame with a faint "no image" icon */
  .preview .placeholder {
    opacity: 0.4;
    --mdc-icon-size: 32px;
  }

  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    flex: 1;
    min-width: 0;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 0;
  }

  .status {
    display: flex;
    align-items: baseline;
    min-width: 0;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 20px;
    color: var(--primary-text-color);
    cursor: pointer;
  }

  .state,
  .sep {
    flex: none;
  }

  .file-wrap {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
  }

  .file {
    display: inline-block;
  }

  /* too long file name: scroll slowly there and back */
  .file.marquee {
    animation: pingpong var(--scroll-duration, 10s) ease-in-out infinite alternate;
  }

  @keyframes pingpong {
    0%,
    10% {
      transform: translateX(0);
    }
    90%,
    100% {
      transform: translateX(var(--scroll-distance, 0));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .file.marquee {
      animation: none;
    }

    .file-wrap {
      text-overflow: ellipsis;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .control {
    flex: none;
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 22px;
  }

  .control:hover:not([disabled]) {
    background: var(--secondary-background-color);
  }

  .control[disabled] {
    color: var(--disabled-text-color);
    cursor: default;
  }

  .bar {
    flex: 1;
    min-width: 20px;
    margin-left: 4px;
    height: 10px;
    border: 1px solid color-mix(in srgb, var(--prusa-orange) 80%, transparent);
    border-radius: 5px;
    background-color: color-mix(in srgb, var(--prusa-orange) 30%, transparent);
    overflow: hidden;
  }

  .level {
    height: 100%;
    background-color: var(--prusa-orange);
    transition: width 0.4s ease;
  }

  .value {
    flex: none;
    min-width: 40px;
    text-align: right;
    font-size: var(--ha-font-size-m, 14px);
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .temps {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    line-height: 16px;
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  /* the text box is exactly one line high, so its middle lines up with the middle of the icon */
  .stat {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    line-height: 1;
  }

  .stat svg {
    /* the white parts of the icons are drawn in this color (currentColor, see scripts/optimize-icons.mjs) */
    color: var(--primary-text-color);
    display: block;
    flex: none;
    height: 16px;
    width: 16px;
  }

  .preview-large {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 8px;
  }
`;const Rt=["percent_done","percent_remaining","time_remaining","finish_time"];let Vt=class extends le{constructor(){super(...arguments),this._config={type:"custom:prusalink-card",entity:""}}setConfig(e){this._config={...e}}_schema(e,t){return[{name:"entity",required:!0,selector:{entity:{filter:{integration:ft}}}},{name:"switch_entity",selector:{entity:{filter:{domain:"switch"}}}},{name:"pending_off_entity",selector:{entity:{filter:{domain:"input_boolean"}}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"image",selector:{media:{accept:["image/*"]}}},{name:"use_image",selector:{boolean:{}}},{name:"state_content",selector:{ui_state_content:{}},context:{filter_entity:"switch_entity"}},{name:"secondary_entities",selector:{entity:{multiple:!0,include_entities:t}}},{name:"show_speed",selector:{boolean:{}}},{name:"show_flow",selector:{boolean:{}}},{name:"progress_text",selector:{select:{mode:"dropdown",options:Rt.map(t=>({value:t,label:e(`editor.${t}`)}))}}}]}render(){if(!this.hass)return q``;const e=_t(this.hass),t=function(e,t,i){const n=new Set([...mt(e,t),...mt(e,i)]);return i&&n.delete(i),[...n]}(this.hass,this._config.entity,this._config.switch_entity),i={progress_text:"percent_done",show_speed:!0,show_flow:!0,use_image:!0,...this._config};return q`
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${this._schema(e,t)}
        .computeLabel=${t=>e(`editor.${t.name}`)}
        @value-changed=${this._changed}
      ></ha-form>
      ${this._renderAutomation(e)}
    `}_renderAutomation(e){if(!this.hass?.user?.is_admin||!this._config.switch_entity)return Z;const t=this._automationStatus;return q`
      <div class="automation">
        <ha-button ?disabled=${"busy"===t} @click=${this._createAutomation}>${e("editor.create_automation")}</ha-button>
        ${"created"===t?q`<span>${e("editor.automation_created")}</span>`:Z}
        ${"failed"===t?q`<span class="failed">${e("editor.automation_failed")}</span>`:Z}
      </div>
    `}async _createAutomation(){const e=this.hass,{entity:t,switch_entity:i}=this._config,n=e?Lt(mt(e,t)):void 0;if(e&&i&&n?.state){this._automationStatus="busy";try{const t=_t(e)("card.switch_off_when_possible"),a=this._config.name??e.states[i]?.attributes.friendly_name??i;let s=this._config.pending_off_entity;s||(s=`input_boolean.${(await e.callWS({type:"input_boolean/create",name:`${a} – ${t}`,icon:"mdi:power-sleep"})).id}`,this._setConfig({...this._config,pending_off_entity:s})),await e.callApi("POST",`config/automation/config/${function(e){return`prusalink_card_switch_off_${t=e,t.split(".")[1]??t}`;var t}(i)}`,function(e){const{name:t,switchEntity:i,printerState:n,nozzle:a,helper:s,title:o}=e,r=[{condition:"template",value_template:`{{ states('${n}') in ${JSON.stringify([...Pt,"unavailable","unknown"])} }}`}];a&&r.push({condition:"template",value_template:`{{ states('${a}') | float(0) < 40 }}`});const l={action:"input_boolean.turn_off",target:{entity_id:s}};return{alias:`PrusaLink Card: ${t} – ${o}`,description:`Created by the PrusaLink card. Switches ${i} off as soon as the printer is idle and the nozzle is below 40 °C, after ${s} was turned on.`,mode:"single",triggers:[{trigger:"state",entity_id:[s,i,n,...a?[a]:[]]},{trigger:"time_pattern",minutes:"/1"}],conditions:[{condition:"state",entity_id:s,state:"on"}],actions:[{choose:[{conditions:[{condition:"not",conditions:[{condition:"state",entity_id:i,state:"on"}]}],sequence:[l]},{conditions:r,sequence:[{action:"switch.turn_off",target:{entity_id:i}},l]}]}]}}({name:a,switchEntity:i,printerState:n.state,nozzle:n.nozzle,helper:s,title:t})),this._automationStatus="created"}catch{this._automationStatus="failed"}}else this._automationStatus="failed"}_changed(e){e.stopPropagation();const t={...e.detail.value};for(const e of Object.keys(t))(void 0===t[e]||""===t[e]||Array.isArray(t[e])&&0===t[e].length)&&delete t[e];this._setConfig(t)}_setConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};Vt.styles=r`
    ha-form {
      display: block;
    }

    .automation {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }

    .automation .failed {
      color: var(--error-color);
    }
  `,t([ue({attribute:!1})],Vt.prototype,"hass",void 0),t([_e()],Vt.prototype,"_config",void 0),t([_e()],Vt.prototype,"_automationStatus",void 0),Vt=t([de("prusalink-card-editor")],Vt);const It="prusalink-card";let Ft=class extends le{constructor(){super(...arguments),this._now=new Date,this._previewOpen=!1,this._imageResolvedAt=0,this._imageResolving=!1,this._imageRetried=!1}setConfig(e){if(!e?.entity)throw new Error(`${It}: "entity" is required`);this._config=e}getGridOptions(){const e=this._hasSwitch?3:2;return{columns:12,min_columns:6,rows:e,min_rows:e}}getCardSize(){return this._hasSwitch?3:2}static getConfigElement(){return document.createElement("prusalink-card-editor")}static getStubConfig(e,t,i){const n=[...t,...i].find(t=>gt(e,t));if(!n)throw new Error(`No ${ft} entity available`);return{type:`custom:${It}`,entity:Lt(mt(e,n)).state??n}}static getEntitySuggestion(e,t){return gt(e,t)?{label:"PrusaLink printer",config:{type:`custom:${It}`,entity:t}}:null}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._now=new Date},3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._timer)}updated(e){super.updated(e),this._updateMarquee(),this._syncImage()}async _syncImage(){const e=(t=this._config,!1===t?.use_image?void 0:(i=t?.image,("string"==typeof i?i:i?.media_content_id)||void 0));var t,i;if(!e)return this._imageUrl=void 0,void(this._imageId=void 0);if(!this._imageResolving&&!function(e,t,i,n){return e===t&&n-i<216e5}(e,this._imageId,this._imageResolvedAt,Date.now())){if(e!==this._imageId&&(this._imageRetried=!1),!function(e){return e.startsWith("media-source://")}(e))return this._imageId=e,this._imageResolvedAt=Date.now(),void(this._imageUrl=e);if(this.hass){this._imageResolving=!0;try{const t=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:e});this._imageUrl=t.url}catch{this._imageUrl=void 0}finally{this._imageId=e,this._imageResolvedAt=Date.now(),this._imageResolving=!1}}}}_imageFailed(){this._imageRetried?this._imageUrl=void 0:(this._imageRetried=!0,this._imageResolvedAt=0,this._syncImage())}get _hasSwitch(){return!!this._config?.switch_entity}get _entities(){return this.hass&&this._config?Lt(mt(this.hass,this._config.entity)):{}}_previewPicture(e){const t=this._stateOf(e.preview)?.attributes.entity_picture;return t&&t!==this._previewFailed?t:void 0}_stateOf(e){return e?this.hass?.states[e]:void 0}_updateMarquee(){const e=this.renderRoot.querySelector(".file-wrap"),t=this.renderRoot.querySelector(".file");if(!e||!t)return;const i=Math.ceil(t.scrollWidth-e.clientWidth);i>0?(t.style.setProperty("--scroll-distance",`-${i}px`),t.style.setProperty("--scroll-duration",`${Math.max(6,i/15+4)}s`),t.classList.add("marquee")):t.classList.remove("marquee")}_press(e){e&&this.hass?.callService("button","press",{entity_id:e})}_powerOffAllowed(){return e=this._stateOf(this._entities.state)?.state,t=At(this._stateOf(this._entities.nozzle)),(!e||zt.includes(e)||Pt.includes(e))&&(void 0===t||t<40);var e,t}get _pendingOffEntity(){const e=this._config?.pending_off_entity;return this._stateOf(e)?e:void 0}get _pendingOff(){return"on"===this._stateOf(this._pendingOffEntity)?.state}_setPendingOff(e){this._pendingOffEntity&&this.hass?.callService("input_boolean",e?"turn_on":"turn_off",{entity_id:this._pendingOffEntity})}_scheduleOff(){this._confirm=void 0,this._setPendingOff(!0)}_iconTap(){if(this._pendingOff)return void this._setPendingOff(!1);const e=this._stateOf(this._config?.switch_entity);e&&"unavailable"!==e.state&&("on"===e.state?this._confirm=this._powerOffAllowed()?"power_off":"printer_busy":this.hass?.callService("switch","turn_on",{entity_id:e.entity_id}))}_confirmed(){const e=this._confirm;this._confirm=void 0,"power_off"===e&&this._config?.switch_entity?this.hass?.callService("switch","turn_off",{entity_id:this._config.switch_entity}):"cancel_print"===e&&this._press(this._entities.cancel)}_moreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return Z;const e=_t(this.hass),t=this._entities,i=this._stateOf(t.state);return q`
      <ha-card>
        ${this._hasSwitch?this._renderTile():Z}
        ${i?this._renderPrinter(t,i,e):q`<div class="block not-found">${e("card.not_found")}</div>`}
      </ha-card>
      ${this._previewOpen?this._renderPreview(t,e):Z} ${this._confirm?this._renderConfirm(e):Z}
    `}_renderTile(){const e=this._config,t=this._stateOf(e.switch_entity);if(!t)return q`<div class="block tile unavailable">${e.switch_entity}</div>`;const i=_t(this.hass),n="on"===t.state,a="unavailable"===t.state,s=e.name??t.attributes.friendly_name??t.entity_id,o=(e.secondary_entities??[]).map(e=>this._stateOf(e)).filter(e=>!!e);return q`
      <div class="block tile ${a?"unavailable":""}" style="--tile-color: ${n?"var(--prusa-orange)":"var(--state-inactive-color)"}">
        <div
          class="tile-icon ${a?"":"interactive"} ${this._pendingOff?"pending":""}"
          title=${this._pendingOff?i("card.waiting_off"):Z}
          @click=${this._iconTap}
        >
          ${this._imageUrl?q`<img src=${this._imageUrl} alt=${s} @error=${this._imageFailed} />`:e.icon?q`<ha-icon .icon=${e.icon}></ha-icon>`:q`<ha-state-icon .hass=${this.hass} .stateObj=${t}></ha-state-icon>`}
        </div>
        <ha-tile-info
          class="tile-info"
          @click=${this._iconTap}
          .primary=${s}
          .secondary=${q`<state-display .hass=${this.hass} .stateObj=${t} .content=${e.state_content??["state","last-changed"]} .name=${s}></state-display
            >${o.map(e=>q` · <state-display .hass=${this.hass} .stateObj=${e} .content=${["state"]}></state-display>`)}`}
        ></ha-tile-info>
      </div>
    `}_renderPrinter(e,t,i){const n=this._previewPicture(e),a=this.hass?.formatEntityState?.(t)??t.state,s=this._stateOf(e.filename),o=St(t.state)&&xt(s);return q`
      <div class="block printer ${t.state}">
        <div class="preview ${n?"clickable":""}" @click=${()=>n&&(this._previewOpen=!0)} title=${n?i("card.preview"):Z}>
          ${n?q`<img src=${n} alt=${i("card.preview")} @error=${()=>this._previewFailed=n} />`:q`<ha-icon class="placeholder" icon="mdi:image-off-outline"></ha-icon>`}
        </div>
        <div class="details">
          <div class="status" @click=${()=>this._moreInfo(t.entity_id)}>
            <span class="state">${a}</span>
            ${o?q`<span class="sep">:&nbsp;</span><span class="file-wrap"><span class="file">${s.state}</span></span>`:Z}
          </div>
          ${this._renderControls(e,i)}
          <div class="temps">
            <span class="stat" title=${i("card.nozzle")}
              >${$t("status_nozzle")}${Et(At(this._stateOf(e.nozzle)),At(this._stateOf(e.nozzleTarget)))}</span
            >
            <span class="stat" title=${i("card.heatbed")}
              >${$t("status_heatbed")}${Et(At(this._stateOf(e.bed)),At(this._stateOf(e.bedTarget)))}</span
            >
            <span class="stat" title=${i("card.filament")}>${$t("status_filament")}${this._materialText(e)}</span>
            ${!1===this._config?.show_speed?Z:q`<span class="stat" title=${i("card.speed")}>${$t("status_prnspeed")}${Ct(At(this._stateOf(e.speed)))}</span>`}
            ${!1===this._config?.show_flow?Z:q`<span class="stat" title=${i("card.flow")}>${$t("status_prnflow")}${Ct(At(this._stateOf(e.flow)))}</span>`}
          </div>
        </div>
      </div>
    `}_materialText(e){const t=this._stateOf(e.material);return xt(t)?t.state:"–"}_renderControls(e,t){const i=Mt(this._stateOf(e.pause),this._stateOf(e.resume),this._stateOf(e.continue)),n=this._stateOf(e.cancel),a=At(this._stateOf(e.progress)),s=Ht({mode:this._config?.progress_text??"percent_done",progress:a,finish:jt(this._stateOf(e.finish)),now:this._now,language:this.hass?.locale.language??"en",timeZone:this.hass?.config.time_zone??"UTC"}),o=(e,t,i,n)=>q`
      <button class="control" title=${t} aria-label=${t} ?disabled=${!Tt(i)} @click=${n}>
        <ha-icon icon=${e}></ha-icon>
      </button>
    `;return q`
      <div class="controls">
        ${"resume"===i.kind?o("mdi:play",t("card.resume"),i.button,()=>this._press(i.button?.entity_id)):Tt(i.button)?o("mdi:pause",t("card.pause"),i.button,()=>this._press(i.button?.entity_id)):o("mdi:play-pause",t("card.pause"),void 0,()=>{})}
        ${o("mdi:stop",t("card.cancel"),n,()=>this._confirm="cancel_print")}
        <div class="bar"><div class="level" style="width: ${Math.min(100,Math.max(0,a??0))}%"></div></div>
        <span class="value">${s}</span>
      </div>
    `}_renderPreview(e,t){const i=this._previewPicture(e),n=this._stateOf(e.filename);return q`
      <ha-dialog
        open
        width="large"
        header-title=${xt(n)&&St(this._stateOf(e.state)?.state)?n.state:t("card.preview")}
        @closed=${()=>this._previewOpen=!1}
      >
        ${i?q`<img class="preview-large" src=${i} alt=${t("card.preview")} />`:Z}
        <ha-dialog-footer slot="footer">
          <ha-button slot="primaryAction" @click=${()=>this._previewOpen=!1}>${t("card.back")}</ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `}_renderConfirm(e){const t="power_off"===this._confirm?"off":"printer_busy"===this._confirm?"busy":"cancel",i="busy"===t;return q`
      <ha-dialog open header-title=${e(`card.title_${t}`)} @closed=${()=>this._confirm=void 0}>
        <p>${e(`card.text_${t}`)}</p>
        <ha-dialog-footer slot="footer">
          <ha-button slot="secondaryAction" appearance="plain" @click=${()=>this._confirm=void 0}>${e("card.back")}</ha-button>
          ${i?this._pendingOffEntity?q`<ha-button slot="primaryAction" @click=${this._scheduleOff}>${e("card.switch_off_when_possible")}</ha-button>`:Z:q`<ha-button slot="primaryAction" variant="danger" @click=${this._confirmed}>${e("card.confirm")}</ha-button>`}
        </ha-dialog-footer>
      </ha-dialog>
    `}};Ft.styles=Dt,t([ue({attribute:!1})],Ft.prototype,"hass",void 0),t([_e()],Ft.prototype,"_config",void 0),t([_e()],Ft.prototype,"_now",void 0),t([_e()],Ft.prototype,"_confirm",void 0),t([_e()],Ft.prototype,"_previewOpen",void 0),t([_e()],Ft.prototype,"_previewFailed",void 0),t([_e()],Ft.prototype,"_imageUrl",void 0),Ft=t([de(It)],Ft),window.customCards=window.customCards||[],window.customCards.push({type:It,name:"PrusaLink printer",description:"Printer status, controls and preview for the PrusaLink integration, optionally with the power socket tile",preview:!1,documentationURL:"https://github.com/hondzik/prusalink-card",getEntitySuggestion:(e,t)=>Ft.getEntitySuggestion(e,t)}),function(){const t="padding: 2px 4px; font-family: Roboto,Verdana,Geneva,sans-serif;",i=`background-color: rgb(255, 127, 15); color: rgb(0, 0, 49); ${t}`,n=`background-color: rgb(0, 0, 49); color: rgb(255, 127, 15); ${t}`;console.groupCollapsed("%cPrusaLink Card%c1.0.0",i,n),console.info("Home Assistant Lovelace card for 3D printers exposed by the PrusaLink integration"),console.info(`Github: ${e}`),console.groupEnd()}();
