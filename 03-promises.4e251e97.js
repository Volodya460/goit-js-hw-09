var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var i=o("iQIUW");const r=document.querySelector(".form"),l=document.querySelector('input[name="delay"]'),u=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]');function d(e,n){return new Promise(((t,o)=>{const i=Math.random()>.3;setTimeout((()=>{i&&t({position:e,delay:n}),o({position:e,delay:n})}),n)}))}r.addEventListener("submit",(function(e){e.preventDefault();let n=Number(l.value),t=Number(u.value);const o=a.value;let r=0;for(let e=0;e<o;e+=1)r+=1,d(r,n).then((({position:e,delay:n})=>{i.Notify.warning(`✅ Fulfilled promise ${e} in ${n}ms`)})).catch((({position:e,delay:n})=>{i.Notify.warning(`❌ Rejected promise ${e} in ${n}ms`)})),n+=t}));
//# sourceMappingURL=03-promises.4e251e97.js.map