define(function(require, exports, module) {
    require("views/center/youpin/src/css.css");
    var sTpl = require("views/center/youpin/index.html");
    var iPublic = require("components/public.js");
    var API_GET = iPublic.API_GET;

    var index = Vue.extend({
        template: sTpl,
        data: function() {
            return {
                id: "",
                list: {}, //项目简介+产品说明
                projectlist: [], //项目清单
                jion: [{}, {}, {}],
                jionlist: [],
                showMore: false,
                percentColor: "",
                detailsType: {
                    txt: "",
                    colorClass: ""
                },
                surplusAmount: 0,
                type: "explain",
                offset: 0,
                max: 10,
                isIos: false,
                schedule: 0,
                // mySchedule: 0,
                isApp: false
            }
        },
        methods: {

            //打开关闭产品说明其余栏目
            flex: function(event) {
                var that = this;
                $(event.currentTarget).parent().toggleClass("shrink");
                $("body").scrollTop($(event.currentTarget).offset().top - 100);
                //解决ios中，收缩后栏目依旧定位在顶部的问题
                if (that.isIos) {
                    if (/^(brief)$/g.test(event.currentTarget.parentNode.className)) {
                        $(".column").removeClass("fix");
                    }
                }
            },
            goDetail: function(id) {
                if (navigator.userAgent.toLowerCase().indexOf('baoxiang') != -1) { //是app打开
                    if (iPublic.getAppFunc("APPLogin")) { //新版本
                        var urlStatus = iPublic.Auth.get();
                        if (!urlStatus) { //未登录
                            location.href = 'baoxiang://APPLogin';
                        } else { //已登录
                            if (iPublic.getAppFunc('APPWebView')) {
                                window.location.href = 'baoxiang://APPWebView?openUrl=' + encodeURIComponent("http://" + window.location.host + '/lc/invest/datum/' + id + '.html')
                            } else {
                                location.href = '/lc/invest/datum/' + id + '.html';
                            }
                        }
                    } else { //老版本
                        location.href = "baoxiang://APPProjectInvesting?type=invest&investId=" + id;
                    }
                }
            },
            //切换栏目
            cutTabs: function(event) {
                //切换栏目
                var that = this;
                $(event.currentTarget).addClass("on").siblings("li").removeClass("on");
                $(".items>div").eq($(event.currentTarget).index()).addClass("showbox").siblings("div").removeClass("showbox");
                that.type = event.currentTarget.getAttribute('data-type');
                that.offset = 0;

                // $(window).scrollTop(0);

                //给苹果
                if (that.isIos) {
                    $(".column").removeClass("fix");
                }

                //获得数据
                switch (that.type) {
                    case "project":
                        API_GET({
                            url: "wd_api/finaApp/getFinaLibraryOn",
                            // url:"m/api/youpin-projectlist.json",
                            data: { "finaId": that.id, "offset": that.offset, "max": that.max },
                            success: function(result) {
                                if (result.isSuccess) {
                                    that.projectlist = result.data;
                                    that.offset += that.max;
                                }
                            }
                        });
                        break;
                    case "record":
                        API_GET({
                            url: "wd_api/finaApp/getFinaHistoryRankOn",
                            // url:"m/api/youpin-jion.json",
                            data: { "finaId": that.id },
                            success: function(result) {
                                if (result.isSuccess) {
                                    that.jion = result.data;
                                    //投资详情
                                    API_GET({
                                        url: "wd_api/finaApp/getFinaHistoryOn",
                                        // url:"m/api/youpin-jionmore.json",
                                        data: { "finaId": that.id, "offset": that.offset, "max": that.max },
                                        success: function(result) {
                                            if (result.isSuccess) {
                                                that.jionlist = result.data;
                                                that.offset += that.max;
                                            }
                                        }
                                    });
                                }
                            }
                        });
                        break;
                    default:
                        break;
                }
            },

            //拉取数据
            loadData: function() {
                var type = arguments[0]
                var that = this;
                if (type === "project" || type === "record") {
                    // that.showMore = true;
                    setTimeout(function() {
                        if (type == "project") {
                            API_GET({
                                url: "wd_api/finaApp/getFinaLibraryOn",
                                // url: 'm/api/youpin-projectlistmore.json',
                                data: { "finaId": that.id, "offset": that.offset, "max": that.max },
                                success: function(result) {
                                    if (result.isSuccess) {
                                        if (result.data.length === 0) {
                                            that.noMore();
                                        } else {
                                            that.projectlist = that.projectlist.concat(result.data);
                                            that.offset += that.max;
                                        }
                                    }
                                }
                            });
                        }
                        if (type == "record") {
                            API_GET({
                                url: "wd_api/finaApp/getFinaHistoryOn",
                                // url: 'm/api/youpin-jionmore.json',
                                data: { "finaId": that.id, "offset": that.offset, "max": that.max },
                                success: function(result) {
                                    if (result.isSuccess) {
                                        if (result.data.length === 0) {
                                            that.noMore();
                                        } else {
                                            that.jionlist = that.jionlist.concat(result.data);
                                            that.offset += that.max;
                                        }
                                    }
                                }
                            });
                        }
                        that.showMore = false;
                    }, 0)
                }
            },
            noMore: function() {
                //加载更多提示
                $(".noMore").show();
                setTimeout(function() {
                    $(".noMore").hide();
                }, 600)
            },
            appClosed: function(e) {
                e.preventDefault();
                this.isApp = false;
            }
        },
        created: function() {
            //初始化

            this.$root.$children[0].showgoback = false; //设置返回键
            this.$root.bodyColor = 'youpinG'; //设置背景
            var that = this;

            that.id = this.$route.params.id; //获取项目id,ajax参数
            //桔子还是苹果
            /(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLocaleLowerCase()) ? that.isIos = true : that.isIos;
            navigator.userAgent.toLocaleLowerCase().indexOf('baoxiang') == -1 ? that.isApp = true : that.isApp = false;



            //项目简介+产品说明
            API_GET({
                url: 'wd_api/finaApp/getFinaDetailsOn',
                // url: 'm/api/youpin-index.json',
                data: { "finaId": that.id },
                success: function(result) {
                    if (result.isSuccess) {

                        that.$root.setTitle(result.data.title); //设置title

                        //根据type设置状态及字体颜色,除PROCESS状态外，其余状态一律显示100
                        switch (result.data.finaStatus.toLocaleUpperCase()) {
                            case "SUCCESS":
                                that.detailsType.txt = "已满额";
                                // that.detailsType.colorClass = "red";
                                that.schedule = 100;
                                break;
                            case "RUN":
                                that.detailsType.txt = "收益中";
                                // that.detailsType.colorClass = "red";
                                that.schedule = 100;
                                break;
                            case "DONE":
                                that.detailsType.txt = "已结束";
                                // that.detailsType.colorClass = "blue";
                                that.schedule = 100;
                                break;
                            default:
                                that.detailsType.txt = "可投 " + result.data.surplusAmount + " 元";
                                that.schedule = result.data.investProcess;
                                break;
                        }
                        // that.schedule == 100 ? that.percentColor = "blue" : ""; //设置募集百分比字体颜色
                        that.list = result.data;
                        // var tempSche=(1-result.data.surplusAmount/result.data.amount)*100
                        // if(tempSche>=99){
                        //     that.mySchedule=Math.floor(tempSche)
                        // }else{
                        //     that.mySchedule=Math.round(tempSche)
                        // }
                    }
                }
            });


            var domTop,
                fixClass = "fix";
            //固定栏目在文档模型中的位置
            setTimeout(function() {
                domTop = $(".column").offset() ? $(".column").offset().top : 0;
            }, 0)

            var direction,
                beforeScrollTop = document.body.scrollTop;
            $(window).on("scroll", function() {
                //控制栏目固定
                if (($("body").scrollTop()) >= domTop) {
                    $(".column").addClass(fixClass);
                } else {
                    $(".column").removeClass(fixClass);
                }

                //判断滚动条滚动方向
                var afterScrollTop = document.body.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta === 0) return false;
                direction = delta > 0 ? true : false;
                beforeScrollTop = afterScrollTop;

                if (direction) {
                    //往下滚动下拉数据、解决切换栏目时往上滚动触发滚动事件
                    var raw = $("a.vip_load[vip-visibled]")
                    raw.each(function() {
                        var scrollTop = $("body").scrollTop(),
                            windowHeight = $(window).height(),
                            domHeight = $(document).height();

                        if ((scrollTop + windowHeight + 10 >= domHeight)) {
                            that.loadData(that.type);
                        }
                    });
                }
            });

            //苹果,往上滑及隐藏
            if (that.isIos) {
                var start,
                    end,
                    move,
                    touchFlg = 0;
                window.addEventListener("touchstart", function(event) {
                    start = event.touches[0].pageY;
                });
                window.addEventListener("touchmove", function(event) {
                    end = event.touches[0].pageY;
                    move = start - end;
                    touchFun(move);
                });
                /*window.addEventListener("touchend", function (event) {
                   move = start - end;
                     touchFun(move);
                })*/
                function touchFun(move) {
                    /*                    if (move > 0) {
                                            //向下
                                            touchFlg += move;
                                        } else {
                                            //向上
                                            touchFlg += move;
                                            $(".column").removeClass(fixClass);
                                        }*/
                    if (move < 0) {
                        //向上滑动
                        $(".column").removeClass(fixClass);
                    }
                    touchFlg += move;

                }
            }
        }
    });



    //处理投资金额显示
    index.filter('formatMoney', function(value) {
        if (value) {
            /*            if(value<1000){
                            return value+".00";
                        }else{
                            var val=value/10000;
                            if(val>=1){
                                if(val.toString().indexOf(".")!=-1){
                                    // return val.toString().substr(0,val.toString().indexOf(".")+3)+"万";
                                    return val.toFixed(2)+"万";
                                }else{
                                    return val+".00万";
                                }
                            }else{
                                return val+"0万";
                            }
                        }*/
            var val = value * 1;
            if (val < 1000) {
                return val.toFixed(2);
            } else {
                return (val / 10000).toFixed(2) + "万";
            }
        } else {
            return "0.00";
        }

    });

    //url跳转
    /*    index.filter('UrlSkip',function(url){
            return "http://"+location.hostname+"/m/index.html#!/center/youpin/service/";
        });*/

    //投资记录金额处理
    index.filter('formatInvest', function(value) {
        return Number(value).toFixed(2);
    });
    //投资记录金额处理
    index.filter('formatFina', function(value) {
        if (value == "day") {
            return "天"
        } else {
            return "个月"
        }

    });
    //预期年化处理
    index.filter('expectYear', function(val) {
        if (!val) {
            return "0.00";
        }
        return Number(val).toFixed(2);
    });

    module.exports = index;
});