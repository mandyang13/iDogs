(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02e6420c"],{"06c5":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n("fb6a"),n("d3b7"),n("b0c0"),n("a630"),n("3ca3");var r=n("6b75");function o(e,t){if(e){if("string"===typeof e)return Object(r["a"])(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r["a"])(e,t):void 0}}},"2dd6":function(e,t,n){"use strict";n("7798")},"505d":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-input",{staticStyle:{"margin-bottom":"30px"},attrs:{placeholder:"Filter keyword"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),n("div",{staticClass:"mybox"},[n("el-tree",{ref:"mytree",staticClass:"filter-tree",attrs:{data:e.tree,props:e.defaultProps,"filter-node-method":e.filterNode,"default-expand-all":""},on:{"node-click":e.handleNodeClick}}),n("div",{staticClass:"right"},[n("p",[e._v("Click on node! A random picture of that breed will be shown here!")]),n("p",[e._v(e._s(e.breed))]),n("img",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],attrs:{src:e.img}})])],1)],1)},o=[],l=(n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("06c5"));function a(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(l["a"])(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n["return"]||n["return"]()}finally{if(c)throw a}}}}n("4de4");var i={data:function(){return{filterText:"",tree:[],img:"",breed:"",show:!1,data2:[{label:"Level one 1",children:[{label:"Level two 1-1",children:[{label:"Level three 1-1-1"},{label:"Level three 1-1-2"}]}]},{label:"Level one 2",children:[{label:"Level two 2-1"},{label:"Level two 2-2"}]},{label:"Level one 3",children:[{label:"Level two 3-1"},{label:"Level two 3-2"}]},{label:"Level one 4",children:[]}],defaultProps:{children:"children",label:"label"}}},watch:{filterText:function(e){this.$refs.mytree.filter(e)}},mounted:function(){this.getList("https://dog.ceo/api/breeds/list/all")},methods:{filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},handleNodeClick:function(e){var t=this;console.log(e),this.breed=e.label,this.fetch("https://dog.ceo/api/breed/"+e.label+"/images/random").then((function(e){var n=JSON.parse(e);t.img=n.message,t.show=!0,t.backToTop()})).catch((function(e){console.log(e),t.$message("Try breed instead of sub-breed"),t.$loading.hide()}))},backToTop:function(){var e=30,t=setInterval((function(){document.documentElement.scrollTop=document.documentElement.scrollTop-e,document.documentElement.scrollTop<=0&&clearInterval(t)}),30)},fetch:function(e){this.$loading.show();var t=this;return new Promise((function(n,r){var o=new XMLHttpRequest;o.open("get",e,!0),o.onload=function(){200==o.status?(t.$message("updated"),t.$loading.hide(),n(o.responseText)):r(new Error(o.statusText))},o.onerror=function(){r(new Error(o.statusText))},o.send()}))},getList:function(e){var t=this;this.fetch(e).then((function(e){var n=JSON.parse(e);t.makeTree(n.message)})).catch((function(e){console.log(e),t.$message(e),t.$loading.hide()}))},makeTree:function(e){for(var t in e)if(0==e[t].length)this.tree.push({label:t,children:e[t]});else{var n,r=[],o=a(e[t]);try{for(o.s();!(n=o.n()).done;){var l=n.value;r.push({label:l,children:[]})}}catch(i){o.e(i)}finally{o.f()}this.tree.push({label:t,children:r})}}}},c=i,s=(n("2dd6"),n("2877")),d=Object(s["a"])(c,r,o,!1,null,"b230d382",null);t["default"]=d.exports},"6b75":function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},7798:function(e,t,n){}}]);