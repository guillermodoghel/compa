## Installation

*	**Clone and install packages**
```
git clone https://estoussel@bitbucket.org/estoussel/gpsalarm.git
cd mangotea
yarn or npm install [Not tested. best of lucks with this.]
react-native link react-native-vector-icons [Not tested on last release]
```

*	**Run on iOS**
	*	Opt #1:
		*	Open the project in Xcode from `ios/mangotea.xcworkspace`
		*	Click `run` button to simulate
		* If random errors, check this out:
			* https://github.com/facebook/react-native/issues/18638#issuecomment-377955130
	*	Opt #2:
		*	Run `react-native run-ios` in your terminal


*	**Run on Android**
	*	Make sure you have an `Android emulator` installed and running
  * Update your sdk dir in `/android/local.properties`
	*	Run `react-native run-android` in your terminal
