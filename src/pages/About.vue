<template>
	<section>
		<div class="main-content" ref="mainContent">
			<article>
				<div>
					<h1 class="ttile">关于站点</h1>
					<div>
						接触编程的那天起就想着搭建自己的一个小破站，一直未找到合适的方向便作罢。工作了一段时间后发现，时间真的过的好快啊，积累和记录真是一件特别重要的事，于是搭建了这样一个网站，用于记录自己学习、工作中遇到的一些问题以及想法，我一直深信积跬步才能至千里，每一个微不足道的小事，都可能成为引起飓风的蝴蝶翅膀。
					</div>
					<div>文章大多是自己的总结和想法，也包含一些转载的好文。如有纰漏，欢迎指正！感谢 🙏</div>
				</div>

				<div>
					<h1 class="ttile">关于我</h1>
					<div>
						优雅，永不过时。很喜欢的一句话（虽然出自一个游戏角色，但我觉得用来形容编码特别合适😯）。我把编码当作是一个极具有艺术性的工作，喜欢那种设计的感觉。写出了一份优雅、设计精美的代码，是一件多酷多幸福的事啊。
					</div>
					<div>
						最后，内向慢热型coder，但是喜欢滑板🛹，喜欢吉他🎸（虽然五音不全，不会唱歌），也想学钢琴，看烧脑片儿，喜欢探索新东西新事物。难得捡到一张人类几十年的体验卡，怎么好意思辜负呢哈哈哈哈！
					</div>
					<div>最后最后，欢迎各路朋友来撩：</div>
					<div class="img-wrap">
						<img src="@/assets/imgs/qrcode-wx.jpeg" alt="wx" />
					</div>
				</div>
			</article>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
	name: 'About',
	setup(props, context) {},
});
</script>

<style lang="less" scoped>
.main-content {
    > article {
        margin: 0 auto;
        max-width: 1024px;
        > div {
            margin-bottom: 50px;
            font-size: 18px;
            line-height: 1.8;
            > div {
                text-indent: 2em;
                margin-bottom: 10px;
            }
        }
    
        .img-wrap {
            display: flex;
            margin-left: 2em;
            img {
                height: 300px;
            }
        }
    }
}
</style>
