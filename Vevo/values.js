import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

export const usableFullScreenHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : initialWindowMetrics.frame.height;
