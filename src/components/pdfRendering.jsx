import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const pdfRendering = ({ model, image, finalPrice, year }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Revente du smartphone</Text>
        <Text>Modèle : {model}</Text>
        <Text>Année d&apos;achat : {year}</Text>
        <Text>Prix de revente estimé : {finalPrice} Dinars Algériens</Text>
        {image && <Image src={image} style={styles.image} />}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { margin: 10, padding: 10, border: "1px solid #ccc" },
  title: { fontSize: 18, marginBottom: 10 },
  image: { width: 200, height: 200, marginTop: 20 },
});

export default pdfRendering;
