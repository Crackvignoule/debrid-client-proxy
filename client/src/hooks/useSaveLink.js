import { saveLinks } from "../api";
import { toast } from 'react-hot-toast';

const useSaveLink = () => {
    const saveLink = (link) => {
        return toast.promise(
            saveLinks([link]),
            {
                loading: 'Saving link...',
                success: <b>Link saved successfully!</b>,
                error: <b>Could not save link.</b>,
            }
        );
    }

    return { saveLink };
}

export default useSaveLink;