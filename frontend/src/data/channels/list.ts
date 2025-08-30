import { invoke } from "@tauri-apps/api/core";
import { Channel } from ".";

async function listSavedChannels() {
  return await invoke("list_channels") as Channel[];
}

export default listSavedChannels;
