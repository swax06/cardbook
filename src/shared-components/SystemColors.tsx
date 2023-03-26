import React from "react";
import { PlatformColor, StyleSheet, Text, View, NativeModules} from "react-native";
const {SystemColorsModule} = NativeModules;

const SystemColors = () => {
    SystemColorsModule.getSystemColorPalettePromise().then((x: any) => {
      console.log(x);
    });
    function createTable() {
        let colors = [];
        colors = [
          {label: '@android:color/system_accent1_300', color: PlatformColor('@android:color/system_accent1_300')},
          {
            label: '?attr/colorBackgroundFloating',
            color: PlatformColor('?attr/colorBackgroundFloating'),
          },
          {
            label: '?attr/colorButtonNormal',
            color: PlatformColor('?attr/colorButtonNormal'),
          },
          {
            label: '?attr/colorControlActivated',
            color: PlatformColor('?attr/colorControlActivated'),
          },
          {
            label: '?attr/colorControlHighlight',
            color: PlatformColor('?attr/colorControlHighlight'),
          },
          {
            label: '?attr/colorControlNormal',
            color: PlatformColor('?attr/colorControlNormal'),
          },
          {
            label: '?android:colorError',
            color: PlatformColor('?android:colorError'),
          },
          {
            label: '?android:attr/colorError',
            color: PlatformColor('?android:attr/colorError'),
          },
          {
            label: '?attr/colorPrimary',
            color: PlatformColor('?attr/colorPrimary'),
          },
          {label: '?colorPrimaryDark', color: PlatformColor('?colorPrimaryDark')},
          {
            label: '@android:color/holo_purple',
            color: PlatformColor('@android:color/holo_purple'),
          },
          {
            label: '@android:color/holo_green_light',
            color: PlatformColor('@android:color/holo_green_light'),
          },
          {
            label: '@color/catalyst_redbox_background',
            color: PlatformColor('@color/catalyst_redbox_background'),
          },
          {
            label: '@color/catalyst_logbox_background',
            color: PlatformColor('@color/catalyst_logbox_background'),
          },
        ];
        let i = 0;
        let table = [];
        console.log(PlatformColor("@android:color/system_accent1_0"));
        for (let color of colors) {
          table.push(
            <View style={styles.row} key={color.label}>
            <Text style={styles.labelCell}>{color.label}</Text>
            <View
              style={{
                ...styles.colorCell,
                backgroundColor: color.color,
              }}
            />
          </View>,
          );
        }
        return table;
      }
    
      return <>{createTable()}</>;
}

export default SystemColors

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    labelCell: {
        padding: 5,
    },
    column: {
        flexDirection: 'column'
    },
    colorCell: {
        height: 50,
        width: 50
    }
})
  