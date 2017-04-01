define(function (require,exports,module) {
	var you = Vue.extend({
		template: '<router-view></router-view>',
		created: function () {
			//设置title
			// this.$root.setTitle('月月丰');
		}
	});
	module.exports = you;
});


