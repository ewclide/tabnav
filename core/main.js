import { Navigator } from './navigator';

$.fn.tabNav = function(options)
{
	this.each(function(){
		this._navigator = new Navigator($(this));
	});
}

$(document).ready(function(){
	$('[data-tabnav]').tabNav();
});