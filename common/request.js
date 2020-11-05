// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数
	function urlRequest(url,param, func) {
		let baseParam = {
				uuid:'0B817AD8-7B4B-476B-A40A-F34534CFA17D',
				from:999
			};
			//没有额外参数的话传0
			if(param != 0){
				var paramObj = {params:JSON.stringify(param)};
				var realParam =Object.assign(param,baseParam);
			}else{
				var realParam = baseParam;
			}
		uni.request({
			url: url,
			data: realParam,
			method: 'POST',
			success: res=>{
				func(res);
			},
			fail:err=>{
				uni.showToast({
					title: '网络请求错误,请重试',
					icon:'none',
					duration: 3000
				});
			},
			complete:()=>{
			}
		});
 
 
	}
 
export default urlRequest
