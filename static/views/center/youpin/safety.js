define(function (require, exports, module) {
    //require("views/center/youpin/src/css.css");
    //require("lib/swiper-3.3.1.min.css"); //css
    var sTpl = require("views/center/youpin/safety.html");
    //var iPublic = require("components/public.js");
    //var Swiper = require("./lib/swiper-3.3.1.jquery.min.js");
    //var API_GET = iPublic.API_GET;

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
            this.$root.setTitle("多重保障");
            this.$root.setScroll(0);

        },
        ready:function(){
            //$('.lazyload').picLazyLoad();
            //var mySwiper = new Swiper('.swiper-container', {
            //    pagination : '.swiper-pagination',
            //    paginationClickable :true,
            //    loop:true
            //})

        }
    });

    module.exports = index;
});

