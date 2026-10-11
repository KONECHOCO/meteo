# Server meteo proprio (Open-Meteo self-hosted)

Sostituisce il piano commerciale di Open-Meteo (29 €/mese) con un server tuo da circa **7–10 €/mese**.
L'uso commerciale è permesso: i dati sono **CC BY 4.0** (basta citare Open-Meteo, l'app lo fa già in fondo alla pagina)
e il software è AGPL-3.0 (lo usiamo senza modifiche, quindi non c'è altro da pubblicare).

Il server non scarica tutti i modelli: legge solo i pezzi di dati che servono dall'archivio pubblico
di Open-Meteo su AWS e li tiene in cache. Le prime richieste per una zona richiedono qualche secondo,
poi sono veloci.

## 1. Compra il server

Requisiti ufficiali: **almeno 8 GB di RAM** e un disco SSD.

- Consigliato: **Hetzner Cloud CX33** (4 vCPU, 8 GB RAM, 80 GB SSD) con IPv4, Ubuntu 24.04,
  datacenter in Germania o Finlandia. Verifica il prezzo al momento dell'ordine (nel 2026 Hetzner ha cambiato i prezzi più volte).
- Alternativa equivalente: Hetzner CAX21 (ARM), oppure qualsiasi VPS con 8 GB di RAM.
- Al momento della creazione aggiungi la tua chiave SSH.

## 2. Collega il dominio

Nel pannello DNS di `ikonetsolutions.com` crea un record:

| Tipo | Nome | Valore |
|---|---|---|
| A | `meteo-api` | indirizzo IPv4 del server |

## 3. Installa (una volta sola)

Dal tuo PC, copia questa cartella sul server:

```bash
scp -r server root@IP_DEL_SERVER:/opt/meteo-api
```

Poi collegati al server ed esegui:

```bash
ssh root@IP_DEL_SERVER
curl -fsSL https://get.docker.com | sh
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
cd /opt/meteo-api
cp .env.example .env
docker compose up -d
```

Caddy ottiene da solo il certificato HTTPS (serve che il record DNS sia già attivo).

## 4. Verifica

```bash
curl "https://meteo-api.ikonetsolutions.com/v1/forecast?latitude=45.46&longitude=9.19&current=temperature_2m"
```

Deve rispondere con un JSON contenente `temperature_2m`. Controlla anche `/v1/air-quality` e `/v1/marine`.

## 5. Collega l'app

Nel progetto crea `.env.production` (vedi `.env.example`) con:

```
VITE_WEATHER_API_BASE=https://meteo-api.ikonetsolutions.com
```

e ricompila (`npm run build`).

## Manutenzione

```bash
cd /opt/meteo-api
docker compose pull && docker compose up -d   # aggiornare Open-Meteo e Caddy (una volta al mese)
docker compose logs -f open-meteo             # vedere i log
df -h                                         # spazio disco (la cache usa al massimo CACHE_SIZE)
```
