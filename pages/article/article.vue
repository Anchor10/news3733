<template>
	<view class="article">
		<!-- 顶部导航栏 start -->
		<view class="nav-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" show-scrollbar="false">
				<view v-for="(tab, index) in navList" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="'id'+tab.classid"
				 :data-current="index" @click="tapTab(tab, index)">{{tab.name}}</view>
				<view class="ts-line" :style="{left:linePosition}"></view>
				<!-- 返回顶部 -->
				<scroll-top @tap="returnTop" :isShow="newsList[tabIndex].scrollTopShow"></scroll-top>
			</scroll-view>
		</view>
		<!-- 顶部导航栏 end -->
		<!-- 文章列表 start -->
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in newsList" :key="tabIndex">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore" :scroll-with-animation="true" refresher-enabled=true refresher-triggered="false" refresher-threshold="100" :scroll-top="tabItem.scrollTop" @scroll="scroll">
					<news-list :newsList="tabItem.data"></news-list>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="loadingText" :status="tabItem.loadStatus"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 文章列表 end -->
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import NewsList from "@/components/news-list/news-list.vue"
	import ScrollTop from "@/components/scroll-top/scroll-top.vue"
	export default {
		components: {
			uniLoadMore,
			NewsList,
			ScrollTop
		},
		data() {
			return {
				scrollLeft: 0,
				newsList: [],
				tabIndex: 0,
				navList: [{
						name: '最新',
						classid: 0,
						oldScrollTop: 0,
						scrollTop: 0
					},
					{
						name: '新闻',
						classid: '21',
						oldScrollTop: 0,
						scrollTop: 0
					},
					{
						name: '活动',
						classid: 22,
						oldScrollTop: 0,
						scrollTop: 0

					},
					{
						name: '评测',
						classid: 24,
						oldScrollTop: 0,
						scrollTop: 0
					},
					{
						name: '攻略',
						classid: 23,
						oldScrollTop: 0,
						scrollTop: 0
					}
				],
				loadStatus: 'more',
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
			}
		},
		computed: {
			linePosition() {
				return uni.upx2px(this.tabIndex * 150) + 'px';
			},
		},
		onLoad() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.getNavList();
			// #ifdef MP-BAIDU
			// 百度一键关注小程序组件
			swan.showFavoriteGuide({
				type: 'bar',
				content: '一键关注小程序',
				success: res => {
					console.log('关注成功');
				},
				fail: err => {
					console.log('关注失败');
				}
			})
			// #endif
		},
		methods: {
			scroll(e) {
				if (e.detail.scrollTop > 300 && !this.newsList[this.tabIndex].scrollTopShow) {
					this.newsList[this.tabIndex].scrollTopShow = true
				} else if (e.detail.scrollTop <= 300 && this.newsList[this.tabIndex].scrollTopShow) {
					this.newsList[this.tabIndex].scrollTopShow = false
				}
				this.newsList[this.tabIndex].oldScrollTop = e.detail.scrollTop
			},
			returnTop() {
				this.newsList[this.tabIndex].scrollTop = this.newsList[this.tabIndex].oldScrollTop
				this.newsList[this.tabIndex].scrollTopShow = false
				this.$nextTick(() => {
					this.newsList[this.tabIndex].scrollTop = 0
				});
			},
			getNavList() {
				this.navList.forEach((tabBar) => {
					let classid = tabBar.classid
					this.newsList.push({
						data: [],
						scrollTop: tabBar.scrollTop,
						oldScrollTop: tabBar.oldScrollTop,
						hasMore: true,
						loadStatus: 'more',
						scrollTopShow: false,
						requestParams: {
							page: 1,
							listrows: 10,
							classid: classid
						},
					});
				});
				this.getList();
			},
			loadMore() {
				this.getList(2);
			},
			getList(action = 1) {
				let activeTab = this.newsList[this.tabIndex];
				if (activeTab.hasMore == false) {
					return false;
				}
				if (action === 1) {
					activeTab.requestParams.page = 1;
				} else {
					activeTab.requestParams.page++;
				}

				activeTab.loadStatus = "loading";
				this.$uniRequest(
					`${this.$baseUrl}/newsLists/`, {
						classid: activeTab.requestParams.classid,
						page: activeTab.requestParams.page
					},
					(res) => {
						let {
							data: {
								code,
								data: {
									list: newsList
								},
								msg
							}
						} = res;
						if (code == 1 && newsList) {
							newsList.forEach((item) => {
								item.newstime = this.$formatDate(item.newstime)
							})
							if (action === 1) {
								activeTab.data = newsList;
								activeTab.loadStatus = 'more';
							} else {
								newsList.forEach((item) => {
									activeTab.data.push(item);
								});
								activeTab.loadStatus = 'more';
							}
							if (newsList.length < 10) {
								activeTab.hasMore = false;
								activeTab.loadStatus = 'noMore';
							}
						} else {
							uni.showModal({
								title: '提示',
								content: msg,
								showCancel: false,
								confirmText: '知道啦'
							});
							activeTab.hasMore = false;
							activeTab.loadStatus = 'noMore';
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500);
					}
				)
			},
			async changeTab(event) {
				let index = event.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize('tab-bar'); // scroll-view的信息
				let tabBarScrollLeft = tabBar.scrollLeft;
				var width = 0; // current 之前的宽度总和

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize('id' + this.navList[i].classid);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth - 40,
					nowElement = await this.getElSize('id' + this.navList[index].classid),
					nowWidth = nowElement.width; // 当前tab的宽度
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index;

				// 首次切换后加载数据
				const activeTab = this.newsList[this.tabIndex];
				if (activeTab.data.length === 0) {
					this.getList();
				}
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					//#ifndef MP-ALIPAY
					uni.createSelectorQuery().in(this).select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
					//#endif
					//#ifdef MP-ALIPAY
					my.createSelectorQuery().select('#' + id).boundingClientRect()
						.select('#' + id).scrollOffset().exec(data => {
							var newData = Object.assign(data[0], data[1])
							res(newData);
						});
					//#endif
				});
			},
			async tapTab(tab, index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize('tab-bar'), // scroll-view的宽度
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
					// 首次切换后加载数据
					const activeTab = this.newsList[this.tabIndex];
					if (activeTab.data.length === 0) {
						this.getList();
					}
				}
			}
		}
	}
</script>
<style lang="less">
	@themeColor: #FFC600;

	page {
		background-color: #FFFFFF;
		height: 100%;
		font-size: 11px;
		line-height: 1.8;
	}

	body {
		height: 100%;
	}

	.article {
		height: 100%;
	}

	.list {
		width: 750upx;
		height: 100%;
	}

	#tab-bar {
		position: relative;
		z-index: 10000;
		width: 100%;
		white-space: nowrap;
		line-height: 80upx;
		height: 80upx;
	}

	.nav-bar {
		background-color: #fff;
		position: fixed;
		z-index: 10000;
		width: 100%;
		line-height: 80upx;
		height: 80upx;
		border-bottom: 1px solid #f3f3f3;
		top: 0;
	}


	.swiper-tab-list {
		font-size: 26upx;
		width: 150upx;
		// margin-right: 56upx;
		display: inline-block;
		text-align: center;
		color: #555;
		height: 70upx;
		font-weight: bold;

	}

	.ts-line {
		width: 150upx;
		position: absolute;
		height: 8upx;
		background: @themeColor;
		top: 70upx;
		left: 0;
		transition: 0.3s;
		z-index: 1000;
	}

	.uni-tab-bar .active {
		transition: color 0.3s;
		font-size: 30upx;
		color: @themeColor;
	}

	.swiper-box {
		flex: 1;
		width: 100%;
		position: static;
		height: 100%;
	}

	.swiper-box .swiper-item {
		box-sizing: border-box;
		padding-top: 80upx;
	}

	.article-list {
		.article-item {
			box-sizing: border-box;
			padding: 30upx 30upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #f3f3f3;

			.article-pic {
				display: block;
				width: 183upx;
				height: 123upx;
				margin-right: 30upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.title {
					font-size: 28upx;
					color: #333;
				}

				.info {
					display: flex;
					justify-content: space-between;

					.number {
						font-size: 24upx;
						color: #6a6a6a;
					}

					.tag {
						width: 110upx;
						height: 34upx;
						border-radius: 17upx;
						background: #5ba1f7;
						color: #fff;
						font-size: 20upx;
						text-align: center;
						line-height: 34upx;
					}
				}
			}
		}
	}
</style>
