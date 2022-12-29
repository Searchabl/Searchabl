function process_bookmark(bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            console.log("bookmark: " + bookmark.title + " ~ " + bookmark.url);
            var ul = document.getElementById('searchlist');
            var el = document.createElement('li')
            el.classList.add('item');
            var ael = document.createElement('a');
            ael.classList.add('itemlink');
            var titlep = document.createElement('p');
            var title = document.createElement('b');
            titlep.appendChild(title);
            title.classList.add('title');
            title.innerText = bookmark.title;
            var urlp = document.createElement('p');
            var url = document.createElement('small');
            url.classList.add('url');
            url.innerText = bookmark.url;
            urlp.appendChild(url);
            ael.appendChild(titlep);
            ael.appendChild(urlp);
            ael.href = bookmark.url;
            el.appendChild(ael);
            ul.appendChild(el);
            /*<li class="item">
            <a href="#" class="itemlink">
                <p><b class="title">Test</b></p>
                <p><small class="url">Test</small></p>
            </a>
        </li>*/
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}


window.onload = function () {
    function formatAMPM(date) {
        var hours = date.getHours();
        var greeting = '';
        var minutes = date.getMinutes();
        if ((hours < 6) || (hours > 19)) {
            greeting = 'Good night!';
        } else if (hours < 12) {
            greeting = 'Good morning!';
        } else if (hours < 19) {
            greeting = 'Good afternoon!';
        }
        document.getElementById('greeting').innerHTML = greeting;
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    document.getElementById('clock').innerText = formatAMPM(new Date)
    setInterval(function () {
        document.getElementById('clock').innerText = formatAMPM(new Date);
    }, 1000);




    chrome.bookmarks.getTree(process_bookmark);
    var input = document.getElementById('searchinput');
    var ul = document.getElementById('searchlist');
    input.oninput = function () {
        var filter = input.value.toUpperCase();
        var li = ul.getElementsByTagName('li');
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('a')[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }
    }
}
