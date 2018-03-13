import { Tab } from './tab';

export class Navigator
{
	constructor($source)
	{
		this.$source = $source;
		this.list = [];
		this.active = 0;
		this._create()
	}

	_create()
	{
		var self = this,
			count = 0,
			active = parseInt(this.$source.attr("data-active")) || 0,
			list = this.$source.find(">div");

		this.$source.addClass("tabnav-wrapper");
		this.$buttonCont = $("<div class='button-wrapper'></div>");
		this.$tabsCont = $("<div class='tabs-wrapper'></div>");
		this.$source.prepend(this.$buttonCont);
		this.$source.append(this.$tabsCont.append(list));

		list.each(function(){

			var $element = $(this),
				num = count++,
				activeSelf = $element.attr("data-active");

			activeSelf && !active ? (active = num, activeSelf = true) : activeSelf = false;

			var tab = new Tab({
				$element  : $(this),
				container : self.$buttonCont,
				active    : activeSelf,
				number    : num,
				onClick   : function(index)
				{
					self.show(index);
				}
			});

			self.list.push(tab);

		});

		this.show(active);
	}

	show(index)
	{
		this._hideAll();
		this.list[index].show();
		this.active = index;
	}

	_hideAll()
	{
		this.list.forEach(function(item){
			item.hide();
		});
	}
}