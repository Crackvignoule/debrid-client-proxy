import axios from "axios";

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

export const debridMagnet = async (magnetID, onProgress) => {
  const proxyEndpoint = `${PrefixUrl}/api/debrid/getLinksFromMagnet`;
  const apiKey = localStorage.getItem("apiKey");
  const headers = { "api-key": apiKey };

  try {
    const response = await axios.post(proxyEndpoint, { magnetID }, { headers });
    const links = response.data.links;
    const statusCode = response.data.statusCode;

    if (statusCode !== 4) {
      return { isPending: true };
    }

    const mappedLinks = links.map((linkObj) => linkObj.link);
    const debridedLinks = await debridLinks(mappedLinks, onProgress);

    return debridedLinks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const debridLink = async (link) => {
  const apiKey = localStorage.getItem("apiKey");
  const headers = { "api-key": apiKey };
  const proxyEndpoint = `${PrefixUrl}/api/debrid/debridLink`;

  const response = await axios.post(proxyEndpoint, { link }, { headers });
  return {
    filename: response.data.filename,
    link: link,
    link_dl: response.data.link,
  };
};

export const debridLinks = async (links, onProgress) => {
  const results = [];
  const total = links.length;

  for (let i = 0; i < links.length; i++) {
    const result = await debridLink(links[i]);
    results.push(result);
    if (onProgress) {
      onProgress({ current: i + 1, total });
    }
  }

  return results;
};

export async function getLiveStatus(sessionId, counter) {
const apiKey = localStorage.getItem("apiKey");
  const headers = { "api-key": apiKey };
  const proxyEndpoint = `${PrefixUrl}/api/magnet/status`;

  try {
    const response = await axios.get(proxyEndpoint, {
      headers,
      params: { session: sessionId, counter },
    });
    const magnets = response.data.magnets;
    const nextCounter = response.data.counter;
    const fullsync = response.data.fullsync;
  
    return { magnets, nextCounter, fullsync };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}