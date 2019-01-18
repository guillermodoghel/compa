export default {
  container: {

  },
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 15,
  },
  marker: {

  },
  searchDialog: {
    width: '90%',
    borderBottomWidth: 0,
    borderColor: 'transparent',
  },
  markerIOSHack: {
    height: 75,
    width: 75,
  },
  crosshairIOSHack: {
    height: 50,
    width: 50,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -37.5,
    marginTop: -70,
    position: 'absolute',
    top: '50%',
  },
  sliderDialog: {
    borderBottomWidth: 0,
  },
  track: {
    height: 4,

  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 30 / 2,
  },
  slidercontainer: {
    height: 30,
    top: '25%',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    borderBottomWidth: 0,
  },
  cardContainer: {
    flexWrap: null,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadowColor: 'transparent',
    marginTop: 20,
  },
  cardOptions: {
    backgroundColor: '#446342',
  },
  cardHeader: {
    backgroundColor: '#38414e',
  },

  GooglePlacesAutocomplete: {
    listView: { backgroundColor: 'transparent' },
    textInputContainer: {
      width: '100%',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    description: {
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
    predefinedPlacesDescription: {
      backgroundColor: 'transparent',
  //    backgroundColor: '#fff',
  //    color: '#1faadb',
    },
    textInput: {
      color: '#5d5d5d',
      fontSize: 16,
      backgroundColor: 'transparent',
    },
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 20,
    width: '90%',
    marginLeft: '5%',
    top: '20%',
    zIndex: 1000,

  },
  bubbleDistance: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    width: '50%',
    marginLeft: '20%',
    top: '20%',

  },
  bubbleRage: {
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    borderRadius: 20,
    width: '30%',
    top: '25%',

  },
  latlng: {
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    paddingVertical: 12,

  },
  distance: {
    fontFamily: 'digital-7',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    fontSize: 50,
  },

  customStyle: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ],
};
