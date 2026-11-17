# Flute Destroyer

A free, open-source flute practice app. Learn to read your first notes, follow a short melody, see its fingerings, and use your microphone to check your pitch. No account, build process, external services, or third-party libraries are required.

The app includes sheet practice with live note detection, an adjustable metronome, a tuner, and a timed note-reading trainer. Microphone audio is processed on your device.

## Run locally

From this directory, run:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Microphone access requires a browser that supports Web Audio and permission to use the microphone. Localhost is treated as a secure context; other deployments require HTTPS.

## Pitch detection

Audio is processed locally and is never uploaded. The detector estimates the fundamental of one sustained note, roughly B3 to C7. Accuracy depends on the microphone, room noise, instrument tone, and browser. Try a quiet room and hold each note steady. A4 can be adjusted from 415 to 466 Hz. Sheet fingerings cover the beginner notes B4, A4, and G4 for standard concert flute; filled circles indicate pressed keys.

## License

MIT; see [LICENSE](LICENSE). The included lesson and melody are original project content and are available under the same license.
