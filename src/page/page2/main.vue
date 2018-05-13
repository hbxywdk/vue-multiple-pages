<template>
	<div class="example">
		<div class="w">
			{{ msg }}
		</div>
		<a href="/page1/page1.html">page1</a>
	</div>
</template>

<script>
export default {
	data () {
		return {
			msg: 'Hi~!'
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
