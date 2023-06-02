import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

const CAT_PREFIX_IMAGE = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // como acepta una funcion podemos pasarle asi getRandomFact
  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact))
  }, [])

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

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main className='main'>
      <h1>App de gatitos</h1>

      <button onClick={handleClick}>Get new fact</button>

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
