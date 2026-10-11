# Server meteo proprio (Open-Meteo self-hosted)

Sostituisce il piano commerciale di Open-Meteo (29 €/mese). L'uso commerciale è permesso: i dati sono
**CC BY 4.0** (basta citare Open-Meteo, l'app lo fa già in fondo alla pagina) e il software è AGPL-3.0
(lo usiamo senza modifiche).

Il server non scarica tutti i modelli: legge solo i pezzi di dati che servono dall'archivio pubblico
di Open-Meteo su AWS e li tiene in cache. Le prime richieste per una zona richiedono qualche secondo,
poi sono veloci; nginx tiene in cache le risposte per 10 minuti.

Gira sul VPS Ikonet esistente (`23.88.32.156`, Hetzner fsn1), accanto alle altre app, dietro
l'nginx di sistema con certbot.

## 0. Prima: aumentare il VPS

Open-Meteo richiede **almeno 8 GB di RAM liberi**; il VPS ha 7,6 GB totali già usati per metà dalle altre app.
In Hetzner Console → server → **Rescale** → **CX43** (8 vCPU, 16 GB RAM, 160 GB disco), spuntando
"aumenta anche il disco". Il server si spegne per 1–2 minuti (anche le altre app). L'aumento del disco
non si può più annullare.

## 1. Collega il dominio

Nel DNS di `ikonetsolutions.com`: record **A** `meteo-api` → `23.88.32.156`.

## 2. Installa (una volta sola)

Dal tuo PC:

```bash
scp -r server choco@23.88.32.156:~/meteo-api
```

Sul server:

```bash
ssh choco@23.88.32.156
cd ~/meteo-api
cp .env.example .env
docker compose up -d
curl "http://127.0.0.1:8097/v1/forecast?latitude=45.46&longitude=9.19&current=temperature_2m"

sudo mkdir -p /var/cache/nginx/meteo-api
sudo cp nginx/meteo-api.ikonetsolutions.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/meteo-api.ikonetsolutions.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d meteo-api.ikonetsolutions.com
```

## 3. Verifica

```bash
curl -i "https://meteo-api.ikonetsolutions.com/v1/forecast?latitude=45.46&longitude=9.19&current=temperature_2m"
```

Deve rispondere `200` con `temperature_2m`. Ripetendo la stessa richiesta, `X-Cache-Status` diventa `HIT`.
Controlla anche `/v1/air-quality` e `/v1/marine`.

## 4. Collega l'app

Nel progetto crea `.env.production` (vedi `.env.example` nella cartella principale) con:

```
VITE_WEATHER_API_BASE=https://meteo-api.ikonetsolutions.com
```

e ricompila (`npm run build`).

## Manutenzione

```bash
cd ~/meteo-api
docker compose pull && docker compose up -d   # aggiornare Open-Meteo (una volta al mese)
docker compose logs -f open-meteo             # log
free -h && df -h /                            # RAM e disco (la cache usa al massimo CACHE_SIZE)
```
