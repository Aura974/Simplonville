import { Text, View, TextInput, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import SelectDropdown from "react-native-select-dropdown";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

import Button from "./button";


export default function FormComponent() {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastName: "",
      firstName: "",
    },
  })

  const [markerPosition, setMarkerPosition] = useState({});

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    console.log("latitude:", latitude, "longitude:", longitude);

  
     // Convertir les coordonnées en adresse
    //  try {
    //   const address = await convertCoordinatesToAddress(latitude, longitude);
    //   setConvertedAddress(address);
    // } catch (error) {
    //   console.error('Erreur lors de la conversion des coordonnées en adresse :', error);
    //   setConvertedAddress('Erreur de géocodage');
    // }
  };

  const items = ["Apple", "Banana"]

  const onSubmit = (data) => console.log(data)

  return (
    <View style={styles.container}>
      <View>
        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
        />
        {errors.lastName && <Text>Champ requis</Text>}

        <Controller
          control={control}
          rules={{
              required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>Champ requis</Text>}
      </View>

      <View style={styles.dropdownContainer}>
        <SelectDropdown
        defaultButtonText={ "Sélection" }
        data={items}
        onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
        }}
        rowTextForSelection={(item, index) => {
            return item
        }}
        buttonStyle={styles.dropdownButtonStyle}
        buttonTextStyle={styles.dropdownText}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#137979'} size={18} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        />
      </View>

      <View style={styles.mapContainer}>
          <MapView style={styles.map}
            initialRegion={initialRegion}
          >
          {currentLocation && (
            <Marker
              draggable
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your location"
              onDragEnd={handleMapPress}
            />
          )}
          </MapView>
      </View>

      {/* <View>
        <Text>
          {text}
        </Text>
      </View> */}

      <View>
        <Text>latitude: {markerPosition.latitude}</Text>
        <Text>longitude: {markerPosition.longitude}</Text>
      </View>

      <View style={styles.footerContainer}>
        <Button label="Envoyer" onPress={handleSubmit}/> 
      </View>

      <StatusBar style="auto" />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  dropdownContainer: {
    padding: 10,
  },
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#137979",
  },
  dropdownText: {
    color: "#25292e",
    textAlign: "center",
    fontWeight: "bold"
  },
  dropdownStyle: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dropdownRow: {
    backgroundColor: "#bec9d1",
    borderBottomColor: "#FFF"
  },
  dropdownRowText: {
    color: "#000",
    textAlign: "center",
  },
  mapContainer: {
    height: 200,
    paddingTop: 20,
    paddingBottom: 20
  },
  map: {
    width: "100%",
    height: "100%",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  
});