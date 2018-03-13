export class Tab
{
	constructor(options)
	{
		var self = this;

		this.$element = options.$element;
		this.active = options.active || false;
		this.number = options.number;
		this.title = options.$element.attr("data-title") || "Tab title - " + options.number;
		this.onClick = options.onClick;

		this.$button = $("<a class='button'>" + this.title + "</a>");
		options.container.append(this.$button);

		this.$button.click(function(){
			if (!self.active) self.onClick(self.number);
		});
	}

	show()
	{
		this.$element.show();
		this.active = true;
		this.$button.addClass("active");
	}

	hide()
	{
		this.$element.hide();
		this.active = false;
		this.$button.removeClass("active");
	}
}