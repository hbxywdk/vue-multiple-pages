<template>
	<div class="example">
		<div class="w">
			{{ msg }}
		</div>
		
		<a href="/page2/page2.html">page2</a>
		<div class="bg"></div>
		<img src="../../assets/images/git.jpg" />
	</div>
</template>

<script>

import config from '../../config/config';
import axios from 'axios';

console.log('baseUrl in Vue', config.baseUrl)

export default {
	data () {
		return {
			msg: 'This is page one!'
		}
	},
	created () {
		console.log(axios)
	},
}
</script>

<style scoped lang="less">
@import '../../css/config.less';
.example {
	color: @colorRed;
	.w{
		font-size: 30px;
	}
}
.bg{
	width: 200px;
	height: 200px;
	background: url(../../assets/images/git.jpg);
	background-size: 100% 100%;
}
</style>
