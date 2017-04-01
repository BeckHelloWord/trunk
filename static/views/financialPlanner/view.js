/**
 * Created by T'ingHsi on 2016/6/23.
 */
// 我的客户

define(function (require,exports,module) {
    var sTpl = require("views/financialPlanner/view.html");
	
    var iPublic = require("components/public.js");
    var publicArr = iPublic.publicArr,
		Auth = iPublic.Auth,
		API_GET = iPublic.API_GET;
	

    var VueComponent = Vue.extend({
        template: sTpl,
        methods:{
            loadMore:function(){
				//layer.open({
				//	content: '我是Foo页面',
				//	style: 'background-color:#09C1FF; color:#fff; border:none;',
				//	time: 2
				//});
            }
        },
        data:function(){
			return {
				badlink : /baoxiangios/.test(navigator.userAgent.toLowerCase()) ? true : false, // baoxiangAndroid baoxiangiOS
				viewbgc : /micromessenger/.test(navigator.userAgent.toLowerCase()) ? '#1b1c20' : '#2d449f',
				customer : {
					info : {isSuccess:false, message:'加载中...',data:{realName:'',mobile:'',availableMoney:'',waitingReceiptAllMoney:''}},
					list : {isSuccess:false, message:'加载中...',data:[]},
					yyf : {isSuccess:false, message:'加载中...',data:[]}
				}
			};
        },
		methods: {
			getCustomer: function (UID) {
				/*
				this.customer.info = {isSuccess:true,data:{realName:'熊庭羲',mobile:'18516509650',availableMoney:'123',waitingReceiptAllMoney:'3123'}};
				
				this.customer.list = {isSuccess:true,data:[
					{borrowName:'投资项目名称1',amount:'金额',nextReceipt:'回款日期'},
					{borrowName:'投资项目名称2',amount:'金额',nextReceipt:'回款日期'},
					{borrowName:'投资项目名称3',amount:'金额',nextReceipt:'回款日期',dateInterest:'2016-06-13'},
					{borrowName:'投资项目名称4',amount:'金额',nextReceipt:'回款日期',dateInterest:'2016-06-13'}
				]};
				
				return;
				*/
				var me = this;
				//客户资料
				API_GET({
					url : 'wd_api/financialPlanner/getRecommendMember',
					data : {registerId:UID},
					success : function(result){
						//设置底部菜单
						me.$parent.$children[0].changeMenu('view',result.data.mobile);
						me.customer.info = result;
					}
				});
				
				//客户回款记录
				API_GET({
					url : 'wd_api/financialPlanner/getRecommendMemberInvestDetail',
					data : {registerId:UID,offset:0,max:30},
					success : function(result){
						//console.log(result);
						me.customer.list = result;
					}
				});
				//yyf
				API_GET({
					url : 'wd_api/financialPlanner/getMemberFinaInvest',
					data : {registerId:UID,offset:0,max:30},
					success : function(result){
						//console.log(result);
						me.customer.yyf = result;
					}
				});
				/*
				//客户投资记录
				API_GET({
					url : 'wd_api/financialPlanner/getRecommendMemberInvestDetail',
					data : {registerId:UID,offset:0,max:30},
					success : function(result){
						//console.log(result);
						me.customer.list = result;
					}
				});
				*/
			},
			changeTab:function(e){
				if(e.target.className=="selected"){
					return
				}else{
					$(".selected").removeClass("selected")
					e.target.className="selected"
					$(".js_tab").css("display","none")
					$("#showTab_"+e.target.dataset.tab).css("display","block")
				}
			}
		},
		created: function () {
			var persion=localStorage.getItem('persion');
			//设置返回键
			this.$root.$children[0].showgoback = true;
			//将当前path传给公共函数
			publicArr.path = this.$route.fullPath;
			//拉取数据
			var me = this;
			setTimeout(function () {
				if(Auth.get() != 0){
					var id;
					try{
						id=this.$route.params.id;
					}catch(r){
						id=location.href.substr(location.href.indexOf('view')+5);
					}
					me.getCustomer(id);
				}else{
					publicArr.me = me;
				}
			},300)

		}
    });
	VueComponent.filter('HandleName',function (value) {
		return value.indexOf('null')!=-1?'&nbsp;':value;
	})
    module.exports = VueComponent;
});

