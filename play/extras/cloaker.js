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