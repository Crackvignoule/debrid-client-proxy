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
      debridedLink: item.link,
    }));
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
