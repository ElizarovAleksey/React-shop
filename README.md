# Демо приложение React для продажи товаров / 
# The React demo application for selling products
 ##  Работает на базе node.js + mongodb
      настроена аутентификация с  ролям.
      две роли: admin и user.
      роль admin имеет возможность создавать товар с изображением. 
      изображение сохраняется на сервере в виде файла с ссылкой в базу данных.
      роль user имеет возможность оформить заказ, заказ сохраняется в базе данных.
      Для удобства при добавление товара указан счетчик товара на корзине сколько товаров добавлено.
      Пользователь имеет свой профиль где можно изменить пароль и почту.
      Имеет два режиме день и ночь.
      Создавалось в качестве учебных задач.
      Адаптирован под мобильные устройства.
    
 ## it works on the basis of node.js + mongodb
    authentication with roles is configured.
    two roles: admin and user.
    The admin role has the ability to create a product with an image.
    the image is saved on the server as a file with a link to the database.
    The user role has the ability to place an order, the order is saved in the database.
    For convenience, when adding an item, the item counter is indicated on the cart for how many items have been added.
    The user has his own profile where you can change the password and email.
    It has two modes day and night.
    It was created as educational tasks.
## Добавлен в репозитарий <a href="https://hub.docker.com/repository/docker/alex89102/react-app/"> Docker Hub</a>
~~~bash
 version: '3.8'
          services:
            # React приложение
            react-app:
              image: alex89102/react-app:latest
              container_name: react-app #Название оставить как есть для корректной работы frontend+backend
              env_file:
                - .env
             restart: always
             ports:
               - "8082:80"    # Порт, на котором будет доступен frontend
               - "9001:9001"  # Порт, на котором будет доступен backend

            # MongoDB
            mongo:
              image: mongo
              container_name: mongo
              restart: always
              environment:
                MONGO_INITDB_ROOT_USERNAME: root
                MONGO_INITDB_ROOT_PASSWORD: example
              ports:
                - "27017:27017"
               volumes:
                - /opt/db:/data/db  # хранение базы данных на хосте

            # Mongo Express (админ-панель для MongoDB)
            mongo-express:
              image: mongo-express
              container_name: mongo-express
              restart: always
              ports:
               - "8081:8081"
              environment:
               ME_CONFIG_MONGODB_SERVER: mongo                # Используйте этот адрес для подключения к MongoDB на хосте
               ME_CONFIG_MONGODB_PORT: "27017"                # Порт MongoDB на хосте
               ME_CONFIG_MONGODB_ADMINUSERNAME: root          #  Admin от MongoDB  
               ME_CONFIG_MONGODB_ADMINPASSWORD: example       # пароль от MongoDB
               ME_CONFIG_BASICAUTH_USERNAME: admin            # Имя пользователя для аутентификации в Mongo Express (по желанию)
               ME_CONFIG_BASICAUTH_PASSWORD: admin_password   # Пароль пользователя для аутентификации в Mongo Express (по желанию)
~~~
## файл .env
   создайте файл .env с переменной для подключения backend к базе данных mangodb
~~~bahs
   MONGODB_SERVER_URL = mongodb://root:example@mongo:27017
~~~

![main](Man/main.png)
![main](Man/main-night-mode.png)
![main](Man/registr.png)
![main](Man/registr-night-mode.png)
![main](Man/login.png)
![main](Man/login-night-mode.png)
![main](Man/profil.png)
![main](Man/profil-night-mode.png)
![main](Man/basket.png)
![main](Man/basket-night-mode.png)
![main](Man/order.png)
![main](Man/order-night-mode.png)
![main](Man/upload.png)
![main](Man/upload-night-mode.png)
![main](Man/planshet.png)
![main](Man/mabail.png)
