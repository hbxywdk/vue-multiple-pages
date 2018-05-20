<template>
	<div class="example">
		<div class="w">
			{{ msg }}
		</div>
		
		<a href="/page1/page1.html">page2</a>
	</div>
</template>

<script>

import config from '../../config/config';
import axios from 'axios';

console.log('baseUrl in Vue', config.baseUrl)

export default {
	data () {
		return {
			msg: 'This is page two!'
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
</style>
