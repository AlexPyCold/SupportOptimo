Папка 'dist' - это исходные, подготовленныe файлы для добавления на FTP
--- Файлы, которых нет на FTP
------ 1) JS/vue.js [для работы с шаблонами vue.js]
--------- В index.html CDN для подключения VUE.JS
------ 2) CSS/style.min.css
--------- На FTP есть style.css надо обновить на style.min.css [минифицированы основные стили]
------ 2) img
--------- Надо обновить содержимое папки [добавлены новые изображения]
--------- Возможно, надо менять пути до файлов в index.html, тут тубе виднее будет
!!! Картинка в блоке intro задается background ом в style.min.css для .wrap в .intro

Все, что за пределами папки dist - это исходники исходников ( исходник SCSS хотел тоже добавить в исходники для FTP, но там использовали SASS ))

Если что, можно открыть index.html вне папки dist, там все корректно отображается
