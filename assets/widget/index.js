(()=>{"use strict";const e=function(e,t={}){const n=document.createElement(e);if(t.hasOwnProperty("classes")&&t.classes.forEach((e=>{n.classList.add(e)})),t.hasOwnProperty("text")&&(n.textContent=t.text),t.hasOwnProperty("html")&&(n.innerHTML=t.html),t.hasOwnProperty("attributes"))for(const e in t.attributes){const a=t.attributes[e];void 0!==a&&n.setAttribute(e,a)}if(t.hasOwnProperty("dataset"))for(const e in t.dataset)n.setAttribute("data-"+e,t.dataset[e]);return t.hasOwnProperty("append")&&t.append.appendChild(n),t.hasOwnProperty("prepend")&&t.prepend.insertBefore(n,t.prepend.firstChild),n},t=function(t,n){const a=e("div",{classes:t.classes||[],append:n});if(t.hasOwnProperty("label")){const n=e("h4",{text:t.label});null!==t.label&&a.appendChild(n)}const s=e("input",{attributes:{type:"text"},dataset:t.dataset||{},append:a});if(t.hasOwnProperty("attributes"))for(const e in t.attributes){const n=t.attributes[e];void 0!==n&&s.setAttribute(e,n)}if("range"===s.type){const e=d.element("em",{text:s.value,attributes:{title:wp.i18n.__("Click to change the input view.","sharing-image")},append:a});s.addEventListener("change",(()=>{e.textContent=s.value})),s.addEventListener("input",(()=>{e.textContent=s.value})),e.addEventListener("click",(()=>{s.type="text"===s.type?"range":"text"}))}return s},n=function(t,n){const a=e("label",{classes:t.classes||[],append:n}),s=e("input",{attributes:{type:"checkbox"},dataset:t.dataset||{},append:a});if(t.hasOwnProperty("attributes"))for(const e in t.attributes){const n=t.attributes[e];void 0!==n&&s.setAttribute(e,n)}if(t.hasOwnProperty("checked")){const e=t.checked;e&&e===s.value&&s.setAttribute("checked","checked")}if(t.hasOwnProperty("label")){const n=e("span",{text:t.label});null!==t.label&&a.appendChild(n)}return s},a=function(t,n){const a=e("label",{classes:t.classes||[],append:n}),s=e("input",{attributes:{type:"radio"},dataset:t.dataset||{},append:a});if(t.hasOwnProperty("attributes"))for(const e in t.attributes){const n=t.attributes[e];void 0!==n&&s.setAttribute(e,n)}if(t.hasOwnProperty("checked")){const e=t.checked;e&&e===s.value&&s.setAttribute("checked","checked")}if(t.hasOwnProperty("label")){const n=e("span",{text:t.label});null!==t.label&&a.appendChild(n)}return t.hasOwnProperty("help")&&e("small",{text:t.help,append:a}),s},s=function(t,n){const a=e("div",{classes:t.classes||[],append:n});if(t.hasOwnProperty("label")){const n=e("h4",{text:t.label});null!==t.label&&a.appendChild(n)}const s=e("select",{dataset:t.dataset||{},append:a});if(t.hasOwnProperty("attributes"))for(const e in t.attributes){const n=t.attributes[e];void 0!==n&&s.setAttribute(e,n)}const i=t.options||{};for(const n in i){const a=e("option",{text:i[n],attributes:{value:n},append:s});if(t.hasOwnProperty("selected")){const e=t.selected;e&&e===a.value&&a.setAttribute("selected","selected")}}return s},i=function(t,n){const a=e("div",{classes:t.classes||[],append:n});if(t.hasOwnProperty("label")){const n=e("h4",{text:t.label});null!==t.label&&a.appendChild(n)}const s=e("textarea",{dataset:t.dataset||{},append:a});if(t.hasOwnProperty("attributes"))for(const e in t.attributes){const n=t.attributes[e];void 0!==n&&s.setAttribute(e,n)}if(t.hasOwnProperty("content")){const e=t.content;void 0!==e&&(s.innerHTML=e)}return s},r=function(r){const l=e("div",{classes:r.classes||[]});return r.hasOwnProperty("append")&&r.append.appendChild(l),r.hasOwnProperty("prepend")&&r.prepend.insertBefore(l,r.prepend.firstChild),r.hasOwnProperty("label")&&e("h3",{text:r.label,append:l}),r.hasOwnProperty("description")&&e("p",{text:r.description,append:l}),r.hasOwnProperty("fields")&&r.fields.forEach((e=>{switch(e.group){case"input":t(e,l);break;case"textarea":i(e,l);break;case"radio":a(e,l);break;case"select":s(e,l);break;case"checkbox":n(e,l)}})),r.hasOwnProperty("help")&&e("small",{text:r.help,append:l}),l};const l=function(e,t){if(e.hasOwnProperty("multiple")||(e.multiple=!1),!wp.media)return;const n=wp.media(e);n.on("select",(()=>{const e=n.state().get("selection").first().toJSON();e.id&&t(e.id)})),n.open()};function o(t,n){let a=t.querySelector("figure");if(a&&t.removeChild(a),!wp.media)return;if(a=e("figure",{prepend:t}),t.querySelector("h4")&&t.insertBefore(a,t.querySelector("h4").nextSibling),!n)return;let s=a.querySelector("img");s&&a.removeChild(s),s=e("img",{append:a}),wp.media.attachment(n).fetch().then((e=>{s.src=e.sizes?.thumbnail?.url||e.url}))}const d={element:e,control:r,layer:function(t){const n=e("div",{classes:t.classes||[]});t.hasOwnProperty("append")&&t.append.appendChild(n),t.hasOwnProperty("prepend")&&t.prepend.insertBefore(n,t.prepend.firstChild),t.hasOwnProperty("label")||(t.label="");const a=e("h2",{text:t.label,append:n});return e("span",{append:a}),t.hasOwnProperty("description")&&e("h5",{text:t.description,append:n}),n},checkbox:n,media:function(t){const n=r({classes:t.classes||[]});if(t.hasOwnProperty("append")&&t.append.appendChild(n),t.hasOwnProperty("prepend")&&t.prepend.insertBefore(n,t.prepend.firstChild),t.hasOwnProperty("label")){const a=e("h4",{text:t.label});null!==t.label&&n.appendChild(a)}t.labels=t.labels||{};const a=e("input",{attributes:{type:"hidden",name:t.name},append:n}),s=e("button",{classes:["button"],text:t.labels.button,attributes:{type:"button"},append:n}),i=e("a",{classes:["hidden"],text:t.labels.details,attributes:{target:"_blank"}});t.hasOwnProperty("link")&&n.appendChild(i),t.hasOwnProperty("help")&&e("small",{text:t.help,append:n});const d=e=>{a.setAttribute("value",e),a.dispatchEvent(new Event("change",{bubbles:!0}));let r=null;t.hasOwnProperty("link")&&(r=new URL(t.link),r.searchParams.set("item",e),i.setAttribute("href",r.href)),t.remove&&(s.textContent=t.labels.remove),t.image&&o(n,e),i.classList.remove("hidden")},c=()=>{a.setAttribute("value",""),a.dispatchEvent(new Event("change",{bubbles:!0})),s.textContent=t.labels.button,t.image&&o(n,0),i.classList.add("hidden")};return t.image&&o(n,0),t.value&&d(t.value),s.addEventListener("click",(()=>{if(t.remove&&a.value)return c();const e={title:t.labels.heading};t.hasOwnProperty("mime")&&(e.library={},e.library.type=t.mime),l(e,(e=>{d(e)}))})),n.addEventListener("set_attachment",(e=>{e.detail&&d(e.detail)})),n.addEventListener("remove_attachment",(()=>{c()})),n},input:t,textarea:i,radio:a,select:s};let c=null,p=null;function u(e){const t=p.querySelector(".sharing-image-widget-warning");null!==t&&(t.classList.add("warning-visible"),t.textContent=e||wp.i18n.__("Unknown generation error","sharing-image"))}function m(e,t,n){const a=document.getElementById(t);if(null===a)return;const s=()=>{"manual"!==n.source.mode&&(e.value=a.value)};a.addEventListener("input",s),e.addEventListener("input",(()=>{a.removeEventListener("input",s)})),s()}function h(e,t,n,a){const s=d.textarea({classes:["sharing-image-widget-text"],label:t.title||null,attributes:{name:c.name.fieldset+`[${n}]`}},e);s.value=a.fieldset[n]||"","post"===c.context&&("title"===t.preset&&m(s,"title",a),"excerpt"===t.preset&&m(s,"excerpt",a),"categories"===t.preset&&function(e,t){const n=document.getElementById("categorychecklist");if(!n)return;const a=c.separator||", ",s=()=>{const s=[];"manual"!==t.source.mode&&(n.querySelectorAll("input:checked").forEach((e=>{e.parentNode?.textContent&&s.push(e.parentNode.textContent.trim())})),e.value=s.join(a))};s(),n.addEventListener("change",s)}(s,a),"tags"===t.preset&&function(e,t){const n=document.querySelector("#post_tag .tagchecklist");if(!n||!MutationObserver)return;const a=c.separator||", ",s=()=>{const n=document.getElementById("tax-input-post_tag");if(!n)return;if("manual"===t.source.mode)return;const s=n.value.split(",");e.value=s.join(a)};s(),new MutationObserver(s).observe(n,{childList:!0})}(s,a))}function g(e,t,n,a){const s=d.media({name:c.name.fieldset+`[${n}]`,classes:["sharing-image-widget-image"],label:t.title||null,value:a.fieldset[n]||"",labels:{button:wp.i18n.__("Set layer image","sharing-image"),heading:wp.i18n.__("Select image","sharing-image"),details:wp.i18n.__("Attachment","sharing-image"),remove:wp.i18n.__("Remove image","sharing-image")},mime:["image/png","image/jpeg","image/gif","image/webp"],image:!0,remove:!0,append:e});"post"===c.context&&"featured"===t.preset&&function(e,t){const n=wp.media?.featuredImage?.frame();n&&n.on("select",(()=>{if("manual"===t.source.mode)return;const a=n.state().get("selection").first().toJSON();a.id&&e.dispatchEvent(new CustomEvent("set_attachment",{detail:a.id}))}));const a=document.getElementById("postimagediv");if(!a)return;if(a.addEventListener("click",(n=>{"manual"!==t.source.mode&&"remove-post-thumbnail"===n.target.id&&e.dispatchEvent(new CustomEvent("remove_attachment"))})),"manual"===t.source.mode)return;const s=a.querySelector("#_thumbnail_id");if(!s)return;const i=parseInt(s.value);i>0&&e.dispatchEvent(new CustomEvent("set_attachment",{detail:i}))}(s,a)}function b(e){const t=d.element("div",{classes:["sharing-image-widget-manager"],append:e});!function(e){d.element("button",{classes:["sharing-image-widget-generate","button"],text:wp.i18n.__("Generate","sharing-image"),attributes:{type:"button"},append:e}).addEventListener("click",(()=>{!function(){const e=new XMLHttpRequest;e.open("POST",ajaxurl),e.responseType="json",p.classList.add("widget-loader");const t=new window.FormData;t.set("action","sharing_image_generate"),p.querySelectorAll("[name]").forEach((e=>{t.append(e.name,e.value)})),function(){const e=p.querySelector(".sharing-image-widget-warning");null!==e&&e.classList.remove("warning-visible")}();const n=p.querySelector(".sharing-image-widget-poster");e.addEventListener("load",(()=>{const t=e.response||{};if(p.classList.remove("widget-loader","widget-auto"),!t.data)return u();if(!t.success)return u(t.data);c.meta.source=t.data;for(const e in t.data)n.querySelectorAll("input").forEach((n=>{c.name.source+"["+e+"]"===n.name&&(n.value=t.data[e])}));let a=n.querySelector("img");null===a&&(a=d.element("img",{append:n})),a.src=t.data.poster,"auto"===t.data.mode&&p.classList.add("widget-auto"),p.classList.add("widget-visible")})),e.addEventListener("error",(()=>{u(),p.classList.remove("widget-loader")})),e.send(t)}()}))}(t),function(e){d.element("button",{classes:["sharing-image-widget-delete","button","button-delete"],text:wp.i18n.__("Remove","sharing-image"),attributes:{type:"button"},append:e}).addEventListener("click",(()=>{const e=p.querySelector(".sharing-image-widget-poster img");if(null===e)return;const t=e.parentNode;t.removeChild(e),t.querySelectorAll("input").forEach((e=>{e.value="",e.name===c.name.source+"[mode]"&&(e.value="manual")})),p.classList.remove("widget-visible")}))}(t),d.element("span",{classes:["sharing-image-widget-spinner","spinner"],append:t})}void 0!==wp&&(c=window.sharingImageWidget||{},p=document.querySelector(".sharing-image-widget"),p&&function(){for(;p.firstChild;)p.removeChild(p.lastChild);c.context&&p.classList.add(`widget-${c.context}`);const e=c.meta||{};!function(e){const t=d.element("div",{classes:["sharing-image-widget-poster"],append:p});d.element("span",{classes:["sharing-image-widget-mode"],attributes:{title:wp.i18n.__("Poster was generated automatically and will update on post saving.","sharing-image")},append:t}),"auto"===e.source.mode&&p.classList.add("widget-auto"),e.source.poster&&(d.element("img",{attributes:{src:e.source.poster,alt:""},append:t}),p.classList.add("widget-visible")),d.element("input",{attributes:{type:"hidden",name:c.name.source+"[poster]",value:e.source.poster||""},append:t}),d.element("input",{attributes:{type:"hidden",name:c.name.source+"[width]",value:e.source.width},append:t}),d.element("input",{attributes:{type:"hidden",name:c.name.source+"[height]",value:e.source.height},append:t}),d.element("input",{attributes:{type:"hidden",name:c.name.source+"[mode]",value:e.source.mode},append:t})}(e);const t=function(e){if(Object.keys(c.templates).length<1)return;const t=d.element("div",{classes:["sharing-image-widget-designer"]});let n=e.source.template||null;c.templates[n]||(n=Object.keys(c.templates)[0]),function(e,t){const n={};for(const e in c.templates)n[e]=c.templates[e]?.title||wp.i18n.__("Untitled","sharing-image");const a=d.select({classes:["sharing-image-widget-template"],options:n,attributes:{name:c.name.source+"[template]"},selected:String(t)},e);a.addEventListener("change",(()=>{const t=e.querySelectorAll(".sharing-image-widget-fieldset");for(let e=0;e<t.length;e++){const n=t[e];n.classList.remove("fieldset-visible"),n.dataset.index===a.value&&n.classList.add("fieldset-visible")}}))}(t,n);for(const a in c.templates){const s=c.templates[a],i=d.element("div",{classes:["sharing-image-widget-fieldset"],dataset:{index:a},append:t});a===n&&i.classList.add("fieldset-visible");const r=s.layers||{};for(const t in r){const n=r[t];if(n.dynamic)switch(n.type){case"text":h(i,n,t,e);break;case"image":g(i,n,t,e)}}}return p.appendChild(t),t}(e);d.element("div",{classes:["sharing-image-widget-warning"],append:t}),b(t),d.element("input",{attributes:{type:"hidden",name:"sharing_image_nonce",value:c.nonce},append:p}),d.element("input",{attributes:{type:"hidden",name:"sharing_image_screen",value:c.screen},append:p}),d.element("input",{attributes:{type:"hidden",name:"sharing_image_context",value:c.context},append:p}),function(e){e.poster&&(e.width&&e.height||u(wp.i18n.__("Image sizes are not set. Regenerate the poster.","sharing-image")))}(e)}())})();