/**
 * Created by hmc on 2016/7/7
 */
// 敬请期待

define(function (require, exports, module) {
    require("views/vip/src/style.css");
    var sTpl = require("views/vip/expect.html");
    //var iPublic = require("components/public.js");
    //var API_GET = iPublic.API_GET;

    var expect = Vue.extend({
        template: sTpl,
        data:function(){
            return {
                i : 0,
                list: [{"title":"","description":"","content":"","redirectUrl":""}]
            };
        },
        methods:{
          letgo: function () {
            this.i++;
            if(this.i > 4){
              this.i = 0;
              this.$root.bodyColor='gray';
              this.$route.router.go({ path: '/vip/homepage/' })
            }
          }
        },
        created:function(){
            this.$root.bodyColor='expectbd';

        }
    });
    module.exports = expect;
});

