import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fontHeader: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  fontSubHeader: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1
  },
  fontNormal: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
    color: "#333",
  },
  fontSmall: {
    fontSize: 14,
    color: "#333",
  },
  fontSmallest: {
    fontSize: 12,
    color: '#333'
  },
  fontNote: {
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0,
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ADADAD",
    borderRadius: 3,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: "#333",
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#ADADAD",
    borderRadius: 3,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    color: "#333",
  },
  inputField: {
    height: 40,
    borderColor: "#AAAAAA",
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 4,
    paddingStart: 8,
  },
});

export default globalStyles;
