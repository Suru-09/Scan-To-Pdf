import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import configStore from "./redux/store";
import Navigation from "./components/navigation/Navigation";

const store = configStore

export default function App() {
  return (
      <Provider store={store}>
          <Navigation/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
