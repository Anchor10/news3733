import Vue from 'vue'
import App from './App'
import urlRequest from './common/request.js'

Vue.config.productionTip = false

Vue.prototype.$mpName = '3733游戏资讯'

Vue.prototype.$baseUrl = 'https://www.3733.com/applet';
Vue.prototype.$uniRequest = function(url, param,func) {
			urlRequest(url,param,func)
		}
Vue.prototype.$formatDate = (data) => {
				//日期格式化
				var prefix_zero = (num)=> {
					return num >= 10 ? num : "0" + num;
				}
				var date =  new Date(data * 1000);
				return date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ prefix_zero(date.getHours()) +':'+ prefix_zero(date.getMinutes())
			}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
