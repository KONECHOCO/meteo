#!/bin/sh
# Keeps the Open-Meteo cache warm for the 500 most populated places (warmup-cities.txt, "lat lon" per line),
# so most users get an instant answer instead of a 5-30 s cold read from S3.
# Variables and models mirror src/services/weatherService.js. Run from cron every 2 hours.

API="http://127.0.0.1:8097"
DIR="$(dirname "$0")"

FORECAST="current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&minutely_15=precipitation&forecast_minutely_15=8&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day&past_hours=24&forecast_hours=168&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&forecast_days=14"
MODELS="daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&models=ecmwf_ifs025,gfs_seamless,icon_seamless,meteofrance_seamless,ukmo_seamless&forecast_days=2"
AIR="current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen"

while read -r lat lon; do
  [ -z "$lat" ] && continue
  base="latitude=$lat&longitude=$lon&timezone=auto"
  curl -s -o /dev/null -m 120 "$API/v1/forecast?$base&$FORECAST"
  curl -s -o /dev/null -m 120 "$API/v1/forecast?$base&$MODELS"
  curl -s -o /dev/null -m 120 "$API/v1/air-quality?$base&$AIR"
done < "$DIR/warmup-cities.txt"
