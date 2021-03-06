### Реализованная функциональность
* Распознавание брака с выделением мест его обнаружения.
* Распознавание номеров нанесенных на вагоны.
* Отображение и хранение информации о событиях в процессе разгрузки сырья.

### Особенность проекта в следующем:
* Размещение автономного "модуля анализа" непосредственно на ковше крана.
* Возможность сигнализировать машинисту крана о перемещении ковша в другое место вагона для забора чистого сырья.
* Отсутствие высоких требований к пропускной способности и надежности каналов связи.

### Основной стек технологий:
* Angular, Java / Spring, PostgreSQL, Docker, Python, OpenCV, RNN, TensorFlow, Webix

### Демо
Демо сервиса доступно по адресам:
* https://static.smartos.ru/pepper-cam/#!/top/settings - модуль распознавания брака
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
* ./recognition/number/app/config.py

Развертывание сервиса производится в docker-контейнерах.
Требуется установленные пакеты docker и docker-compose (их установка описана в разделе УСТАНОВКА)

### УСТАНОВКА
В среде Ubuntu 20.04 выполните:

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
Роман Стадников - модуль распознавания брака (TensorFlow, Webix)

Максим Провоторов - модуль распознавания номеров вагонов (Python, OpenCV, RNN, TensorFlow)

Павел Кузовкин - модуль отображения и хранения информации (Angular, Java / Spring, PostgreSQL, Docker)

