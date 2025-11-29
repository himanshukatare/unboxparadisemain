import { useEffect, useState } from 'react';

const useContactDetails = () => {
    const [contactDetails, setContactDetails] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetch('/resource/config/contactdetails.json')
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setContactDetails(data);
                }
            })
            .catch((error) => console.error('Error loading contact details:', error));

        return () => {
            isMounted = false;
        };
    }, []);

    return contactDetails;
};

export default useContactDetails;
