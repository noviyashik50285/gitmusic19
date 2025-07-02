function openCity(evt, cityName) {
var i, tabcontent, tablinks;

tabcontent = document.getElementsByClassName("tabcontent");
for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
}

// Получить все элементы с помощью class="tablinks" и удалить класс "active"
tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
}

// Показать текущую вкладку и добавить класс "active" на ссылку, открывшую вкладку
document.getElementById(cityName).style.display = "block";
evt.currentTarget.className += " active";
}
