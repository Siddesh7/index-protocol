import { WagmiConfig, createClient, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Invest from "./components/Invest";
import Navbar from "./components/Navbar";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import "./App.css";
import AssetPage from "./pages/AssetPage";
import { polygonMumbai } from "wagmi/chains";

import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
const { provider, chains } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        return {
          http: "https://frosty-empty-moon.matic-testnet.discover.quiknode.pro/e2a647fe390fafe79876f8150e99411e3edaf9c3/",
        };
      },
    }),
  ]
);

const client = createClient(
  getDefaultClient({
    appName: "Canto Index",
    connectors: [
      new InjectedConnector({
        chains: chains,
      }),
      new WalletConnectConnector({
        chains: chains,
        options: {
          qrcode: false,
        },
      }),
    ],
    provider,
  })
);

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/invest/:address" element={<AssetPage />} />
          </Routes>
        </BrowserRouter>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default App;
