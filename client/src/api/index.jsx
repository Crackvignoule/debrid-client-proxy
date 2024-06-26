// TODO: Merge some api calls into one file ?
import checkApiKey from "./checkApiKey";
import getMagnetID from "./getMagnetId";
import { debridLinks, debridMagnet } from "./debrid";
import { fetchLinks, deleteLinks, saveLinks } from "./manageLinks";

export { checkApiKey, getMagnetID, saveLinks, debridLinks, debridMagnet, fetchLinks, deleteLinks };