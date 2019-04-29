
$(function () {
	var curlevel = 'P'
	var isthefirst = true
	var listtable = $('<table cellpadding="10px" width="100%"><tbody></tbody></table>')
	$('#students_list').append(listtable)
	var listctrl = listtable.children('tbody')
	for (i in members_list) {
		student = members_list[i]
		if (student['level'] != curlevel) {
			listctrl.append($('<tr><td colspan="2"><hr style="margin: 0;"></td></tr>')); 
			curlevel = student['level']
			isthefirst = true
		}
		var entry = $('<tr><td id="left-pane"></td><td id="right-pane"></td></tr>')
		var pane1 = entry.children('#left-pane')
		var pane2 = entry.children('#right-pane')
		if (!isthefirst) {
			pane1.css('border-top', 'solid 1px #AAAAAA')
			pane2.css('border-top', 'solid 1px #AAAAAA')
		}
		photourl = 'files/photos_members/' + student['photo']
		var exists
		$.ajax(photourl, {type: 'get', async:false, timeout: 1000,
			success: function() {exists = true},
			error: function() {exists = false}
		});
		if (!exists) photourl = 'files/photo_members/default.jpg';
		pane1.append($('<img src="' + photourl + '" height="160px" style="border-radius: 50px"/>'))
		pane1.attr('align', 'center')
		pane2.append($('<h3>' + student['name'] + '</h3>'))
		pane2.append($('<p>' + student['introduction'] + '</p>'))
		if (student['homepage'] != '')
			pane2.append($('<a class="useful-links" href="' + student['homepage'] + '">This is my homepage &rarr;</a> '))
		listctrl.append(entry)
		isthefirst = false
	}
})