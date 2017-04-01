/**
 * Created by hmc on 2016/7/7
 */
// 帮助中心

define(function (require, exports, module) {
    require("views/help/src/css.css");
    var sTpl = require("views/help/index.html");
    var iPublic = require("components/public.js");
    var API_GET = iPublic.API_GET;
    var sessionId = window.sessionStorage.getItem("num");

    var index = Vue.extend({
		template: sTpl,
        // 列表
        components: {
            'list': {
                template: ' <ul class="listCon">\
                            <template v-for="val in list">\
                            <li v-link="\'/help/news/\'+val.articleId" data-id="{{val.articleId}}" id="listCon{{val.articleId}}"><p>{{val.articleTitle}}</p></li>\
                            </template>\
                            </ul>',
                data: function () {
                    return {
                        list: []
                    }
                }
            }
        },
        data:function(){
            return {
                indexInfo: [{"helpId":"","helpName":""}],
                show:false,
                liwidth:{width:''},
                ulwidth:{width:''},
                helpKeyId:'',
                endX:0,
                startX:0,
                sum:0,
                setLiWidth : window.innerWidth / 4.8
            }
        },
        methods:{
            click:function(event){
                $(event.target).addClass('on').siblings('li').removeClass('on');
                var that=this;
                var id=event.currentTarget.getAttribute('data-helpKey');
                this.getInfo(id);
                var numId = event.target.getAttribute('data-index');
                window.sessionStorage.setItem("num", numId);
                var clickLen = $(".sectionUl").find("li").length;
                if(numId > 1 && numId < clickLen - 2){
                    $(".section01").css({left: - that.setLiWidth * (numId - 1)});
                }else if(numId == (clickLen - 2) && clickLen > 3){
                    $(".section01").css({left: - that.setLiWidth * (numId - 2)});
                }else if(numId == (clickLen - 1) && clickLen > 3){
                    $(".section01").css({left: - that.setLiWidth * (numId - 3)});
                }else{
                    $(".section01").css({left:0});
                }
            },
            moveFun:function(){
                //var that=this;
                //window.addEventListener("touchstart",function(event){
                //    that.startX = event.targetTouches[0].pageX;
                //});
                //window.addEventListener("touchmove",function(event){
                //    that.endX =event.targetTouches[0].pageX;
                //});
                //return  that.endX - that.startX;
            },
            moveLeft:function(){
                //var that=this;
                //var moveLongLeft = this.moveFun();
                //that.sum += moveLongLeft;
                //var allLong = - ($(".sectionUl").width()) + 300;
                //if(that.sum <= -allLong){
                //    that.sum = allLong;
                //}
                //$(".section01").css({left:that.sum});
            },
            moveRight:function(){
                //var that=this;
                //var moveLongRight = this.moveFun();
                //that.sum += moveLongRight;
                //if(that.sum >= 0){
                //    that.sum = 0;
                //}
                //$(".section01").css({left:that.sum});
            },
            getInfo:function(type){
                var that=this;
                API_GET({
                    url:'wd_api/helpApp/getHelpListOn',
                    data: {"helpKey":type,max:99},
                    success: function (result) {
                        if(result.isSuccess){
                            that.show=false;
                            setTimeout(function(){
                                that.$children[0].list = result.data;
                            },0)
                        }else{
                            that.$children[0].list=[];
                            that.show=true;
                        }
                    }
                });
            },
			/*获取后缀*/
			getQueryString: function(name){
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.href.split("?")[1];
				if (r){
					r = r.match(reg)
				    return decodeURI(r[2]);
				}else{
				    return 0;
				}
			}

        },
        created:function(){
            //设置返回键
            this.$root.$children[0].showgoback = true;
            this.$root.bodyColor='gray';
            var that = this;
			//that.helpKeyId = that.getQueryString('helpId');
            if(window.sessionStorage.getItem("num") && that.getQueryString('helpId')){
                that.helpKeyId = window.sessionStorage.getItem("num");
            }else if(that.getQueryString('helpId')){
                that.helpKeyId = that.getQueryString('helpId');
            }else if(window.sessionStorage.getItem("num")){
                that.helpKeyId = window.sessionStorage.getItem("num");
            }else{
                that.helpKeyId = 0;
            }
           
            setTimeout(function(){
                API_GET({
                    url:'wd_api/helpApp/getHelpTypeOn',
                    data:{},
                    success:function(result){
                        if(result.isSuccess){
                            that.liwidth.width = that.setLiWidth + "px";
                            that.ulwidth.width = result.data.length * that.setLiWidth +"px";
                            that.indexInfo = result.data;
                            that.getInfo(result.data[that.helpKeyId].helpKey);
                            var sesultlen = result.data.length;

                            if(that.helpKeyId > 1 && that.helpKeyId < sesultlen - 2){
                                $(".section01").css({left: - that.setLiWidth * (that.helpKeyId - 1)});
                            }else if(that.helpKeyId == (sesultlen - 2) && sesultlen > 3){
                                $(".section01").css({left: - that.setLiWidth * (that.helpKeyId - 2)});
                            }else if(that.helpKeyId == (sesultlen - 1) && sesultlen > 3){
                                $(".section01").css({left: - that.setLiWidth * (that.helpKeyId - 3)});
                            }else{
                                $(".section01").css({left: 0});
                            }
                        }
                    }
                })
            },0)
        },
        ready:function(){
            setTimeout(function(){
                var newsSessionId = window.sessionStorage.getItem("newsSessionId");
                if(newsSessionId){
                    var dh = ($("#listCon" + newsSessionId).offset().top) - 42;
                    $(window).scrollTop(dh);
                    window.sessionStorage.removeItem("newsSessionId");
                }
            },100);

        }
    });
    module.exports = index;
});

