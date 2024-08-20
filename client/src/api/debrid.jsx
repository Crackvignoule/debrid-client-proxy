import axios from "axios";

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

export const debridMagnet = async (magnetID) => {
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

    const debridedLinks = await debridLinks(
      links.map((linkObj) => linkObj.link)
    );

    return debridedLinks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const debridLinks = async (links) => {
  const apiKey = localStorage.getItem("apiKey");
  const headers = { "api-key": apiKey };
  const proxyEndpoint = `${PrefixUrl}/api/debrid/debridLinks`;

  try {
    const response = await axios.post(proxyEndpoint, { links }, { headers });
    const debridedLinks = response.data.debridedLinks;
    const result = debridedLinks.map((item, index) => ({
      filename: item.filename,
      link: links[index],
      link_dl: item.link,
    }));
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
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