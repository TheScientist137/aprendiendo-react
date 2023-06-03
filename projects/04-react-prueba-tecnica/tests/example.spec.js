// @ts-check
import { test, expect } from '@playwright/test'

const CAT_PREFIX_IMAGE = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173/'

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Recuperamos nuestros elementos
  // 'Quiero que recuperes de la pagina el paragrafo que encuentres'
  // Hacemos lo mismo con la imagen
  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  // Recuperamos el contenido del texto y la dirección de la imagen
  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  // 'Esperamos' => expect que el texto no sea null o que su contenido sea mayor que 0
  // exoect que la imagen que se carga empieza con el prefijo correcto
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE)).toBeTruthy()
})
