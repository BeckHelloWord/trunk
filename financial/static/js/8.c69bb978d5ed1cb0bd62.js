webpackJsonp([8,14],{69:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{rate:5.5,minMoney:100,dailyInMoney:2e4,sumMax:5e4,redeemDayMax:2e4}},methods:{getData:function(){var t=this;Public.API_GET({url:"briskRecommand",success:function(e){e.data&&(t.rate=e.data.wealthYearRate,t.minMoney=e.data.wealthInvestMin,t.dailyInMoney=e.data.wealthInvestDayMax,t.sumMax=e.data.wealthTotalInvestMax,t.redeemDayMax=e.data.wealthRedeemDayMax)}})}},mounted:function(){this.$parent.setTitle("产品说明"),Public.setPageInit(this.getData),Public.pageInit()}}},176:function(t,e,a){var s,n;s=a(69);var r=a(183);n=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(n=s=s.default),"function"==typeof n&&(n=n.options),n.render=r.render,n.staticRenderFns=r.staticRenderFns,t.exports=s},183:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ttj"},[a("div",{staticClass:"discribe"},[t._v("\n        添添金是宝象金融为您精心打造的活期产品，申购添添金的资金投向真实优质债权项目，不仅能够得到超额收益，还能随时提取，方便灵活且不收取任何手续费。\n    ")]),t._v(" "),a("div",{staticClass:"intro-one"},[a("table",[t._m(0),t._v(" "),a("tr",[a("td",{staticClass:"w26 gray"},[t._v("收益率")]),t._v(" "),a("td",[t._v("平均年利率"+t._s(t.rate)+"%(将根据市场行情不定期调整)")])]),t._v(" "),t._m(1)])]),t._v(" "),a("div",{staticClass:"intro-one"},[a("table",[a("tr",[a("td",{staticClass:"w26 gray"},[t._v("申购门槛")]),t._v(" "),a("td",[t._v("可用余额申购，"+t._s(t.minMoney)+"元起")])]),t._v(" "),a("tr",[a("td",{staticClass:"w26 gray"},[t._v("申购限制")]),t._v(" "),a("td",[t._v("单人单日累计申购上限"+t._s(t.dailyInMoney)+"元"),a("br"),t._v(" 单人累计申购总额上限为"+t._s(t.sumMax)+"元\n                ")])]),t._v(" "),t._m(2),t._v(" "),t._m(3)])]),t._v(" "),a("div",{staticClass:"intro-one"},[a("table",[t._m(4),t._v(" "),a("tr",[a("td",{staticClass:"w26 gray"},[t._v("赎回限制")]),t._v(" "),a("td",[t._v("每位投资人单日赎回上限为"+t._s(t.redeemDayMax)+"元")])]),t._v(" "),t._m(5)])]),t._v(" "),t._m(6)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticClass:"w26 gray"},[t._v("产品说明")]),t._v(" "),a("td",[t._v("平台优选真实优质债权项目")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticClass:"w26 gray"},[t._v("项目期限")]),t._v(" "),a("td",[t._v("无期限，可以随时申请赎回")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticClass:"w26 gray"},[t._v("起息日")]),t._v(" "),a("td",[t._v("当日16:00前申购成功的金额当日起息"),a("br"),t._v(" 16:00点后申购成功的金额次日起息\n                ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticClass:"w26 gray"},[t._v("收益到账日")]),t._v(" "),a("td",[t._v("起息后收益次日到账")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticClass:"w26 gray"},[t._v("赎回")]),t._v(" "),a("td",[t._v("债权转让退出，由新的投资人接手后赎回")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticClass:"w26 gray"},[t._v("赎回说明")]),t._v(" "),a("td",[t._v("申请赎回后，赎回金额回到您账户余额中,若遇到赎回人数较多情况，申请赎回后会按照每位用户申请赎回顺序至每位用户账户余额中,最晚T+1（工作日）到余额账户。")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"intro-one"},[a("table",[a("tr",[a("td",{staticClass:"w26 gray"},[t._v("费用")]),t._v(" "),a("td",[t._v("平台手续费用0.00元")])]),t._v(" "),a("tr",[a("td",{staticClass:"w26 gray red"},[t._v("说明")]),t._v(" "),a("td",[t._v("体验金、红包等不能申购添添金"),a("br"),t._v(" 持有期间利息按日计算，本金自动复投\n                ")])])])])}]}}});