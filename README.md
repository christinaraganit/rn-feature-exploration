# React Native Feature Exploration

## Submission Details
Christina Raganit \
301458880

## GitHub Repository
https://github.com/christinaraganit/rn-feature-exploration 

## Research & Innovation
For this project, I explored audio playback using Expo’s ```expo-av```. This feature allows a React Native app to record, play, and control audio files directly from an iOS or Android app. I chose this feature because it’s interactive and media-driven (and also because I refuse to pay for Discord Nitro, so I wanted to build a soundboard of my own.)

## Documentation
### Why This Feature is Useful
I wanted to explore audio playback in more detail because sound effects (SFX) are one of the simplest but most impactful ways to elevate user experience. Visuals and interactions communicate information, but sound communicates emotion and feedback. Think of how apps like Discord use seasonal or themed sound effects, like their spooky Halloween call tone. That simple change makes the experience memorable without any additional functionality. Sound can also set brand identity. For example, the Netflix “ta-dum”, or the dreaded Microsoft Teams ringtone. 

I believe audio gives digital products a sense of character, so I wanted to understand how to integrate that player in a React Native app using ```expo-av```. I built a small soundboard as a way to experiment with loading, playing and managing multiple sound effects efficiently. 

### Integration and Code Exploration
The app imports and configures the audio module.
```import { Audio } from 'expo-av';```

This makes sure that iOS will still play sounds even if the device is muted.
```
useEffect(() => {
   Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
 }, []);
```

Each sound button is a custom Tile component that calls:
```
const { sound } = await Audio.Sound.createAsync(item.soundEffect);
await sound.playAsync();
```

The app tracks the currently playing sound using a React state variable: 
```const [currentSound, setCurrentSound] = useState();```

Before starting a new sound, the app checks this state so that only one sound plays at a time. When playback finishes, a listener unloads the sound and resets the state:
```
sound.setOnPlaybackStatusUpdate(status => {
                       if (status.didJustFinish) {
                         sound.unloadAsync();
                         setCurrentSound(null);
                       }
                     });
```
This approach avoids overlapping sounds.
## Challenges and Solutions
### Challenge #1
Multiple sounds could overlap when tapping tiles repeatedly. I introduced a currentSound state that locks playback until the active sound finishes.
### Challenge #2
Audio wouldn’t play in iOS silent mode, so I dug deep into the documentation and configured the playback mode using 
```Audio.setAudioModeAsync({ playsInSilentModeIOS: true });```
### Challenge #3
I learned from reading the documentation that it’s good practice to call sound.unloadAsync() to free memory when a sound finishes playing. This unloads the media from memory. I learned that unloading these sounds after playback helps reduce CPU load. 
## Potential Real-World Use Cases
I could see myself using this a lot! For example, I think I could have enhanced the Pomodoro assignment by adding notification or timer alerts. I can think of potential use cases for playing sounds in Critterly: for example, when successfully submitting a booking, or as an indicator when receiving a message from another user. 
