import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import MapViewRef, { Marker } from 'react-native-maps';
import { MapDirectionsResponse } from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import { AntDesign } from '@expo/vector-icons';

import { googlemaps_api_key } from '../../../env.json';

import {
  Container,
  SearchBox,
  Back,
  InputSearch,
  MapView,
  Directions,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Details,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
} from './styles';

import marker from '../../assets/marker.png';
import uberX from '../../assets/uberx.png';

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IDestination {
  latitude: number;
  longitude: number;
  title: string;
}

Geocoder.init(googlemaps_api_key as string);

const Map: React.FC = () => {
  const mapViewRef = useRef<MapViewRef>(null);
  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [region, setRegion] = useState<IRegion | undefined>(undefined);
  const [destination, setDestination] = useState<IDestination | undefined>(
    undefined,
  );
  const [duration, setDuration] = useState(0);
  const [location, setLocation] = useState('');

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(async ({ status }) => {
      if (status === 'granted') {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();

        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        setLocation(address.substring(0, address.indexOf(',')));

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        });
      }
    });
  }, []);

  const handlePress = useCallback(
    (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
      if (details) {
        const {
          geometry: {
            location: { lat: latitude, lng: longitude },
          },
        } = details;
        setDestination({
          latitude,
          longitude,
          title: data.structured_formatting.main_text,
        });
      }
    },
    [],
  );

  const handleReady = useCallback((result: MapDirectionsResponse) => {
    setDuration(Math.floor(result.duration));
    setTimeout(() => {
      if (mapViewRef.current) {
        mapViewRef.current.fitToCoordinates(result.coordinates, {
          edgePadding: {
            top: 50,
            left: 50,
            bottom: 350,
            right: 50,
          },
        });
      }
    }, 100);
  }, []);

  const handleBack = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.clear();
    }

    setDestination(undefined);
  }, []);

  return (
    <Container>
      <SearchBox>
        {destination && (
          <Back onPress={handleBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Back>
        )}
        <InputSearch
          ref={inputRef}
          placeholder="Para onde?"
          query={{
            key: googlemaps_api_key as string,
            language: 'pt-BR',
          }}
          fetchDetails
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
          enablePoweredByContainer={false}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              flex: 1,
              backgroundColor: 'transparent',
              height: 54,
              marginHorizontal: 20,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              height: 54,
              margin: 0,
              borderRadius: 0,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { x: 0, y: 0 },
              shadowRadius: 15,
              borderWidth: 1,
              borderColor: '#DDD',
              fontSize: 18,
            },
            listView: {
              borderWidth: 1,
              borderColor: '#DDD',
              backgroundColor: '#FFF',
              marginHorizontal: 20,
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { x: 0, y: 0 },
              shadowRadius: 15,
              marginTop: 10,
            },
            description: {
              fontSize: 16,
            },
            row: {
              padding: 20,
              height: 58,
            },
          }}
          onPress={handlePress}
        />
      </SearchBox>
      <MapView
        ref={mapViewRef}
        region={region}
        showsUserLocation
        loadingEnabled
      >
        {destination && region && (
          <>
            <Directions
              apikey={googlemaps_api_key as string}
              destination={destination}
              origin={region}
              onReady={handleReady}
              strokeWidth={4}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={marker}
            >
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              anchor={{ x: 0, y: 0 }}
            >
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </MapView>
      {destination && (
        <Details>
          <TypeTitle>Popular</TypeTitle>
          <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

          <TypeImage source={uberX} />
          <TypeTitle>Uber X</TypeTitle>
          <TypeDescription>R$ 15,64</TypeDescription>

          <RequestButton
            onPress={() => {
              console.log('CLICADO');
            }}
          >
            <RequestButtonText>SOLICITAR UBER X</RequestButtonText>
          </RequestButton>
        </Details>
      )}
    </Container>
  );
};

export default Map;
