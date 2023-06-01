import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // Primer Objetivo: Recuperar un random fact de la primera API y muestralo en pantalla
  // Fetching de datos
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        // Accedemos a data y guardamos el hecho en la variable fact
        const { fact } = data
        setFact(fact)

        // Segundo Objetivo: Recuperar las tres primeras palabras del hecho
        // fact.split(' ').slice(0, 2).join(' ')
        // Otra manera usando el segundo parámetro de split()
        const firstThreeWords = fact.split(' ', 3).join(' ')
        console.log(firstThreeWords)

        // Tercer Objetivo: Muestra una imagen de un gato usando la segunda API con las tres primeras palabras recuperadas en el objetivo anterior
        fetch(`https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { url } = response
            setImageUrl(url)
          })
      })
  }, []) // [] Solo se ejecuta cuando se monta el componente

  return (
    <main className='main'>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE}${imageUrl}`} alt={`image extracted using the first three words for: (${fact})`} />}
    </main>
  )
}
