
$(function () {
	var level = {'T': 'Faculty', 'U': 'Undergrad', 'M': 'Master student', 'D': 'PhD student', 'P': 'Post doc', 'A': 'Alumni', 'G': 'Guest', 'V': 'Visiting'}
	var postfix = {'P': 's', 'A': '', 'G': ' students', 'V': ' students', 'U': 's'}
	var horlist = ['A']
	var curlevel = 'T'
	var curentry = null
	var isthefirst = true
	var listtable = $('<table cellpadding="10px" width="100%"><tbody></tbody></table>')
	$('#members_list').append(listtable)
	var listctrl = listtable.children('tbody')
	for (i in members_list) {
		student = members_list[i]
		if (student['level'] != curlevel) {
			curlevel = student['level']
			listctrl.append($('<tr><td colspan="2"><hr style="margin: 0;"></td></tr>'))
			if (horlist.indexOf(curlevel) >= 0) {
				listctrl.append($('<tr><td colspan="2"><h3 style="text-align: center">' + level[curlevel] + (postfix[curlevel] == undefined ? '' : postfix[curlevel]) + '</h3></td></tr>'))
				curentry = $('<tr><td colspan="2"><table style="width: 100%; table-layout: fixed; text-align: center"><tbody><tr></tr></tbody></table></td></tr>')
				listctrl.append(curentry)
			}
			isthefirst = true
		} 
		var entry = $('<tr><td id="left-pane"></td><td id="right-pane"></td></tr>')
		var pane1 = entry.children('#left-pane')
		var pane2 = entry.children('#right-pane')
		if (!isthefirst) {
			pane1.css('border-top', 'solid 1px #AAAAAA')
			pane2.css('border-top', 'solid 1px #AAAAAA')
		}
		photourl = 'files/photos_members/' + (student['photo'] == '' ? 'default.jpg' : student['photo'])
		pane1.append($('<img src="' + photourl + '" height="100px" style="border-radius: 50px"/>'))
		pane1.attr('align', 'center')
		
		if (student['homepage'] != '')
			pane2.append($('<h3>' + '<a class="useful-links" href="' + student['homepage'] + '">' + student['name'] + ' &rarr; ' +  '</a> &nbsp&nbsp' + ' <span class="tag">' + level[student['level']] + ' ' + student['year'] + '</span></h3>')) 
		else 
			pane2.append($('<h3>' + '<a class="useful-links" href="' + student['homepage'] + '">' + student['name'] +  '</a> &nbsp&nbsp' + ' <span class="tag">' + level[student['level']] + ' ' + student['year'] +'</span></h3>')) 
		pane2.append('<p>' + student['introduction'] + '</p>') 
		listctrl.append(entry)
		isthefirst = false
	}
})