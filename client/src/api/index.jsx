import { checkApiKey, auth, checkPin } from "./apiKey";
import getMagnetID from "./getMagnetId";
import { debridLinks, debridMagnet } from "./debrid";
import { fetchLinks, deleteLinks, saveLinks, getHistory } from "./manageLinks";

export {
  auth,
  checkPin,
  checkApiKey,
  getMagnetID,
  saveLinks,
  debridLinks,
  debridMagnet,
  fetchLinks,
  deleteLinks,
  getHistory,
};
