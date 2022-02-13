import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'

import styles from './ModalChooseFormat.module.css'

const formats = [{name: 'HTML', value: 'html'}, {name: 'LaTeX', value: 'latex'}]

const submit = (format: string) => {
  if (window.ipcApi) {
    window.ipcApi.send.chooseFormat(format)
    window.close()
  }
}

export const ModalChooseFormat = () => {
  const [format, setFormat] = useState('html')

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submit(format)
      } else if (e.key === 'Escape') {
        window.close()
      }
    }
    document.body.addEventListener('keydown', keyHandler)
    return () => document.body.removeEventListener('keydown', keyHandler)
  }, [format])

  return (
    <div className={styles.root}>
      <p className={styles.text}>To which format do you want to export to clipboard?</p>
      <select value={format} onChange={e => setFormat(e.target.value)}>
        { formats.map(({name, value}) =>
            <option value={value} key={value}>{name}</option>) }
      </select>
      <Button onClick={() => submit(format)} variant='primary'>Export</Button>
      <Button onClick={() => window.close()} variant='secondary'>Cancel</Button>
    </div>
  )
}
