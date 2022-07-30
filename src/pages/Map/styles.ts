import styled from 'styled-components/native';
import Map from 'react-native-maps';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { css } from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;

export const SearchBox = styled.View`
  position: absolute;
  top: ${Platform.select({ ios: 60, android: 40 })}px;
  width: 100%;
  z-index: 1;
  flex-direction: row;
  align-items: center;
`;

export const Back = styled.TouchableOpacity`
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const InputSearch = styled(GooglePlacesAutocomplete)``;

export const MapView = styled(Map)`
  flex: 1;
`;

export const Directions = styled(MapViewDirections)``;

export const LocationBox = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex-direction: row;
  ${Platform.select({
    ios: css`
      margin-top: 20px;
    `,
    android: css`
      margin-top: 10px;
      margin-left: 10px;
    `,
  })}
`;

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
`;

export const LocationTimeBox = styled.View`
  background: #222;
  padding: 3px 8px;
`;

export const LocationTimeText = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

export const LocationTimeTextSmall = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: center;
`;

export const Details = styled.View`
  background: #fff;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 20px;
`;

export const TypeTitle = styled.Text`
  font-size: 20px;
  color: #222;
`;

export const TypeDescription = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const TypeImage = styled.Image`
  height: 80px;
  margin: 10px 0;
`;

export const RequestButton = styled.TouchableOpacity`
  background: #222;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10px;
`;

export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
