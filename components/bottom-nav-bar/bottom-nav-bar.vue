<template>
	<view class="bottom-bar">
		<view class="nav-list">
			<view class="nav-item" @tap="switchTo('/pages/index/index')">
				<image class="nav-icon" src="../../static/images/all.png" mode=""></image>
				<text class="nav-text">全部</text>
			</view>
			<view class="nav-item" @tap="switchTo('/pages/news/news')">
				<image class="nav-icon" src="../../static/images/news.png" mode=""></image>
				<text class="nav-text">新闻</text>
			</view>
			<view class="nav-item" @tap="switchTo('/pages/huodong/huodong')">
				<image class="nav-icon" src="../../static/images/huodong.png" mode=""></image>
				<text class="nav-text">活动</text>
			</view>
			<view class="nav-item" @tap="switchTo('/pages/pingce/pingce')">
				<image class="nav-icon" src="../../static/images/pingce.png" mode=""></image>
				<text class="nav-text">评测</text>
			</view>
			<view class="nav-item" @tap="switchTo('/pages/gonglue/gonglue')">
				<image class="nav-icon" src="../../static/images/gonglue.png" mode=""></image>
				<text class="nav-text">攻略</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			switchTo(url){
				uni.switchTab({
					url: url
				});
			}
		}
	}
</script>

<style lang="less">
@import './bottom-nav-bar.less';
</style>
