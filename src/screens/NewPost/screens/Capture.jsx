import { Camera } from "expo-camera";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, Button } from "react-native";
import { useCamera } from "../hooks/camera";
import { FontAwesome5 } from "@expo/vector-icons";
{
  /* <FontAwesome5 name="camera-retro" size={24} color="black" /> */
}
import { AntDesign } from "@expo/vector-icons";
{
  /* <AntDesign name="videocamera" size={24} color="black" /> */
}

import { Fontisto } from "@expo/vector-icons";

{
  /* <Fontisto name="spinner-refresh" size={24} color="black" /> */
}

const Capture = ({ navigation, setMedia }) => {
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const { type, toggleType, mediaType, toggleCameraMode, hasPermission } =
    useCamera();

  if (!hasPermission) {
    return (
      <View>
        <Text>No Camera permissions</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (camera) {
      setLoading(true);
      const { uri } = await camera.takePictureAsync(null);
      setLoading(false);
      setMedia({ type: "photo", uri });
      navigation.navigate("ConfirmMedia");
    } else {
      console.log("Error with camera reference");
    }
  };

  const takeVideo = async () => {
    if (!isRecording) {
      setIsRecording(true);
      const { uri } = await camera.recordAsync();
      setMedia({ type: "video", uri });
      navigation.navigate("ConfirmMedia");
    } else {
      setIsRecording(false);
      camera.stopRecording();
    }
  };

  const buttons = () => {
    return (
      <View style={styles.buttons}>
        {mediaType === "photo" ? (
          <Pressable onPress={takePhoto} style={styles.takeMedia}>
            {loading ? (
              <Fontisto name="spinner-refresh" size={24} color="white" />
            ) : (
              <FontAwesome5 name="camera-retro" size={24} color="white" />
            )}
          </Pressable>
        ) : (
          <Pressable onPress={takeVideo} style={styles.takeMedia}>
            {isRecording ? (
              <AntDesign name="videocamera" size={24} color="red" />
            ) : (
              <AntDesign name="videocamera" size={24} color="white" />
            )}
          </Pressable>
        )}
        <Button title="Toggle type" onPress={toggleType} />
        <Button title="Go Back" onPress={() => navigation.navigate("Form")} />
        <Button title="Change Camera Mode" onPress={toggleCameraMode} />
      </View>
    );
  };

  return (
    <View>
      <Camera
        style={styles.cameraContainer}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      />
      {buttons()}
    </View>
  );
};

export default Capture;

const styles = StyleSheet.create({
  cameraContainer: {
    aspectRatio: 1,
    height: "100%",
    width: "100%",
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
  },
  record: {
    width: "100%",
    backgroundColor: "gray",
    height: 50,
  },
  takeMedia: {
    position: "absolute",
    bottom: 120,
    left: "45%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleMode: {
    position: "absolute",
    top: 0,
    backgroundColor: "black",
    padding: 5,
  },
  whiteText: {
    color: "white",
  },
});