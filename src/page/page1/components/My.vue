<template>
	<div class="example">
		<div class="w">
			{{ msg }}
		</div>
		<p class="fz40">
			<a href="/page2/page2.html">click here to page2</a>
		</p>
		<p class="fz40">
			<router-link to="/">Go to #index route</router-link>
		</p>
		
		<div class="bg"></div>
		<img class="img" src="../../../assets/images/git.jpg" />
	</div>
</template>

<script>

import config from '../../../config/config';
import axios from 'axios';

console.log('baseUrl in Vue', config.baseUrl)

export default {
	name: 'my',
	data () {
		return {
			msg: 'This is my route page!'
		}
	},
	created () {
		console.log(axios)
	},
}
</script>

<style scoped lang="less">
@import '../../../css/config.less';
.fz40{
	font-size: 40px;
}
.example {
	color: @colorRed;
	.w{
		font-size: 30px;
	}
	.img{
		width: 1000px;
	}
}
.bg{
	width: 200px;
	height: 200px;
	background: url(../../../assets/images/git.jpg);
	background-size: 100% 100%;
}
</style>
