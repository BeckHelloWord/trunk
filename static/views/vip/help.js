/**
 * Created by YW on 2016/6/27.
 */
// 成长值帮助

define(function (require,exports,module) {
	require("views/vip/src/style.css");
    var sTpl = require("views/vip/help.html");

	var iPublic = require("components/public.js");
	var API_GET = iPublic.API_GET;


	var help_extend = Vue.extend({
    template: sTpl,
    // 我的特权
    components: {
        'list': {
            template: ' <div class="power-item">\
                            <div v-for="val in list">\
                                <div class="itemList"><p>{{val.levelProfitName}}</p></div>\
                            </div>\
                        </div>',
            data: function () {
                return {
                    list: []
                }
            }
        }
    },
		data:function () {
			return{
				list:[],
        showline:{},
        myvip:''
			}
		},
		methods: {
        changetab: function (event) {
            var that=this;
            $(event.currentTarget).addClass('ring').siblings('tr').removeClass('ring');
            var id=event.currentTarget.getAttribute('data-id') || 1;
            API_GET({
                url: 'wd_api/memberSystem/getProfitsByLevelOn',
                // url:'api/vip.json',
                data: {"levelId":id},
                success: function (result) {
                    if(result.isSuccess){
                        setTimeout(function () {
                            that.$children[0].list=result.data;
                            that.list.map(function(val,key){
                                if(val.levelSettingId==id){
                                    that.myvip=val.levelSettingName;
                                }
                            })
                        },0)
                    }
                }
            });

        }
		},
		created: function () {
			//设置返回键
			this.$root.$children[0].showgoback = true;
			//设置title
			this.$root.setTitle('会员等级介绍');

			var that=this;
			//公共ajax请求
			API_GET({
				url: 'wd_api/memberSystem/getMemberSystemLevelRollOn',
				// url:'api/helplist.json',
				data: {},
				success: function (result) {
					if(result.isSuccess){
						that.list=result.data;
					}
          
				}
			});
		}
    });

    module.exports = help_extend;
});

