import { toast } from 'react-hot-toast';

const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to clipboard 👌');
    });
  };

  const exportLinksAsTxt = () => {
    const allLinks = debridResult.map(item => item.debridedLink).join('\n');
    const blob = new Blob([allLinks], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'debrided_links.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const downloadAllLinks = () => {
    debridResult.forEach((item, index) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = item.debridedLink;
      iframe.id = `downloadIframe-${index}`;
      document.body.appendChild(iframe);
    });
    toast.success('All links are being opened');
  };

export { copyToClipboard, exportLinksAsTxt, downloadAllLinks }