import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { Platform, Alert } from "react-native";

export const requestCameraPermission = () => {
  const promise = new Promise((resolve, reject) => {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert("Thong bao", "alert.cameraPermissionUnavailable");
            reject(result);
            break;
          case RESULTS.DENIED:
            request(permission).then((requestPermissionResult) => {
              switch (requestPermissionResult) {
                case RESULTS.GRANTED:
                  resolve(requestPermissionResult);
                  break;
                default:
                  reject(requestPermissionResult);
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            resolve(result);
            break;
          case RESULTS.BLOCKED:
            Alert.alert("alert.title", "alert.cameraPermissionBlock");
            reject(result);
            break;
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const requestPhotoLibraryPermission = () => {
  const promise = new Promise((resolve, reject) => {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert("alert.title", "alert.cameraPermissionUnavailable");
            reject(result);
            break;
          case RESULTS.DENIED:
            request(permission).then((requestPermissionResult) => {
              switch (requestPermissionResult) {
                case RESULTS.GRANTED:
                  resolve(requestPermissionResult);
                  break;
                default:
                  reject(requestPermissionResult);
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            resolve(result);
            break;
          case RESULTS.BLOCKED:
            Alert.alert("alert.title", "alert.cameraPermissionBlock");
            reject(result);
            break;
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};
