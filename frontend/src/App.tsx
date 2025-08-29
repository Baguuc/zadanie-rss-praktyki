import { Route, Routes } from "react-router";
import "./App.css";
import ChannelSelectionScreen from "./screens/ChannelSelectionScreen";
import ChannelCreateScreen from "./screens/ChannelCreateScreen";
import ChannelPreviewScreen from "./screens/ChannelPreviewScreen";
import ChannelMetadataEditScreen from "./screens/ChannelMetadataEditScreen";
import ChannelItemAddScreen from "./screens/ChannelItemAddScreen";
import ChannelCorrectnessCheckScreen from "./screens/ChannelCorrectnessCheckScreen";

function App() {
  return (
    <Routes>
      <Route index element={<ChannelSelectionScreen />} />
      <Route path="channels">
        <Route index element={<ChannelSelectionScreen />} />
        <Route path="create" element={<ChannelCreateScreen />} />
        <Route path=":channelId">
          <Route index element={<ChannelPreviewScreen />}  />
          <Route path="edit" element={<ChannelMetadataEditScreen />} />
          <Route path="items/add" element={<ChannelItemAddScreen />} />
        </Route>
        <Route path="check" element={<ChannelCorrectnessCheckScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
