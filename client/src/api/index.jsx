import { checkApiKey, auth, checkPin } from "./apiKey";
import getMagnetID from "./getMagnetId";
import { debridLinks, debridMagnet } from "./debrid";
import { fetchLinks, deleteLinks, saveLinks, deleteMagnet, getHistory } from "./manageLinks";

export {
  auth,
  checkPin,
  checkApiKey,
  getMagnetID,
  saveLinks,
  debridLinks,
  debridMagnet,
  deleteMagnet,
  fetchLinks,
  deleteLinks,
  getHistory,
};
