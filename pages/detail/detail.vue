<template>
	<view class="detail">
		<view class="detail-top">
			<view class="detail-title">
				{{ title }}
			</view>
			<view class="detail-info">
				<view class="info-item">
					发布时间: {{ formatDate }}
				</view>
				<view class="info-item">
					阅读: {{ onclick }}
				</view>
			</view>
		</view>
		<rich-text class="detail-content" :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				title:'',
				newstime:'',
				onclick:'',
				content:'',
				seotitle:'',
				keyboard:'',
				smalltext:'',
				titlepic:''
			}
		},
		computed:{
			formatDate(){
				var newDate = new Date(this.newstime*1000)
				return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.id = e.id;
			this.getDetail();
		},
		onShow() {
			// #ifdef MP-BAIDU
			let temp = setInterval(() => {
				if(this.seotitle){
					clearInterval(temp);
					swan.setPageInfo({
						title: this.seotitle + '-' + this.$mpName,
						keywords: this.keyboard,
						description: this.smalltext,
						image: this.titlepic,
						success: function() {
							console.log('setPageInfo success');
						},
						fail: function(err) {
							console.log('setPageInfo fail', err);
						}
					})
				}
			},300)
			// #endif
		},
		methods: {
			getDetail() {
				this.$uniRequest(
					`${this.$baseUrl}/newsDetail/`,
					{
						id: this.id
					},
					(res) => {
						let {
							data:{
								code,
								data:{
									newstext,
									title,
									seo_title,
									keyboard,
									newstime,
									onclick,
									smalltext,
									titlepic
								}
							}
						} = res;
						if(code == 1 && newstext) {
							let newContent = this.formatP(newstext);
							this.content = this.formatImg(newContent);
							this.title = title;
							this.newstime = newstime;
							this.onclick = onclick;
							this.seotitle = seo_title;
							this.keyboard = keyboard;
							this.smalltext = smalltext;
							this.titlepic = titlepic;
						}
						this.$nextTick(() => {
							uni.hideLoading()
						})
					}
				)
			},
			formatImg(html){
					var newContent= html.replace(/<img[^>]*>/gi,(match,capture) => {
					var match = match.replace(/style=\"(.*)\"/gi, '');
					return match;
				});
				newContent = newContent.replace(/\<img/gi, '<img style="max-width:'+uni.upx2px(690)+'px;height:auto;margin:'+uni.upx2px(20)+'px 0;"')
				return newContent;
			},
			formatP(html){
				var newContent = html.replace(/\\/gi,'')
				var newContent = newContent.replace(/\<p/gi,'<p class="paragraph"')
				//隐藏掉文章中的盒子
				var newContent = newContent.replace(/id="articleLittleBox"/gi,'id="articleLittleBox" style="display:none;"')
				return newContent;
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.title
			}
		}
	}
</script>

<style lang="less">
	.detail{
		box-sizing: border-box;
		padding: 0upx 30upx 120upx;
		overflow: hidden;
		padding-bottom: 120upx;
		border-top: 1px solid #eee;
		.paragraph{
			padding-bottom:20upx;
		}
	}
	.detail-content .content-pic{
		display: block;
		width: 98% !important;
		height: auto !important;
		margin: 0 auto;
	}
	.detail-top{
		padding: 20upx 0;
		border-bottom: 1px dashed #eee;
		margin-bottom: 20upx;
		.detail-title{
			padding: 10upx 0;
			font-size: 44upx;
			line-height: 54upx;
			color: #181818;
			font-weight: bold;
		}
		.detail-info{
			display: flex;
			margin-top: 10upx;
			.info-item{
				font-size: 24upx;
				color: #aaa;
				margin-right: 20upx;
			}
		}
	}
</style>
