<template>
	<view class="news-list" v-if="newsList">
		<!-- <block v-for="(item2,index2) of newsList" :key="index2">
			{{item2.title}}
		</block> -->
		<block v-for="(item,index) of newsList" :key="index">
			<view class="news-item" @click="goDetail(item)">
				<view class="news-title">
					{{item.title}}
				</view>
				<view class="news-pic">
					<image v-if="item.titlepic != 'http://pic3.3733.com/'" class="pic" :src="item.titlepic" mode="aspectFill"></image>
				</view>
				<view class="news-desc">
					{{item.smalltext}}
				</view>
				<view class="news-date">
					<view>{{item.newstime}}</view>
					<view class="view-num">{{item.onclick}}</view>
				</view>
			</view>
		</block>
	</view>
</template>	
<script>
	export default {
		data(){
			return{
			}
		},
		props:['newsList'],
		// filters:{
		// 	formatDate:function(data){
		// 		//日期格式化
		// 		var prefix_zero = (num)=> {
		// 			return num >= 10 ? num : "0" + num;
		// 		}
		// 		var date =  new Date(data * 1000);
		// 		return date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ prefix_zero(date.getHours()) +':'+ prefix_zero(date.getMinutes())
		// 	}
		// },
		methods:{
			goDetail(item){
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.id
				});
			}
		}
	}
</script>

<style lang="less">
	.news-list{
		background: #f5f5f5;
		min-height: 100%;
		overflow: hidden;
		padding-bottom: 25upx;
		.news-item{
			box-sizing: border-box;
			width: 696upx;
			margin: 0 auto;
			background: #fff;
			padding: 20upx 27upx;
			margin-top: 25upx;
			.news-title{
				font-size: 28upx;
				font-weight: bold;
				color: #333;
				
			}
			.news-pic{
				width: 640upx;
				margin: 0 auto;
				border-radius: 8upx;
				overflow: hidden;
				background: #f5f5f5;
				margin-top: 20upx;
				.pic{
					display: block;
					width: 100%;
					height: 250upx;
				}
			}
			.news-desc{
				font-size: 24upx;
				color: #333;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				line-height: 60upx;
			}
			.news-date{
				font-size: 24upx;
				color: #848484;
				display: flex;
				justify-content: space-between;
				.view-num{
					position: relative;
					&:before{
						content:'';
						position: absolute;
						left: -30upx;
						top: 50%;
						transform: translateY(-50%);
						display: block;
						width: 20upx;
						height: 20upx;
						background: url(../../static/images/view.png) center center no-repeat;
						background-size: 20upx 20upx;
					}
				}
			}
		}
	}
</style>
