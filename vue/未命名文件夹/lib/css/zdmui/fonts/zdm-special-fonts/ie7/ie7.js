/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'zdm-special-fonts\'">' + entity + '</span>' + html;
	}
	var icons = {
		'z-fonts-zero': '&#x30;',
		'z-fonts-nine': '&#x39;',
		'z-fonts-eight': '&#x38;',
		'z-fonts-seven': '&#x37;',
		'z-fonts-six': '&#x36;',
		'z-fonts-five': '&#x35;',
		'z-fonts-four': '&#x34;',
		'z-fonts-three': '&#x33;',
		'z-fonts-two': '&#x32;',
		'z-fonts-one': '&#x31;',
		'z-fonts-t': '&#x74;',
		'z-fonts-n': '&#x6e;',
		'z-fonts-i': '&#x69;',
		'z-fonts-o': '&#x6f;',
		'z-fonts-p': '&#x50;',
		'z-fonts-colon': '&#xff1a;',
		'z-fonts-tiao': '&#x6761;',
		'z-fonts-tou': '&#x5934;',
		'z-fonts-zhi': '&#x503c;',
		'z-fonts-hao': '&#x597d;',
		'z-fonts-jia': '&#x4ef7;',
		'z-fonts-wen': '&#x6587;',
		'z-fonts-wu': '&#x7269;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/z-fonts-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
