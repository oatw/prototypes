var TF=window.TF || {};
TF.noInlineSvg=(function(){
	var buildPolyfill=function(svgName){
		// return '<div class="svgWrapper"><svg><image xlink:href="../img/'+svgName+'.svg" src="../img/'+svgName+'.png"/></svg></div>';
		return '<div class="svgWrapper"><svg><image xlink:href="'+TF.imgServer+'/'+svgName+'.svg" src="'+TF.imgServer+'/'+svgName+'.png"/></svg></div>';
	},
	fillTypeface=function(){
		var $imgFill=$('.svgAni:not(.filled)');
		$imgFill.each(function(){
			var $this=$(this),
				typeface=$this.find('.fontName').text();
			$this.append(buildPolyfill(typeface));	
			$this.find('.fill,.stroke,.smallText').remove();
			$this.addClass('filled');
		});
		$('.sprite').remove();

	};
	return fillTypeface;
})();
alert('"no-inlinesvg.js" executed');