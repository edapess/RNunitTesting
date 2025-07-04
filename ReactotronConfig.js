import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure()
  .useReactNative({
    networking: {
      ignoreUrls: /^(.*(google\.com|apple\.com|localhost|127\.0\.0\.1).*)$/i,
    },
  })
  .use(reactotronRedux())
  .connect();
export default reactotron;
