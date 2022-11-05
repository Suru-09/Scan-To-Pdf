import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigation from "./components/navigation/Navigation";

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
