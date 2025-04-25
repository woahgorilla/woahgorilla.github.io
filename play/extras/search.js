function startSearch() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("search");
  if (input.value) {document.getElementById("topbar").style.display = "none";}
  else {document.getElementById("topbar").style.display = "flex"}
  filter = input.value.toUpperCase();
  ul = document.getElementById("search-target");
  li = ul.getElementsByTagName("a");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h1")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
}
