
$(function() {
	var duration = 400
	var quickduration = 150
	var preplaceholder = $('<div class="header-button-selector" style="opacity: 0; height: 24px;"></div>')
	var selector = $('<div class="header-button-selector selector" hidden="true"></div>')
	$('.header-button').parent().attr('valign', 'top')
	$('.header-button').parent().prepend(preplaceholder)
	$('.header-button').parent().append(selector)
	$('.header-button').hover(function () {
		if ($(this).text() == cur_tab) return
		var selector = $(this).parent().children('.selector')
		if (0 < selector.css('opacity') < 1) return
		selector.fadeIn(duration)
	}, function () {
		if ($(this).text() == cur_tab) return
		$(this).parent().children('.selector').fadeOut(duration)
	})
	var autoscroll = false
	var cur_tab = 'Home'
	var tab_items = {}
	var goto_y = {}
	var tab_names = []
	$('.header-button').each(function () {
		tab_items[$(this).text()] = $(this)
		goto_y[$(this).text()] = $('#goto-' + $(this).text()).offset().top
		tab_names.push($(this).text())
		if ($(this).text() == cur_tab) {
			$(this).parent().children('.selector').show()
		}
	})
	$('.header-button').click(function () {
		if ($(this).text() != cur_tab) {
			tab_items[cur_tab].parent().children('.selector').fadeOut(duration)
			cur_tab = $(this).text()
		}
		autoscroll = true
		$('html, body').animate({scrollTop: $('#goto-' + cur_tab).offset().top}, 300, function () {
			autoscroll = false
		});
	})
	$('#ZMIC').click(function () {
		tab_items['Students'].click()
	})
	
	$(window).scroll(function () {
		if (autoscroll) return
		for (var i = 0; i < tab_names.length; i++) {
			name = tab_names[i]
			if ($(this).scrollTop() < goto_y[name]) {
				if (i == 0) i++
				break
			}
		}
		name = tab_names[i - 1]
		if (name != cur_tab) {
			tab_items[cur_tab].parent().children('.selector').fadeOut(quickduration)
			cur_tab = name
			tab_items[cur_tab].parent().children('.selector').fadeIn(quickduration)
		}
	})
	$(window).scroll()
	
	var name_list = []
	var urls = {}
	$('.students').children('a').each(function () {
		name_list.push($(this).text())
		urls[$(this).text()] = $(this).attr('href')
	})
	var placed = []
	var table = $('<table width="80%" style="margin: 0 10%;" cellpadding="0"></table>')
	var rows = {}
	var nrow = 0
	var ncol = 0
	$('.students').parent().append(table)
	$('.students').hide()
	for (i in name_list) {
		var name = name_list[i]
		if (name == '') {ncol += 1; nrow = 0; continue}
		if (!(nrow in rows)) {
			rows[nrow] = $('<tr></tr>')
			for (var c = 0; c < ncol; c++) {
				if (c > 0) rows[nrow].append($('<td class="left-bar"></td>'))
				else rows[nrow].append($('<td></td>'))
			}
		}
		var url
		if (urls[name] != '') url = urls[name]
		else url = 'javascript:;'
		if (ncol > 0) rows[nrow].append($('<td class="left-bar"><a href="' + url + '">' + name + '</a></td>'))
		else rows[nrow].append($('<td><a href="' + url + '">' + name + '</a></td>'))
		nrow += 1
	}
	for (r in rows) {
		for (var c = rows[r].children().length; c <= ncol; c++) {
			rows[r].append($('<td class="left-bar"></td>'))
		}
	}
	for (r in rows) {
		table.append(rows[r])
	}
	
	$('table').each(function () {
		if ($(this).attr('cellpadding')) return
		else $(this).attr('cellpadding', '10px')
	})
})
