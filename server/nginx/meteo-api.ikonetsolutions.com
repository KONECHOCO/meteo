# /etc/nginx/sites-available/meteo-api.ikonetsolutions.com
# HTTPS is added by: sudo certbot --nginx -d meteo-api.ikonetsolutions.com

proxy_cache_path /var/cache/nginx/meteo-api levels=1:2 keys_zone=meteo_api:20m max_size=2g inactive=30m use_temp_path=off;

server {
    listen 80;
    listen [::]:80;
    server_name meteo-api.ikonetsolutions.com;

    gzip on;
    gzip_types application/json;

    # Only the endpoints the app uses are public
    location ~ ^/v1/(forecast|air-quality|marine)$ {
        if ($request_method = OPTIONS) {
            add_header Access-Control-Allow-Origin "*" always;
            add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
            add_header Access-Control-Max-Age 86400 always;
            return 204;
        }

        proxy_pass http://127.0.0.1:8097;
        proxy_set_header Host $host;

        # Same request within 10 minutes is served from the nginx cache
        proxy_cache meteo_api;
        proxy_cache_key "$uri?$args";
        proxy_cache_valid 200 10m;
        proxy_cache_use_stale error timeout updating;
        proxy_cache_lock on;
        proxy_hide_header Access-Control-Allow-Origin;

        add_header Access-Control-Allow-Origin "*" always;
        add_header Cache-Control "public, max-age=600" always;
        add_header X-Cache-Status $upstream_cache_status always;
    }

    location / {
        return 404;
    }
}
