import axios from "axios";

export const debridMagnet = async (magnetID) => {
  const proxyEndpoint = `/api/debrid/getLinksFromMagnet`;
  const apiKey = localStorage.getItem('apiKey');
  const headers = { 'api-key': apiKey };

  try {
    const response = await axios.post(proxyEndpoint, { magnetID }, { headers });
    const links = response.data.links;
    const statusCode = response.data.statusCode;
    
    if (statusCode !== 4) {
      return { isPending: true };
    }
    
    const debridedLinks = await debridLinks(links.map(linkObj => linkObj.link));
    
    return debridedLinks;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
};

export const debridLinks = async (links) => {
    const apiKey = localStorage.getItem('apiKey');
    const headers = { 'api-key': apiKey };
    const proxyEndpoint = `/api/debrid/debridLinks`;

    try {
      const response = await axios.post(proxyEndpoint, { links }, { headers });
      const debridedLinks = response.data.debridedLinks;
      const result = debridedLinks.map(
        ({ data: { filename, link } }, index) => ({
          filename,
          link: links[index],
          debridedLink: link,
        })
      );
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }