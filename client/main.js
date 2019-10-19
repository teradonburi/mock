import 'regenerator-runtime/runtime'

async function main() {
  const audio = new Audio('./se_maoudamashii_onepoint15.mp3')
  audio.controls = true
  audio.addEventListener('ended', () => {
    console.log('ended')
    audio.play()
  })
  // audio.loop = true
  document.body.appendChild(audio)
}
main()
