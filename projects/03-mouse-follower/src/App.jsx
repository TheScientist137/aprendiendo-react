// Mouse Follower
import { useEffect, useState } from 'react'

function FollowMouse () {
  // Activar y desactivar cuando la bolita siga al puntero
  const [enabled, setEnabled] = useState(false)
  // Controlar la posición del cursor
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Pointer move effect
  useEffect(() => {
    console.log('efecto', { enabled })

    // handleMove event function
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      // Actualizamos el estado position
      setPosition({ x: clientX, y: clientY })
    }

    // Si el boton esta activado, cuando se mueva el puntero ejecutamos la funcion handleMove
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // cleanup
    // => Cuando el componente se desmonta
    // => Cuando cambian las dependencias,
    //    antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // Change body effect
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    // eliminamos la clase cuado limpiamos el efecto
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
