import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Tile({ label, icon, onPress }) {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').width;
    const tileMargin = 8;
    const parentPadding = 20;

    // safe height excludes notches and system bars
    const insets = useSafeAreaInsets();
    const safeHeight = Dimensions.get('window').height - insets.top - insets.bottom;

    // compute tile size based on avail. safe space and spacing
    const tileWidth = (screenWidth - (parentPadding * 2) - (tileMargin)) / 2;
    const tileHeight = (safeHeight - 52 - (parentPadding * 2) - (tileMargin * 3)) / 4;

    return (
        <TouchableOpacity onPress={onPress} style={{
            ...styles.tile,
            width: tileWidth,
            height: tileHeight,
        }}>
            <View style={styles.iconView}>
                <View style={styles.iconCircle}>
                    <Image source={icon} style={styles.icon} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.tileText}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tile: {
        display: "flex",
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: '#24232D',
        alignItems: 'center',
        padding: 8,
    },
    tileText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        width: "100%"
    },
    textContainer: {
        position: "absolute",
        bottom: 12,
        height: "40%",
        paddingTop: 4,
        paddingLeft: 8,
        paddingRight: 8,
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    iconView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60%",
    },
    iconCircle: {
        width: 72,
        height: 72,
        backgroundColor: "#2E2D39",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
    },
    icon: {
        width: "60%",
        height: "60%"
    }
});