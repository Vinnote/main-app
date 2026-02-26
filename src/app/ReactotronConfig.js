import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'VinNote',
  onConnect: () => {
    console.log('Reactotron connected');
  },
})
.useReactNative()
.connect();

export default Reactotron;
