import React from 'react'
import { Provider } from 'react-redux'

import configureStore from '../store'

import DetectSongButton from './detect-song-button'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <section className="VinylNowPlayingApp">
      <h1>Vinyl Now Playing</h1>
      <DetectSongButton />
    </section>
  </Provider>
)

export default App
