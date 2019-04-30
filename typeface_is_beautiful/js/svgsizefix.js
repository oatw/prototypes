var TF=window.TF || {};
TF.svgSizeFix=function($slider){
	var $svgAni=$slider.find('.svgAni'),
		$svg=$svgAni.find('svg'),
		svgHeight=$svgAni.height() || $svgAni.innerHeight();
	$svg.css('height', svgHeight);	
};

alert('"svgsizefix.js" execueted');