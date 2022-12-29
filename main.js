function submitForm() {
    if (document.getElementById('query').value.trim() !== '') {
        window.location.replace('https://www.google.com/search?q=' + encodeURIComponent(document.getElementById('query').value));
    }
}
function process_bookmark(bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            console.log("bookmark: " + bookmark.title + " ~ " + bookmark.url);
            var ul = document.getElementById('searchlist');
            var el = document.createElement('li')
            var ael = document.createElement('a');
            ael.href = bookmark.url;
            ael.innerText = bookmark.title;
            el.appendChild(ael);
            ul.appendChild(el);
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}


window.onload = function () {
    document.getElementById('form').onsubmit = function(e) {
        e.preventDefault();
        submitForm();
    }
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
