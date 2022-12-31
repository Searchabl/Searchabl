function unselectall() {
    document.getElementById('image1').classList.remove('selected');
    document.getElementById('image2').classList.remove('selected');
    document.getElementById('image3').classList.remove('selected');
    document.getElementById('image4').classList.remove('selected');
}

function process_bookmark(bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
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
            var img = document.createElement('img');
            img.src = 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' + encodeURIComponent(bookmark.url) + '&size=512';
            var urlContainer = document.createElement('div');
            url.classList.add('url');
            url.innerText = bookmark.url;
            urlp.appendChild(url);
            ael.appendChild(img);
            urlContainer.appendChild(titlep);
            urlContainer.appendChild(urlp);
            urlContainer.classList.add('urlcontainer');
            ael.appendChild(urlContainer);
            ael.href = bookmark.url;
            el.appendChild(ael);
            ul.appendChild(el);
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
    var results = 0;
    input.oninput = function () {
        results = 0;
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

    document.getElementById('image1').onclick = function () {
        unselectall();
        document.getElementById('image1').classList.add('selected');
        document.querySelector('html').style.backgroundImage = 'url("wallpaper.jpg")';
        chrome.storage.sync.set({
            "background": 1
        });
    }
    document.getElementById('image2').onclick = function () {
        unselectall();
        document.getElementById('image2').classList.add('selected');
        document.querySelector('html').style.backgroundImage = 'url("beach.jpg")';
        chrome.storage.sync.set({
            "background": 2
        });
    }
    document.getElementById('image3').onclick = function () {
        unselectall();
        document.getElementById('image3').classList.add('selected');
        document.querySelector('html').style.backgroundImage = 'url("bridge.jpg")';
        chrome.storage.sync.set({
            "background": 3
        });
    }
    document.getElementById('image4').onclick = function () {
        unselectall();
        document.getElementById('image4').classList.add('selected');
        document.querySelector('html').style.backgroundImage = 'url("river.jpg")';
        chrome.storage.sync.set({
            "background": 4
        });
    }
    document.getElementById('settingsbtn').onclick = function () {
        document.getElementById('settingsModal').style.display = 'block';
        document.getElementById('settingsBackdrop').style.display = 'block';
    }
    document.getElementById('reset').onclick = function () {
        chrome.storage.sync.clear();
        window.location.reload();
    }
    document.getElementById('closebtn').onclick = function () {
        document.getElementById('settingsModal').style.display = 'none';
        document.getElementById('settingsBackdrop').style.display = 'none';
    }
    document.getElementById('settingsBackdrop').onclick = function () {
        document.getElementById('settingsModal').style.display = 'none';
        document.getElementById('settingsBackdrop').style.display = 'none';
    }
}
chrome.storage.sync.get('background', function (obj) {
    if (obj.background == 1) {
        document.querySelector('html').style.backgroundImage = 'url("wallpaper.jpg")';
        unselectall();
        document.getElementById('image1').classList.add('selected');
    } else if (obj.background == 2) {
        document.querySelector('html').style.backgroundImage = 'url("beach.jpg")';
        unselectall();
        document.getElementById('image2').classList.add('selected');
    } else if (obj.background == 3) {
        document.querySelector('html').style.backgroundImage = 'url("bridge.jpg")';
        unselectall();
        document.getElementById('image3').classList.add('selected');
    } else if (obj.background == 4) {
        document.querySelector('html').style.backgroundImage = 'url("river.jpg")';
        unselectall();
        document.getElementById('image4').classList.add('selected');
    } else {
        console.warn('Background ' + obj.background + ' does not exist! Setting to 1');
        document.querySelector('html').style.backgroundImage = 'url("wallpaper.jpg")';
        chrome.storage.sync.set({
            "background": 1
        });
        document.getElementById('image1').classList.add('selected');
    }
});
