/*
simple-ass tab cloaker inspired by the one on 3kh0.github.io
made with ¬ᴗ¬ (and inspiration from 3kh0.github.io) by Ultracat39
to set this stuff, go to woahgorilla.github.io/settings.html
*/
const ls = window.localStorage
var icon = ls.getItem('!INTERNAL!icon')
var title = ls.getItem('!INTERNAL!title')
if (icon) {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
link.href = icon;
}
if (title) {
  console.log(title)
  document.title = title
}
console.log('tab cloaker made with ¬ᴗ¬ by Ultracat39')
/*
cloaker is MIT licensed
license at https://woahgorilla.github.io/play/extras/cloaker-license.txt
*/