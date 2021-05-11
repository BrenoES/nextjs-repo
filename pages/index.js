import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styles from '../styles/Home.module.css';
import { getWeather } from './../api/weatherAPI/weatherAPI';

export default function Home() {
  const DefaultCity = 'Nova Iguaçu';
  const [cityTerm, setCityTerm] = useState(DefaultCity);
  const [city, setCity] = useState(null);
  const [icon, setIcon] = useState('');

  const handleChange = (event) => setCityTerm(event.target.value || DefaultCity);
  const debounced = useDebouncedCallback(handleChange, 1000);

  const getCity = async (cityTerm) => {
    try {
      const { data } = await getWeather(cityTerm);
      setIcon(`http://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`)
      setCity(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCity(cityTerm);
  }, [cityTerm])

  return (
    <div className={styles.container}>
      <Head>
        <title>Wheater </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={styles.main}>
        <input className={styles.city__inputSearch} name="search" placeholder="Buscar cidade" onChange={debounced}></input>
        {
          city && <section id="card" className={styles.card}>
            <h2 className={styles.city__name} data-name={`${city.name},${city.sys?.country}`}>
              <span>{city.name}</span>
              <sup>{city.sys?.country}</sup>
            </h2>
            {city.main?.temp && <div className={styles.city__temperature}>{Math.round(city.main?.temp)}<sup>°C</sup></div>}
            <img src={icon}></img>
            <span className={styles.city__climateDescription}>{city.weather?.map(x => x.description)}</span>
          </section>
        }
      </form>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
