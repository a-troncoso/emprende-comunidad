import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import App from '@/components/App'

if (process.env.NODE_ENV !== 'production') {
  console.info('Looks like we are in development mode!');
}

render(<App />, document.getElementById('root'))
