### Реализованная функциональность
* Распознавание гречки и перца с выделением мест появления перца.
* Распознавание номеров нанесенных на тару.
* Отображение информации о текущих разгрузках сырья с возможностью автоматического принятия решения приемке / частичной приемке / не приемке груза в вагоне по настраиваемым параметрам, а также оповещении о превышении количества брака больше допустимой величины.

### Особенность проекта в следующем:
* Мобильный модуль анализа качества сырья с возможностью широкого выбора мест установки.
* Отсутствие высоких требований к высокой пропускной способности и надежности каналов связи

### Основной стек технологий:
* HTML, CSS, Angular, Java / Spring, PostgreSQL, Docker, !!! дополнить !!!

### Демо
Демо сервиса доступно по адресам:
* https://static.smartos.ru/pepper-cam/#!/top/settings - модуль распознавания герчки и перца
* https://cab.smartos.ru - web-интерфейс модуля управления

### СРЕДА ЗАПУСКА
Требуется установленный web-сервер NGINX с настройками:
1. работа по протоколу HTTPS (установлены сертификаты SSL)
2. корневая директория - /var/www/html
3. проксирование DNS имени для API должно быть настроено на localhost:8080
4. проксирование DNS имени для web-интерфейса должно быть настроено на localhost:9090

DNS имя для API необходимо перед выполнением установки указать вместо "api.smartos.ru" в файлах:
* ./docker/conf/config.json
* ./recognition/pepper-cam/sources/views/detector/index.js
*
* и !!!!.....!!!!

Развертывание сервиса производится в docker-контейнерах.
Требуется установленные пакеты docker и docker-compose (их установка описана в разделе УСТАНОВКА)

### УСТАНОВКА
В среде Ubuntu выполните:

```
sudo apt update
sudo apt upgrade
sudo apt install docker
sudo apt install docker-compose
git clone https://github.com/PavelKuzovkin/acceptance.git
cd ./acceptance
sudo sh install.sh
```

### РАЗРАБОТЧИКИ
Роман Стадников - модуль распознавания гречки и перца (!!! технологии !!!)

Максим Провоторов - модуль распознавания номеров (!!! технологии !!!)

Павел Кузовкин - модуль управления (HTML, CSS, Angular, Java / Spring, PostgreSQL, Docker)

