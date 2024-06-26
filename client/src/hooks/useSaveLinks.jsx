import { saveLinks as apiSaveLinks } from "../api";
import { toast } from 'react-hot-toast';

const useSaveLinks = () => {
    const saveLinks = (links) => {
        return toast.promise(
            apiSaveLinks(links),
            {
                loading: 'Saving link(s)...',
                success: <b>Link(s) saved successfully!</b>,
                error: <b>Could not save link(s).</b>,
            }
        );
    }

    return { saveLinks };
}

export default useSaveLinks;