import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  Main: "#7BC89C",
  FontColorNoBackground: "#000",
  Background: "#fff",
  FontColorWithBackground: "#fff",
  DetailsColor: "#8f9bb3",
  BorderColor: "#edf1f7",
  black: "#171717",
  white: "#FFFFFF",
  poUpBackground: "#000000b0",
  InputBackground: "#f7faf9",
  InputBorder: "#b8dec7",
};

export const SIZES = {
  base: 10,
  width,
  height,
};
