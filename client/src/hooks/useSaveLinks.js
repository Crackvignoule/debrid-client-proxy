import { saveLinks as apiSaveLinks } from "../api"; // Renamed imported function
import { toast } from 'react-hot-toast';

const useSaveLinks = () => {
    const saveLinks = (links) => {
        return toast.promise(
            apiSaveLinks(links), // Use the renamed imported function
            {
                loading: 'Saving link...',
                success: <b>Link saved successfully!</b>,
                error: <b>Could not save link.</b>,
            }
        );
    }

    return { saveLinks };
}

export default useSaveLinks;