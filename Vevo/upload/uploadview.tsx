import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from "react-native-image-picker";
import {
  requestCameraPermission,
  requestPhotoLibraryPermission,
} from "./components/permission";
import RNFetchBlob from "react-native-fetch-blob";
import storage from "@react-native-firebase/storage";

export const UploadView: FC = () => {
  const onUpload = () => {
    console.log("onUpload");
    pickImage();
  };

  const getPathForFirebaseStorage = async (uri: string) => {
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  };

  const type: MediaType = "video";
  const makeid = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const pickImage = () => {
    const reference = storage().ref(`gs://videos/${makeid(20)}`);
    // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/test-video.mp4`;
    // console.log("pathToFile", pathToFile);
    requestCameraPermission().then((result) => {
      requestPhotoLibraryPermission().then(async () => {
        const options = {
          saveToPhotos: true,
          mediaType: type,
          includeBase64: false,
        };
        const result = await launchImageLibrary(options);
        let stringImage;

        if (result && result.assets) {
          if (result.assets.length > 0) {
            stringImage = result.assets[0].uri;
          }
        }

        console.log("result", result);
        if (stringImage) {
          const fileUri = await getPathForFirebaseStorage(stringImage);
          await reference.putFile(fileUri);
          Alert.alert("Upload done");
          // console.warn("upload done");
          // RNFetchBlob.fetch(
          //   "POST",
          //   "http://10.0.2.2:8887/",
          //   {
          //     "x-ms-blob-type": "BlockBlob",
          //     "content-type": "video/mp4",
          //     "x-ms-blob-content-type": "video/mp4",
          //   },
          //   RNFetchBlob.wrap(stringImage)
          // )
          //   .then((res) => {
          //     console.log(res.text());
          //   })
          //   .catch((err) => {
          //     // error handling ..
          //     console.log("error", err);
          //   });
        }
      });
    });
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <TouchableOpacity
        style={{
          width: 100,
          height: 50,
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 10,
        }}
        onPress={onUpload}
      >
        <Text style={{ color: "white" }}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};
