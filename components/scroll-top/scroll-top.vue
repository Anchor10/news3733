<template>
	<view class="scroll-top" @tap="scrollTop" :class="{isShow: isShow}">
		返回顶部
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			isShow: {
				type: Boolean,
				required: true,
				default: false
			}
		},
		methods:{
			scrollTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			}
		}
	}
</script>

<style lang="less">
	.scroll-top{
		position: fixed;
		right: 20upx;
		bottom: 40upx;
		border-radius: 50%;
		text-align: center;
		line-height: 80upx;
		width: 80upx;
		height: 80upx;
		font-size: 24upx;
		color: #fff;
		text-indent: -99999px;
		background: #00c4c4 url(../../static/images/return-top.png) center center no-repeat;
		background-size: 60upx 60upx;
		background-clip: padding-box;
		border: 10upx solid rgba(0,196,196,0.2);
		display: none;
		&.isShow{
			display: block;
		}
	}
</style>
