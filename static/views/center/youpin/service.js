define(function (require, exports, module) {
    require("views/center/youpin/src/css.css");
    var sTpl = require("views/center/youpin/service.html");
    var iPublic = require("components/public.js");
    var API_GET = iPublic.API_GET;

    var index = Vue.extend({
		template: sTpl,
        data:function () {
            return{
                list:[]
            }
        },
        created:function(){
            this.$root.$children[0].showgoback = true; //设置返回键
            this.$root.bodyColor='';    //设置背景
            // this.$root.setScroll(0);
            var that=this;
            API_GET({
                url:'wd_api/finaApp/getFinaServiceContentOn',
                data: {},
                success: function (result) {
                    if(result.isSuccess){
                        that.$root.setTitle(result.data.title);    //设置title
                        that.list=result.data;
                    }
                }
            });
        }
    });

    module.exports = index;
});

