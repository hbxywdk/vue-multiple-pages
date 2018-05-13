<template>
	<div class="example">
		<div class="w">
			{{ msg }}
		</div>
		<a href="/page2/page2.html">page2</a>
	</div>
</template>

<script>
export default {
	data () {
		return {
			msg: 'Hello world!'
		}
	}
}
</script>

<style scoped lang="less">
.example {
	color: red;
	.w{
		font-size: 30px;
	}
}
</style>
