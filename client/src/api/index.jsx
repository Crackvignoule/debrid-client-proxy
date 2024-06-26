// TODO: Merge some api calls into one file ?
import checkApiKey from "./checkApiKey";
import getMagnetID from "./getMagnetId";
import saveLinks from "./saveLinks";
import { debridLinks, debridMagnet } from "./debrid";
import fetchLinks from "./fetchLinks";
import deleteLinks from "./deleteLinks";

export { checkApiKey, getMagnetID, saveLinks, debridLinks, debridMagnet, fetchLinks, deleteLinks };