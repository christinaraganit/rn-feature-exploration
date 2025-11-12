// imports for ui
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Tile from './components/Tile';

// react imports
import { useEffect, useState, useMemo } from 'react';

// audio
import { Audio } from 'expo-av';
import { SOUNDS } from './src/sounds';


export default function App() {
  const data = useMemo(() => SOUNDS, []); // use memo so it doesnt update every render
  const [currentSound, setCurrentSound] = useState(); // so only one sound can play at a time

  // sound still plays when ios silent mode is enabled
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.parentContainer}>
        <View style={{ ...styles.headingContainer }}>
          <Text style={styles.title}>Christina's Silly Soundboard</Text>
        </View>


        <View style={styles.container}>
          <FlatList
            data={data} // list of sound objects
            numColumns={2}
            scrollEnabled={false} // disable scrolling (grid fits screen)
            columnWrapperStyle={{ gap: 8 }} // doesn't work in StyleSheet for some reason
            renderItem={({ item }) => (
              item.soundEffect &&
              (<Tile
                label={item.label}
                icon={item.icon}
                onPress={async () => {
                  if (!currentSound) {
                    try {
                      // create and play sound from the asset
                      const { sound } = await Audio.Sound.createAsync(item.soundEffect);
                      await sound.playAsync();
                      setCurrentSound(sound);

                      // keep listening for audio playback, when the sound finishes, destroy it to free memroy
                      sound.setOnPlaybackStatusUpdate(status => {
                        if (status.didJustFinish) {
                          sound.unloadAsync();
                          setCurrentSound(null);
                        }

                      });
                    } catch (error) {
                      console.error("Error playing sound:", error);
                    }
                  }
                }
                }
              />)

            )} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#1C1B22',
    padding: 20,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#1C1B22',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '500',
    textAlign: "center"
  },
});
