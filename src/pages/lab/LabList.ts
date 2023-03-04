export default [
	{
		name: 'canvas',
		children: [
			{
				name: '画板',
				route: '/lab/painter',
			},
			{
				name: '抽奖',
				route: '/lab/lottery',
			},
		],
	},
	{
		name: 'svg',
		children: [
			{
				name: '甘特图',
				route: '/lab/grant',
			},
		],
	},
	{
		name: '音视频',
		children: [
			{
				name: '音视频录制',
				route: '/lab/recorder',
			},
		],
	},
	{
		name: 'css特效',
		// children: [
		// 	{
		// 		name: 'Loadings',
		// 		route: '/lab/css/loading',
		// 	},
		// 	{
		// 		name: '按钮',
		// 		route: '/lab/css/button',
		// 	},
		// ],
	},
];
