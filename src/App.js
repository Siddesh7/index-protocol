import { WagmiConfig, createClient, goerli } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { polygonMumbai } from "wagmi/chains";
import Hero from "./components/Hero";
import "./App.css";
import Navbar from "./components/Navbar";
const chains = [polygonMumbai];

const client = createClient(
  getDefaultClient({
    appName: "Index Protocol",
    chains,
  })
);

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Navbar />
        <Hero />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
