webpackJsonp([4,14],{74:function(t,a,e){(function(t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{jionlist:[],max:10,offset:0,ajaxLock:!0,currentTab:"all",loading:!0,tableLock:!1,initTime:0,assFlag:!1,searchVal:"",prompt:"请输入客户姓名或手机号码",once:!0}},methods:{toCustomerDetail:function(t){Public.AppJump("http://"+window.location.host+"/m/index.html#!/financialPlanner/view/"+t.currentTarget.dataset.member)},cancelSearch:function(){history.back()},enterTxt:function(){var t=this;t.searchVal=t.searchVal.replace(/\s/g,"");var a=t.searchVal?t.searchVal:" ";t.prompt="加载中",Public.API_GET({url:"searchList",data:{searchParam:a,type:null,max:t.max,offset:0},success:function(a){a.data.list&&(t.jionlist=a.data.list,t.jionlist.length>0?t.prompt="":0==t.jionlist.length?t.prompt="暂无数据":t.prompt||(t.prompt="请输入客户姓名或手机号码"))}})},setType:function(t){}},created:function(){var t=this;t.$parent.setTitle("客户搜索"),t.currentTab=t.$route.params.type,t.setType(t.currentTab)},mounted:function(){var a=this;t(document).keyup(function(t){13==t.keyCode&&a.enterTxt()})}}}).call(a,e(1))},181:function(t,a,e){var s,n;s=e(74);var i=e(195);n=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(n=s=s.default),"function"==typeof n&&(n=n.options),n.render=i.render,n.staticRenderFns=i.staticRenderFns,t.exports=s},195:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",[e("div",{staticClass:"search-wrap cc pd_tb_2"},[e("div",{staticClass:"pr"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchVal,expression:"searchVal"}],staticClass:"search-input client-search t_l w_82 pl_10 fl",attrs:{type:"text",placeholder:"搜索",maxlength:"24",autofocus:""},domProps:{value:t._s(t.searchVal)},on:{input:function(a){a.target.composing||(t.searchVal=a.target.value)}}}),t._v(" "),e("i",{staticClass:"icon-search-fine icon-search iconfontSearch"})]),t._v(" "),e("div",{staticClass:"search-btn fr",on:{click:t.cancelSearch}},[t._v("取消")])]),t._v(" "),0!=t.jionlist.length?[t._m(0)]:t._e(),t._v(" "),t.jionlist.length>0?[e("div",{staticClass:"record-list compd"},[e("table",[e("tbody",t._l(t.jionlist,function(a){return e("tr",{attrs:{"data-member":a.memberId},on:{click:t.toCustomerDetail}},[e("td",{attrs:{width:"20%"}},[a.avatar?e("i",{staticClass:"headimg",style:"background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/"+a.avatar+");"}):e("i",{staticClass:"defaultHead"})]),t._v(" "),e("td",{staticClass:"list-center",attrs:{width:"30%"}},[e("span",{staticClass:"g333"},[t._v(t._s(t._f("formatName")(a.realName)))]),t._v(" "),e("p",{staticClass:"g999"},[t._v(t._s(a.mobile))])]),t._v(" "),e("td",{staticClass:"list-center t_r",attrs:{width:"25%"}},[e("span",{staticClass:"c_e71"},[t._v(t._s(t._f("formatMoney")(a.accountBalance)))])]),t._v(" "),e("td",{staticClass:"list-center t_r",attrs:{width:"25%"}},[e("span",{staticClass:"c_e71"},[t._v(t._s(t._f("formatMoney")(a.extend)))])])])}))])])]:t._e(),t._v(" "),t.prompt?e("div",{staticClass:"prompt-txt"},[t._v("\n        "+t._s(t.prompt)+"\n    ")]):t._e()],2)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"invest-list search-title compd clearfix"},[e("span",{staticClass:"dp_ib w_50"},[t._v("我的客户")]),e("span",{staticClass:"dp_ib w_25 list-center t_r"},[t._v("账户余额")]),e("span",{staticClass:"dp_ib w_25 list-center t_r"},[t._v("在投金额")])])}]}}});