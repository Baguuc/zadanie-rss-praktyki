import { Route, Routes } from "react-router";
import "./App.css";
import ChannelSelectionScreen from "./pages/ChannelSelectionScreen";
import ChannelCreateScreen from "./pages/ChannelCreateScreen";
import ChannelPreviewScreen from "./pages/ChannelPreviewScreen";
import ChannelMetadataEditScreen from "./pages/ChannelMetadataEditScreen";
import ChannelItemAddScreen from "./pages/ChannelItemAddScreen";
import ChannelCorrectnessCheckScreen from "./pages/ChannelCorrectnessCheckScreen";
import { ChannelsProvider } from "./store/local-channels/providers";

function App() {
  return (
    <ChannelsProvider>
      <Routes>
        <Route index element={<ChannelSelectionScreen />} />
        <Route path="channels">
          <Route index element={<ChannelSelectionScreen />} />
          <Route path="create" element={<ChannelCreateScreen />} />
          <Route path=":channelId">
            <Route index element={<ChannelPreviewScreen />} />
            <Route path="edit" element={<ChannelMetadataEditScreen />} />
            <Route path="items/add" element={<ChannelItemAddScreen />} />
          </Route>
          <Route path="check" element={<ChannelCorrectnessCheckScreen />} />
        </Route>
      </Routes>
    </ChannelsProvider>
  );
}

export default App;
