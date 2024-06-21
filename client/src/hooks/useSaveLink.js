import { getMagnetID } from '../api';

const useSaveLink = () => {
    const saveLink = async (link) => {
        // TODO Reuse input links (not debrided) with /api/debrid/saveLinks
    }

    return { saveLink };
}

export default useSaveLink;