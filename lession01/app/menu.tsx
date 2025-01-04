import { Colors } from "@/constants/Colors";
import MenuImages from "@/constants/MenuImages";
import { MENU_ITEMS } from "@/constants/MenuItems";
import React from "react";
import {
  Appearance,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
} from "react-native";

export default function MenuScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const separatorComp = <View style={styles.separator}></View>
  const headerComp = <Text style={styles.headerComp}>Top of menu</Text>
  const footerComp = <Text style={styles.footerComp}>bottom of menu</Text>
  const emptyComp = <Text>Empty component</Text>
  return (
    <Container>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => separatorComp}
        ListHeaderComponent={() => headerComp}
        ListFooterComponent={() => footerComp}
        ListFooterComponentStyle={styles.footerComp}
        ListEmptyComponent={() => emptyComp}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.menuTextRow}>
              <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.title}</Text>
              <Text style={styles.menuItemText}>{item.description}</Text>
            </View>
            <Image
              source={MenuImages[item.id - 1]}
              style={styles.menuImage}
            />
          </View>
        )}
      />
    </Container>
  );
}

function createStyles(theme: any, colorScheme: any) {
  return StyleSheet.create({
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
      width: "50%",
      maxWidth: 300,
      marginHorizontal: "auto",
      marginBottom: 10
    },
    footerComp: {
      color: theme.text,
      marginHorizontal: "auto"
    },
    headerComp: {
      marginHorizontal: "auto",
      color: theme.text,
      marginBottom: 10
    },
    row: {
      flexDirection: "row",
      marginHorizontal: "auto",
      width: "100%",
      maxWidth: 600,
      height: 100,
      marginBottom: 10,
      borderStyle: "solid",
      borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden"
    },
    menuTextRow: {
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1
    },
    menuItemText: {
      color: theme.text,
    },
    menuItemTitle: {
      fontSize: 18,
      textDecorationLine: "underline"
    },
    menuImage: {
      width: 100,
      height: 100
    }
  });
}
