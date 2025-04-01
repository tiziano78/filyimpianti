import localFont from 'next/font/local'

export const roboto = localFont({
  src: [
    {
      path: '../../public/fonts/roboto/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/roboto/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  preload: true,
  variable: '--font-roboto'
})

export const orbitron = localFont({
  src: [
    {
      path: '../../public/fonts/orbitron/Orbitron-VariableFont_wght.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  display: 'swap',
  preload: true,
  variable: '--font-orbitron'
}) 