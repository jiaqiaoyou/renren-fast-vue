webpackJsonp([2],{"5zde":function(e,t,n){n("zQR9"),n("qyJz"),e.exports=n("FeBl").Array.from},"6olT":function(e,t,n){"use strict";var a=n("dXij"),r=n.n(a),l=n("c/Tr"),i=n.n(l),o=n("7+uW");function s(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=[];return i()(e).forEach(function(e){void 0===e._expanded&&o.default.set(e,"_expanded",t);var l=1;if(null!=a&&(l=a+1),o.default.set(e,"_level",l),n&&o.default.set(e,"parent",n),r.push(e),e.children&&e.children.length>0){var i=s(e.children,t,e,l);r=r.concat(i)}}),r}var d={name:"treeTable",props:{data:{type:[Array,Object],required:!0},columns:{type:Array,default:function(){return[]}},evalFunc:Function,evalArgs:Array,expandAll:{type:Boolean,default:!1}},computed:{formatData:function(){var e=void 0;e=Array.isArray(this.data)?this.data:[this.data];var t=this.evalFunc||s,n=this.evalArgs?r()([e],this.evalArgs):[e,this.expandAll];return t.apply(null,n)}},methods:{showRow:function(e){var t=!e.row.parent||e.row.parent._expanded&&e.row.parent._show;return e.row._show=t,t?"":"display:none;"},toggleExpanded:function(e){var t=this.formatData[e];t._expanded=!t._expanded},iconShow:function(e,t){return 0===e&&t.children&&t.children.length>0}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-table",e._b({attrs:{data:e.formatData,"row-style":e.showRow}},"el-table",e.$attrs,!1),[0===e.columns.length?n("el-table-column",{attrs:{width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row._level,function(e){return n("span",{key:e,staticClass:"ms-tree-space"})}),e._v(" "),e.iconShow(0,t.row)?n("span",{staticClass:"tree-ctrl",on:{click:function(n){e.toggleExpanded(t.$index)}}},[t.row._expanded?n("i",{staticClass:"el-icon-arrow-down"}):n("i",{staticClass:"el-icon-arrow-right"})]):e._e(),e._v("\n      "+e._s(t.$index)+"\n    ")]}}])}):e._l(e.columns,function(t,a){return n("el-table-column",{key:t.value,attrs:{label:t.text,width:t.width,"header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[e._l(r.row._level,function(t){return 0===a?n("span",{key:t,staticClass:"ms-tree-space"}):e._e()}),e._v(" "),e.iconShow(a,r.row)?n("span",{staticClass:"tree-ctrl",on:{click:function(t){e.toggleExpanded(r.$index)}}},[r.row._expanded?n("i",{staticClass:"el-icon-arrow-down"}):n("i",{staticClass:"el-icon-arrow-right"})]):e._e(),e._v("\n      "+e._s(r.row[t.value])+"\n    ")]}}])})}),e._v(" "),e._t("default")],2)},staticRenderFns:[]};var u=n("VU/8")(d,c,!1,function(e){n("p2pY")},"data-v-237a28c5",null);t.a=u.exports},"E/TR":function(e,t){e.exports=function(){return Function.call.apply(Array.prototype.concat,arguments)}},NJR2:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,'\n.ms-tree-space[data-v-237a28c5] {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1;\n  width: 18px;\n  height: 14px;\n}\n.ms-tree-space[data-v-237a28c5]::before {\n    content: "";\n}\n.processContainer[data-v-237a28c5] {\n  width: 100%;\n  height: 100%;\n}\ntable td[data-v-237a28c5] {\n  line-height: 26px;\n}\n.tree-ctrl[data-v-237a28c5] {\n  position: relative;\n  cursor: pointer;\n  margin-left: -18px;\n}\n',""])},"c/Tr":function(e,t,n){e.exports={default:n("5zde"),__esModule:!0}},dXij:function(e,t,n){e.exports={default:n("E/TR"),__esModule:!0}},fBQ2:function(e,t,n){"use strict";var a=n("evD5"),r=n("X8DO");e.exports=function(e,t,n){t in e?a.f(e,t,r(0,n)):e[t]=n}},p2pY:function(e,t,n){var a=n("NJR2");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("c0ab360c",a,!0)},qyJz:function(e,t,n){"use strict";var a=n("+ZMJ"),r=n("kM2E"),l=n("sB3e"),i=n("msXi"),o=n("Mhyx"),s=n("QRG4"),d=n("fBQ2"),c=n("3fs2");r(r.S+r.F*!n("dY0y")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,r,u,p=l(e),h="function"==typeof this?this:Array,f=arguments.length,m=f>1?arguments[1]:void 0,_=void 0!==m,v=0,g=c(p);if(_&&(m=a(m,f>2?arguments[2]:void 0,2)),null==g||h==Array&&o(g))for(n=new h(t=s(p.length));t>v;v++)d(n,v,_?m(p[v],v):p[v]);else for(u=g.call(p),n=new h;!(r=u.next()).done;v++)d(n,v,_?i(u,m,[r.value,v],!0):r.value);return n.length=v,n}})},sIkh:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("6olT"),r=function(e,t){for(var n=-1,a=0;a<t.length;a++)if(t[a]===e){n=a;break}return n},l=r,i=function(e,t,n,a){for(var l=[],i=[e],o=-1;o!==i.length;)o=i.length,t.forEach(function(e){r(e[n],i)>-1&&-1===r(e[a],i)&&(l.push(e[a]),i.push(e[a]))});return l},o=function(){return Math.floor(Math.random()*Math.random()*Math.random()*Math.random()*1e3)},s=function(e,t){for(var n=0;t[n]&&(!t[n].$extra||t[n].$extra.hash!==e);)n++;return n},d={name:"el-table-tree-column",props:{prop:{type:String},label:{type:String},width:{type:String},treeKey:{type:String,default:"id"},childNumKey:{type:String,default:"child_num"},parentKey:{type:String,default:"parentId"},levelKey:{type:String,default:"depth"},childKey:{type:String,default:"children"},fileIcon:{type:String,default:"el-icon-file"},folderIcon:{type:String,default:"el-icon-folder"},remote:{type:Function,default:null}},computed:{owner:function(){for(var e=this.$parent;e&&!e.tableId;)e=e.$parent;return e}},data:function(){return{loading:!1}},methods:{floderIcon:function(e){return e.$extra&&e.$extra.expanded?this.folderIcon+"-open":this.folderIcon},hasChild:function(e){return void 0!==e[this.childNumKey]?e[this.childNumKey]>0||!1:void 0!==e[this.childKey]&&e[this.childKey].length>0||!1},paddingLeft:function(e){return 14*parseInt(e[this.levelKey])+"px"},icon:function(e){return e.$extra&&!0===e.$extra.loading?"el-icon-loading":e.$extra&&e.$extra.expanded?"el-icon-caret-bottom":"el-icon-caret-right"},doexpanded:function(e,t){var n=this,a=this.owner.store.states._data;if(void 0===a[e].$extra?a[e].$extra={expanded:!0}:a[e].$extra.expanded=!a[e].$extra.expanded,a[e].$extra.expanded)if(null!=this.remote){var r=o();a[e].$extra.expanded=!1,a[e].$extra.hash=r,a[e].$extra.loading=!0,n.owner.store.commit("setData",a),this.remote(t,function(e){var t=n.owner.store.states._data,a=s(r,t);if(t[a].$extra={loading:!1,expanded:e&&e.length>0||!1},e&&e.length>0){for(var l=t.slice(0,a+1),i=0;i<a+1;)t.shift(),i++;t=l.concat(e).concat(t)}else t[a][n.childNumKey]=0;n.owner.store.commit("setData",t)})}else{for(var d=a.slice(0,e+1),c=0;c<e+1;)a.shift(),c++;a=d.concat(t[n.childKey]).concat(a),this.owner.store.commit("setData",a)}else{var u=t[n.treeKey],p=[],h=i(u,a,this.parentKey,this.treeKey);a.forEach(function(e){-1===l(e[n.treeKey],h)&&p.push(e)}),a=p,this.owner.store.commit("setData",a)}}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-table-column",{attrs:{prop:e.prop,label:e.label,width:e.width},scopedSlots:e._u([{key:"default",fn:function(t){return[e.hasChild(t.row)?n("span",{on:{click:function(n){n.preventDefault(),e.doexpanded(t.$index,t.row)}}},[n("span",{style:{paddingLeft:e.paddingLeft(t.row)}},[n("i",{class:e.icon(t.row)}),e._v(" "),n("i",{class:e.floderIcon(t.row),staticStyle:{"padding-right":"7px"}})]),e._v(" "),n("span",[e._v(e._s(t.row[e.prop]))])]):e._e(),e._v(" "),e.hasChild(t.row)?e._e():n("span",[n("span",{style:{paddingLeft:e.paddingLeft(t.row)}},[n("i",{class:e.fileIcon,staticStyle:{"padding-right":"7px","padding-left":"18px"}})]),e._v(" "),n("span",[e._v(e._s(t.row[e.prop]))])])]}}])})},staticRenderFns:[]},u=n("VU/8")(d,c,!1,null,null,null).exports,p=[{id:1,label:"System",parent_id:null,url:null,depth:0,child_num:3,description:"System Manager",children:[{id:2,label:"base",parent_id:1,url:null,depth:1,child_num:5,description:"Base Manager",expanded:!0,children:[{id:3,label:"Menus",parent_id:2,url:"/menus",depth:2,child_num:0,description:"menu manager"},{id:4,label:"Roles",parent_id:2,url:"/roles",depth:2,child_num:0,description:"Role Manager"},{id:5,label:"Users",parent_id:2,url:"/users",depth:2,child_num:0,description:"User Manager"}]}]},{id:6,label:"Customs",parent_id:null,url:null,depth:0,child_num:2,description:"Custom Manager",children:[{id:7,label:"CustomList",parent_id:6,url:"/customs",depth:1,child_num:0,description:"CustomList"}]},{id:8,label:"Templates",parent_id:null,url:null,depth:0,child_num:1,description:"Template Manager",children:[{id:9,label:"TemplateList",parent_id:8,url:"/doc_templates",depth:1,child_num:0,description:"Template Manager"}]},{id:10,label:"Bussiness",parent_id:null,url:null,depth:0,child_num:2,description:"Bussiness Manager",expanded:!0,children:[{id:11,label:"BussinessList",parent_id:10,url:null,depth:1,child_num:2,description:"BussinessList",children:[{id:12,label:"Currencies",parent_id:11,url:"/currencies",depth:2,child_num:0,description:"Currencies"},{id:13,label:"Dealtypes",parent_id:11,url:"/dealtypes",depth:2,child_num:0,description:"Dealtypes"}]},{id:14,label:"Products",parent_id:10,url:null,depth:1,child_num:2,description:"Products",children:[{id:15,label:"ProductTypes",parent_id:14,url:"/productTypes",depth:2,child_num:0,description:"ProductTypes"},{id:16,label:"ProductList",parent_id:14,url:"/products",depth:2,child_num:0,description:"ProductList"}]}]}],h=n("gyMJ"),f=n("0xDb"),m={data:function(){return{treeTableColumns:[{text:"名称",value:"name",width:200}],dataList:[],treeData:[]}},components:{TreeTable:a.a,TableTreeColumn:u},created:function(){this.treeData=p,console.log(this.treeData),this.getDataList()},methods:{getDataList:function(){var e=this;this.dataListLoading=!0,h.a.menu.list().then(function(t){var n=t.data;e.dataList=Object(f.c)(n,"menuId"),e.dataListLoading=!1})}}},_={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mod-dept"},[n("tree-table",{staticStyle:{width:"100%"},attrs:{columns:e.treeTableColumns,data:e.dataList,border:""}},[n("el-table-column",{attrs:{prop:"name","header-align":"center",align:"center",label:"菜单名称"}}),e._v(" "),n("el-table-column",{attrs:{prop:"parentName","header-align":"center",align:"center",label:"上级菜单"}}),e._v(" "),n("el-table-column",{attrs:{prop:"icon","header-align":"center",align:"center",label:"图标"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("i",{class:["fa-lg",e.row.icon]})]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"type","header-align":"center",align:"center",label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.type?n("el-tag",{attrs:{size:"small"}},[e._v("目录")]):1===t.row.type?n("el-tag",{attrs:{size:"small",type:"success"}},[e._v("菜单")]):2===t.row.type?n("el-tag",{attrs:{size:"small",type:"info"}},[e._v("按钮")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"orderNum","header-align":"center",align:"center",label:"排序号"}}),e._v(" "),n("el-table-column",{attrs:{prop:"url","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"菜单URL"}}),e._v(" "),n("el-table-column",{attrs:{prop:"perms","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"授权标识"}}),e._v(" "),n("el-table-column",{attrs:{"header-align":"center",align:"center",width:"200",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isAuth("sys:user:update")?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){e.addOrUpdateHandle(t.row.menuId)}}},[e._v("修改")]):e._e(),e._v(" "),e.isAuth("sys:user:delete")?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){e.deleteHandle(t.row.menuId)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),n("el-table",{attrs:{data:e.dataList,border:"","max-height":"400"}},[n("el-table-column",{attrs:{prop:"id",label:"id",width:"180"}}),e._v(" "),n("table-tree-column",{attrs:{"file-icon":"icon icon-file","folder-icon":"icon icon-folder",prop:"label",label:"MenuName",width:"320"}}),e._v(" "),n("el-table-column",{attrs:{prop:"description",label:"Description","show-overflow-tooltip":!0,width:"180"}})],1)],1)},staticRenderFns:[]},v=n("VU/8")(m,_,!1,null,null,null);t.default=v.exports}});