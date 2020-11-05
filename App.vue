<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// //网络判断
			// uni.onNetworkStatusChange(function (res) {
			//     console.log(res.isConnected);
			//     console.log(res.networkType);
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
