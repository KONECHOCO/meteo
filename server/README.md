# Server meteo proprio (Open-Meteo self-hosted)

Sostituisce il piano commerciale di Open-Meteo (29 €/mese). L'uso commerciale è permesso: i dati sono
**CC BY 4.0** (basta citare Open-Meteo, l'app lo fa già in fondo alla pagina) e il software è AGPL-3.0
(lo usiamo senza modifiche).

Il server non scarica tutti i modelli: legge dall'archivio pubblico di Open-Meteo su AWS solo i dati che
servono e li tiene in una cache locale da 60 GB. Una zona mai richiesta risponde in 5–30 s, poi è immediata;
nginx tiene in cache le risposte per 10 minuti e `warmup.sh` (cron ogni 2 ore) tiene calde le 500 città più
popolose (`warmup-cities.txt`).

## Server attuale

| | |
|---|---|
| Fornitore | Contabo Cloud VPS 6 NVMe (6 vCPU, 12 GB RAM, 100 GB), Hub Europe |
| IP | `169.58.44.38` (accesso: `ssh root@169.58.44.38`, solo chiave SSH, password disattivata) |
| Dominio | `meteo-api.ikonetsolutions.com` (DNS su Namecheap: record A → IP) |
| Cartella | `/opt/meteo-api` |
| Sicurezza | ufw (22, 80, 443), fail2ban, aggiornamenti automatici |

## Reinstallazione da zero (Ubuntu 24.04)

```bash
scp -r server root@IP:/opt/meteo-api
ssh root@IP
apt-get update && apt-get install -y ufw fail2ban unattended-upgrades nginx certbot python3-certbot-nginx
ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable
curl -fsSL https://get.docker.com | sh
cd /opt/meteo-api && cp .env.example .env && docker compose up -d

mkdir -p /var/cache/nginx/meteo-api
cp nginx/meteo-api.ikonetsolutions.com /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/meteo-api.ikonetsolutions.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
certbot --nginx -d meteo-api.ikonetsolutions.com

chmod +x warmup.sh
echo "15 */2 * * * root flock -n /tmp/meteo-warmup.lock /opt/meteo-api/warmup.sh" > /etc/cron.d/meteo-warmup
```

## Verifica

```bash
curl -i "https://meteo-api.ikonetsolutions.com/v1/forecast?latitude=45.46&longitude=9.19&current=temperature_2m"
```

Deve rispondere `200` con `temperature_2m`; ripetendo la richiesta `X-Cache-Status` diventa `HIT`.

## Collegare l'app

In `.env.production` (vedi `.env.example` nella cartella principale):

```
VITE_WEATHER_API_BASE=https://meteo-api.ikonetsolutions.com
```

## Manutenzione

```bash
cd /opt/meteo-api
docker compose pull && docker compose up -d   # aggiornare Open-Meteo (una volta al mese)
docker compose logs -f open-meteo             # log
free -h && df -h /                            # RAM e disco (la cache occupa CACHE_SIZE fin dall'avvio)
```
