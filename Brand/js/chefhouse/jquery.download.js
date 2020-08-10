jQuery.download = function(targetId, url, data, method){

	function escapeHtmlEntities (str) { 
		  if (jQuery !== undefined) { 
		    // Create an empty div to use as a container, 
		    // then put the raw text in and get the HTML 
		    // equivalent out. 
		    return jQuery('<div/>').text(str).html(); 
		  } 
		 
		  // No jQuery, so use string replace. 
		  return str 
		    .replace(/&/g, '&amp;') 
		    .replace(/>/g, '&gt;') 
		    .replace(/</g, '&lt;') 
		    .replace(/"/g, '&quot;')
		    ; 
		}
	
	//url and data options required
	if( url && data ){ 
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function(){ 
			var pair = this.split('=');
			inputs+='<input type="hidden" name="'
				+ decodeURIComponent(pair[0])
				    .replace(/&/g, '&amp;') 
				    .replace(/>/g, '&gt;') 
				    .replace(/</g, '&lt;') 
				    .replace(/"/g, '&quot;')
				+ '" value="'
				+ decodeURIComponent(pair[1])
					.replace(/&/g, '&amp;') 
					.replace(/>/g, '&gt;') 
					.replace(/</g, '&lt;') 
				    .replace(/"/g, '&quot;')
				+ '" />'; 
		});
		//send request
		if ($("#"+targetId).length == 0) {
			jQuery("<iframe id=\""+targetId+"\" name=\""+targetId+"\" src=\"\"></iframe>").appendTo('body');
		}
		jQuery('<form target=\"'+targetId+'\" action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
		.appendTo('body').submit().remove();
	};
};
