<template>
	<view class="index">
		<news-list :newsList="newsList"></news-list>
		<view class="uni-tab-bar-loading">
			<!-- 加载更多显示组件 -->
			<uni-load-more :contentText="loadingText" :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import NewsList from "@/components/news-list/news-list.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more"
	export default {
		data() {
			return {
				newsList:[],
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				loadStatus: 'more',
				hasMore: true,
				page:1
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			uni.setNavigationBarTitle({
				title: this.$mpName
			})
			this.getNewsList(1);
			// #ifdef MP-BAIDU
			// 百度一键关注小程序组件
			swan.showFavoriteGuide({
			    type: 'bar',
			    content:'一键关注小程序',
			    success: res => {
			        console.log('关注成功');
			    },
			    fail: err => {
			        console.log('关注失败');
			    }
			})
			// #endif
		},
		onShow() {
			// #ifdef MP-BAIDU
			swan.setPageInfo({
				title: this.$mpName,
				success: function() {
					console.log('setPageInfo success');
				},
				fail: function(err) {
					console.log('setPageInfo fail', err);
				}
			})
			// #endif
		},
		onPullDownRefresh() {
			this.getNewsList(1);
			setTimeout(() => {
				uni.stopPullDownRefresh();
			},1000)
		},
		onReachBottom() {
			this.getNewsList(2)
		},
		methods: {
			getNewsList(action = 1){
				if (this.hasMore == false) {
					return false;
				}
				if (action === 1) {
					this.page = 1;
				}else{
					this.page++;
				}
				this.loadStatus = 'loading';
				this.$uniRequest(
					`${this.$baseUrl}/newsLists/`,
					{
						page:this.page,
						classid: 0
					}, 
					(res) =>{
						let {
							data:{
								code,
								data:{
									list:newsList
								},
								msg
							}
						} = res;
						if (code == 1 && newsList) {
							newsList.forEach((item) => {
								item.newstime = this.$formatDate(item.newstime)
							})
							if(action === 1){
								this.newsList = newsList;
								this.loadStatus = 'more';
							} else {
								newsList.forEach((item)=>{
									this.newsList.push(item);
								});
								this.loadStatus = 'more';
							}
							if(newsList.length < 10){
								this.hasMore = false;
								this.loadStatus = 'noMore';
							}
						} else {
							uni.showModal({
								title: '提示',
								content: msg,
								showCancel: false,
								confirmText: '知道啦'
							});
							this.hasMore = false;
							this.loadStatus = 'noMore';
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500);
					}
				)
			}
		},
		components:{
			NewsList,
			uniLoadMore
		},
		onShareAppMessage(res) {
			return {
				title: '3733游戏小程序'
			}
		}
	}
</script>

<style lang="less">
	@import url(./index.less);
</style>
