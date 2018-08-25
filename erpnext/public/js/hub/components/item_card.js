function get_item_card_html(item) {
	if (item.recent_message) {
		return get_item_message_card_html(item);
	}

	const item_name = item.item_name || item.name;
	const title = strip_html(item_name);
	const img_url = item.image;
	const company_name = item.company;

	// Subtitle
	let subtitle = [comment_when(item.creation)];
	const rating = item.average_rating;

	if (rating > 0) {
		subtitle.push(rating + `<i class='fa fa-fw fa-star-o'></i>`)
	}

	subtitle.push(company_name);

	let dot_spacer = '<span aria-hidden="true"> · </span>';
	subtitle = subtitle.join(dot_spacer);

	// route
	if (!item.route) {
		item.route = `marketplace/item/${item.hub_item_code}`
	}

	const item_html = `
		<div class="col-md-3 col-sm-4 col-xs-6 hub-card-container">
			<div class="hub-card"
				data-hub-item-code="${item.hub_item_code}"
				data-route="${item.route}">

				<div class="hub-card-header level">
					<div class="ellipsis">
						<div class="hub-card-title ellipsis bold">${title}</div>
						<div class="hub-card-subtitle ellipsis text-muted">${subtitle}</div>
					</div>
					<i class="octicon octicon-x text-extra-muted"
						data-hub-item-code="${item.hub_item_code}">
					</i>
				</div>
				<div class="hub-card-body">
					<img class="hub-card-image" src="${img_url}" />
					<div class="overlay hub-card-overlay"></div>
				</div>
			</div>
		</div>
	`;

	return item_html;
}

function get_item_message_card_html(item) {
	const item_name = item.item_name || item.name;
	const title = strip_html(item_name);

	const message = item.recent_message
	const sender = message.sender === frappe.session.user ? 'You' : message.sender
	const content = strip_html(message.content)

	// route
	if (!item.route) {
		item.route = `marketplace/item/${item.hub_item_code}`
	}


	const item_html = `
		<div class="item-message-card" data-route="${item.route}">
			<img class="item-image" src='${item.image}'>
			<div class="message-body">
				<span class='text-muted'>${comment_when(message.creation, true)}</span>
				<span class="bold">${item_name}</span>
				<div class='ellipsis'>
					<span>${sender}: </span>
					<span>${content}</span>
				</div>
			</div>
		</div>
	`;

	return item_html;
}

export {
	get_item_card_html
}