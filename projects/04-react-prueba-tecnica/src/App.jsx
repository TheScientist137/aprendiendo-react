import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // useEffect  para recuperar la cita al recargar la pagina
  useEffect(() => {
    // Primer Objetivo
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      // TODO: Handle error if !res.ok
      .then(data => {
        // Accedemos a data y guardamos el hecho en la variable fact
        const { fact } = data
        setFact(fact)
      })
  }, []) // [] Solo se ejecuta cuando se monta el componente

  // useEffect para recuperar la imagen cada vez que tenemos cita nueva
  useEffect(() => {
    if (!fact) return

    // Segundo Objetivo:
    // fact.split(' ').slice(0, 2).join(' ')
    const firstThreeWords = fact.split(' ', 3).join(' ')
    console.log(firstThreeWords)

    // Tercer Objetivo
    fetch(
      `https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`
    )
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main className='main'>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE}${imageUrl}`}
          alt={`image extracted using the first three words for: (${fact})`}
        />
      )}
    </main>
  )
}
