<template>
	<div class="example">
		<div class="w">
			{{ msg }}
		</div>
		<p class="fz40">
			<a href="/page1/page1.html">click here to page1</a>
		</p>
		<p class="fz40">
			<router-link to="/my">Go to #my route</router-link>
		</p>

		<div class="bg"></div>
	</div>
</template>

<script>

import config from '../../../config/config';
import axios from 'axios';

console.log('baseUrl in Vue', config.baseUrl)

export default {
	name: 'index',
	data () {
		return {
			msg: 'This is index route page!'
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
}
.bg{
	width: 200px;
	height: 200px;
	background: url(../../../assets/images/git.jpg);
	background-size: 100% 100%;
}
</style>
