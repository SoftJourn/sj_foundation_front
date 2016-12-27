#Install SJ Foundation 

* create project folder `mkdir sj_foundation`
* go to the dir `cd sj_foundation`
* clone repositories:
    *  `git clone https://github.com/WordPress/WordPress.git`
    *  `git clone git@github.com:SoftJourn/sj_foundation_front.git`
    *  `git clone git@github.com:SoftJourn/sj_foundation_api.git`
    *  `git clone git@github.com:SoftJourn/sj_foundation_wp_plugin.git WordPress/wp-content/plugins/sj_foundation_plugin`
    *  `git clone git@github.com:SoftJourn/sj_foundation_wp_theme.git WordPress/wp-content/themes/sj_foundation_theme`
    *  `git clone https://github.com/WP-API/WP-API.git WordPress/wp-content/plugins/rest-api`
* `cd sj_foundation_front` go to the front dir and run docker containers:
    ```
    docker-compose build
    docker-compose up
    ```
    first time it needs time to create containers, next time it will be running faster and use just `docker-compose up`


###Install Wordpress

* open in browser `http://localhost:8008` and install wordpress
* in admin panel open settings->permalinks page and change settings to "Post name"
* activate plugins and sj_foundation theme