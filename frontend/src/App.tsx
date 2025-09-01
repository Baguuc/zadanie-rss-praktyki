import { Route, Routes } from "react-router";
import "./App.css";
import { ChannelsProvider } from "./store/local-channels/providers";
import ChannelListScreen from "./pages/channel/ListScreen";
import ChannelCreateScreen from "./pages/channel/CreateScreen";
import ChannelViewScreen from "./pages/channel/ViewScreen";
import ArticlesListScreen from "./pages/articles/ListScreen";
import ChannelCheckScreen from "./pages/channel/CheckScreen";
import Index from "./pages/Index";

function App() {
  return (
    <ChannelsProvider>
      <Routes>
        <Route index element={<Index />} />
        <Route path="channels">
          <Route index element={<ChannelListScreen />} />
          <Route path="create" element={<ChannelCreateScreen />} />
          <Route path=":channelId">
            <Route index element={<ChannelViewScreen />} />
            <Route path="articles" element={<ArticlesListScreen />} />
          </Route>
          <Route path="check" element={<ChannelCheckScreen />} />
        </Route>
      </Routes>
    </ChannelsProvider>
  );
}

export default App;
