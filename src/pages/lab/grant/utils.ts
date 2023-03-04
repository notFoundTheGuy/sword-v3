// @ts-nocheck
const NAME_SPACE = 'http://www.w3.org/2000/svg';
const XLINK_NAME_SPACE = 'http://www.w3.org/2000/xlink';
import { ROW_HEIGHT, COLUMN_WIDTH } from './const';

/*
 * tag：所要创建的标签名称
 * attrs: 所需要添加的属性，｛key:val,key:val｝
 */
export function makeSVGElement(tag, attrs) {
	const ns = NAME_SPACE;
	const xlinkns = XLINK_NAME_SPACE;

	let el = document.createElementNS(ns, tag);
	if (tag === 'svg') {
		el.setAttribute('xmlns:xlink', xlinkns);
	}
	for (let k in attrs) {
		if (k === 'xlink:href') {
			el.setAttributeNS(xlinkns, k, attrs[k]);
		} else {
			el.setAttribute(k, attrs[k]);
		}
	}
	return el;
}

// YYYYMMDD -> Date 秒数据
export function getDateFromDateStr(dateString) {
	dateString = dateString + '';
	const year = parseInt(dateString.slice(0, 4));
	const month = parseInt(dateString.slice(4, 6)) - 1;
	const days = parseInt(dateString.slice(6));
	const date = new Date(year, month, days);
	return {
		date,
		time: parseInt(date.getTime() / 1000),
	};
}

// 根据所给数据，计算出边界
export function clacBoundary(nodes) {
	const timeArr = [];
	nodes.forEach((item) => {
		timeArr.push(
			getDateFromDateStr(item.start).time,
			getDateFromDateStr(item.end).time
		);
	});

	const startTime = Math.min(...timeArr);
	const endTime = Math.max(...timeArr);

	const timeDistance = (endTime - startTime) / (60 * 60 * 24);
	const right = timeDistance * COLUMN_WIDTH;
	const bottom = nodes.length * ROW_HEIGHT;

	return {
		top: 0,
		left: 0,
		right,
		bottom,
		startTime,
		endTime,
	};
}
