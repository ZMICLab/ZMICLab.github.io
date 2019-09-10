
$(function () {
    console.log(navigator.userAgent)
    var slide_width
    var slide_height
    var tooltip_width
    var tooltip_height
    var time_item_width
    if (navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
        $('link[href="css/style.css"]').attr('href', 'css/style_mobile.css')
        $('img[src="res/logo_long.png"]').attr('width', '60%')
        var box = $('.slide-box')
        var table = box.parent().parent().parent()
        var text = box.parent().parent().children('td:first')
        var row = $('<tr></tr>')
        row.append($(text.html()))
        table.prepend(row)
        text.remove()
        slide_width = 900
        slide_height = 600
        tooltip_width = 320
        tooltip_height = 240
        time_item_width = 300
        $('.slide-box').css('margin', 'auto')
        $('.slide-box').css('width', slide_width)
        $('.slide-box').css('height', slide_height)
    }
    else {
        slide_width = 600
        slide_height = 400
        tooltip_width = 320
        tooltip_height = 180
        time_item_width = 210
    }
    
    var button_size = 44
    var duration = 5000
    var slide_anim_duration = 400
    var slide_images = []
    var image_margin = []
    var cur_image_id = 0
    $('.slide-box').children('img').each(function () {
//        w = $(this).width()
//        image_margin.push((slide_width - w) / 2)
        slide_images.push($(this).attr('src'))
        $(this).remove()
    })
    var table = $('<table cellpadding="0"><tbody><tr><td id="left-pane"></td><td id="right-pane"></td></tr></tbody></table>')
    var place1 = table.children('tbody').children('tr').children('#left-pane')
    var place2 = table.children('tbody').children('tr').children('#right-pane')
    var cur_image = $('<img src="' + slide_images[cur_image_id] + '" class="slide"/>')
    cur_image.css('width', slide_width)
    cur_image.css('height', slide_height)
//    cur_image.css('margin-left', image_margin[cur_image_id])
    place1.append(cur_image)
    $('.slide-box').append(table)
    var left_button = $('<a href="javascript:;"><img src="res/l-btn.png"/></a>')
    var right_button = $('<a href="javascript:;"><img src="res/r-btn.png"/></a>')
    left_button.css('float', 'left')
    right_button.css('float', 'right')
    left_button.css('position', 'relative')
    right_button.css('position', 'relative')
    left_button.css('top', - slide_height)
    right_button.css('top', - slide_height)
    left_button.css('left', 10)
    right_button.css('left', -10)
    left_button.css('margin', String((slide_height - button_size) / 2) + ' 0')
    right_button.css('margin', String((slide_height - button_size) / 2) + ' 0')
    $('.slide-box').append(left_button)
    $('.slide-box').append(right_button)
    $('.slide-box').hover(function () {
        left_button.fadeIn()
        right_button.fadeIn()
    }, function () {
        left_button.fadeOut()
        right_button.fadeOut()
    })
    left_button.hide()
    right_button.hide()
    move_prev = function () {
        cur_image.remove()
        table.css('margin-left', - slide_width)
        place2.append(cur_image)
        new_image_id = (cur_image_id + slide_images.length - 1) % slide_images.length
        var new_image = $('<img src="' + slide_images[new_image_id] + '" class="slide"/>')
        new_image.css('width', slide_width)
        new_image.css('height', slide_height)
//        new_image.css('margin-left', image_margin[new_image_id])
        place1.append(new_image)
        table.animate({'margin-left': 0}, slide_anim_duration, function() {
            cur_image.remove()
            cur_image = new_image
        })
        cur_image_id = new_image_id
    }
    move_next = function () {
        new_image_id = (cur_image_id + 1) % slide_images.length
        var new_image = $('<img src="' + slide_images[new_image_id] + '" class="slide"/>')
        new_image.css('width', slide_width)
        new_image.css('height', slide_height)
//        new_image.css('margin-left', image_margin[new_image_id])
        place2.append(new_image)
        table.animate({'margin-left': - slide_width}, slide_anim_duration, function() {
            cur_image.remove()
            cur_image = new_image
            cur_image.remove()
            table.css('margin-left', 0)
            place1.append(cur_image)
        })
        cur_image_id = new_image_id
    }
    left_button.click(move_prev)
    right_button.click(move_next)
    setInterval(move_next, duration)
    
    var U_count = 0
    var M_count = 0
    var D_count = 0
    var P_count = 0
    var G_count = 0
    for (i in members_list) {
        level = members_list[i]['level']
        if (level == 'U') U_count++
        else if (level == 'M') M_count++
        else if (level == 'D') D_count++
        else if (level == 'P') P_count++
        else if (level == 'G') G_count++
    }
    $('#U-count').text(U_count)
    $('#M-count').text(M_count)
    $('#D-count').text(D_count)
    $('#P-count').text(P_count)
    $('#G-count').text(G_count)
    $('#student-count').text(U_count + M_count + D_count + P_count + G_count)
    
    var loaded = []
    $('#loading').show()
    
    for (i in links_list) {
        var link = links_list[i]
        var offimage = $('<img id="' + i + '" />').attr('src', link['image'])
        offimage.on("load", function () {
            i = Number(this.id)
            var link = links_list[i]
            var image = $('<img src="' + this.src + '" style="border-radius: 20px"/>')
            if (this.height >= this.width) {
                image.attr('height', '100%')
                image.attr('width', 'auto')
            }
            else {
                image.attr('height', 'auto')
                image.attr('width', '100%')
            }
            var entry = $('<table id="' + i + '" cellpadding="20px"><tbody><tr><td id="left-pane"></td><td id="right-pane"></td></tr></tbody></table>')
            var pane1 = entry.children('tbody').children('tr').children('#left-pane')
            var pane2 = entry.children('tbody').children('tr').children('#right-pane')
            var entries = $('#links').children('table')
            if (entries.length == 0) $('#links').append(entry[0])
            else {
                for (j = 0; j < entries.length; ++j) {
                    child = entries[j]
                    id = Number(child.id)
                    if (id > i) {
                        if (j == 0) $('#links').prepend(entry[0])
                        else entries[j - 1].after(entry[0])
                        break
                    }
                }
                if (id <= i) {
                    $('#links').append(entry[0])
                }
            }
            var pane_img
            var pane_txt
            if (i % 2 == 0) {pane_img = pane1; pane_txt = pane2}
            else {pane_img = pane2; pane_txt = pane1}
            var bx = $('<div class="bounding-box"></div>')
            bx.append(image)
            pane_img.append(bx)
            pane_txt.append($('<h3> ' + link['name'] + ' </h3>'))
            pane_txt.append($('<p> ' + link['introduction'] + ' </p>'))
            pane_txt.append($('<a class="useful-links" href="' + link['url'] + '">' + link['name'] + ' &rarr;</a> '))
            loaded.push(i)
            if (loaded.length == links_list.length) {
                $('#loading').hide()
            }
        })
    }
    
    var axis = $('<div class="axis"></div>')
    axis.css('width', time_item_width * time_list.length + time_item_width / 2 + 15)
    $('#timeline').append(axis)
    var time_table = $('<table class="time-table"><tr></tr></table>')
    var tooltip_map = {}
    var labels_map = {}
    for (i in time_list) {
        var date = time_list[i]['date']
        var name = time_list[i]['name']
        var info = time_list[i]['info']
        if (info == undefined) {info = name}
        var upper
        var lower
        if (i % 2 == 0) {upper=date; lower=name}
        else {upper=name; lower=date}
        var entry = $('<td class="time-entry"></td>')
        var dot = $('<div class="dot"></div>')
        var label1 = $('<div class="label-wrapper"><p class="label">' + upper + '</p></div>')
        label1.children('p').css('vertical-align', 'bottom')
        var label2 = $('<div class="label-wrapper"><p class="label">' + lower + '</p></div>')
        label2.css('margin-top', 28)
        label2.children('p').css('vertical-align', 'top')
        var tooltip = $('<div class="tooltip-wrapper"><p class="tooltip">' + info + '</p></div>')
        entry.append(dot)
        entry.append(label1)
        entry.append(label2)
        entry.append(tooltip)
        tooltip.css('visibility', 'hidden')
        tooltip_map[entry.text()] = tooltip
        labels_map[entry.text()] = [label1, label2]
        entry.hover(function () {
            var key = $(this).text()
//            $('#timeline').children(':not(table)').css('opacity', 0.5)
            time_table.find('tr:first').children('td').each(function () {
                if ($(this).text().indexOf(tooltip_map[key].text()) > -1) return
                $(this).stop()
                $(this).animate({opacity: 0.5})
            })
            tooltip_map[key].css('visibility', '')
            tooltip_map[key].stop()
            tooltip_map[key].animate({height: tooltip_height, width: tooltip_width, 'margin-left': 20, 'margin-right': 20, 'margin-top': - tooltip_height / 2 - 120, opacity: 1})
            for (i in labels_map[key]) {
                labels_map[key][i].stop()
                labels_map[key][i].animate({opacity: 0}, function () {
                    $(this).css('visibility', 'hidden')
                })
            }
        }, function () {
            var key = $(this).text()
            for (i in labels_map[key]) {
                labels_map[key][i].stop()
                labels_map[key][i].css('visibility', '')
                labels_map[key][i].animate({opacity: 1})
            }
            tooltip_map[key].stop()
            tooltip_map[key].animate({height: 0, width: 0, 'margin-left': 145, 'margin-right': 0, 'margin-top': -120, opacity: 0}, function () {$(this).css('visibility', 'hidden')})
            $('#timeline').children(':not(table)').css('opacity', 1)
            time_table.find('tr:first').children('td').each(function () {
                $(this).stop()
                $(this).animate({opacity: 1})
            })
        })
        time_table.find('tr').append(entry)
    }
    $('#timeline').append(time_table)
    
//    bubble = function (radius) {
//        return $('<div class="bubble" style="--radius: ' + String(radius) + 'px; --padding: ' + String(0.4 * radius) + 'px; position: absolute; width: calc(2 * (var(--radius) - var(--padding))); height: calc(2 * (var(--radius) - var(--padding))); border-radius: var(--radius);"><div class="bubble-light" style="width: 60%; height: 60%; border-radius: 60%;"></div></div>')
//    }
//    var baseline = -100
//    setInterval(function () {
//        radius = Math.random() * 20 + 10
//        x = $('#page').width() * Math.random()
//        y = baseline + Math.random() * 150
//        var new_bubble = bubble(0)
//        new_bubble.css('margin-top', y)
//        new_bubble.css('margin-left', x)
//        $('#main-title').append(new_bubble)
//        new_bubble.animate({
//            'width': 1.2 * radius, 'height': 1.2 * radius, 
//            'margin-top': y - radius, 'margin-left': x - radius, 
//            'border-radius': radius, 'padding': 0.4 * radius
//        }, 1000, 'linear', function () {
//            setTimeout(function () {
//                new_bubble.fadeOut(200)
//            }, 800)
//            new_bubble.animate({'margin-top': baseline - radius}, (y - baseline) * 8, function () {
//                new_bubble.fadeOut(200)
//            })
//        })
//    }, 100)
})