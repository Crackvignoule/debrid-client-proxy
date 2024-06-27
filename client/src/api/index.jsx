import { checkApiKey } from "./apiKey";
import getMagnetID from "./getMagnetId";
import { debridLinks, debridMagnet } from "./debrid";
import { fetchLinks, deleteLinks, saveLinks, getHistory } from "./manageLinks";

export {
  checkApiKey,
  getMagnetID,
  saveLinks,
  debridLinks,
  debridMagnet,
  fetchLinks,
  deleteLinks,
  getHistory,
};
