import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

import img from "./Cluck new.png"

function PDF({ name, items, loading }) {
  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  })

  const styles = StyleSheet.create({
    logo: {
      width: 70,
      height: 70,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Oswald",
      textTransform: "capitalize",
    },
    date: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Oswald",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Oswald",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  })

  return (
    <Document onRender={() => loading(false)}>
      <Page style={styles.body} size="A4">
        <Text style={styles.header} fixed>
          ~ Cluck PVT Ltd ~
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Image style={styles.logo} src={img} />
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.date}>
              {new Date().toISOString().split("T")[0]}
            </Text>
          </View>
        </View>

        <Text style={styles.text}>Items</Text>
        <View style={{ borderBottom: "1px solid black", height: 10 }}></View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              marginVertical: 10,
              flexDirection: "row",
              width: "80%",
            }}
          >
            <Text>Item</Text>
            <Text>QTY</Text>
          </View>
          {items.length > 0 &&
            items.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginTop: 10,
                    width: "80%",
                    paddingHorizontal: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.date}>{item.name}</Text>
                  <Text style={styles.date}>{item.qty}</Text>
                </View>
              )
            })}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default PDF
