import React from 'react';
import RegisterUserInquiry from '../component/RegisterUserInquiry';
import useContactDetails from '../hooks/useContactDetails';

const ContactUsPage = () => {
    const contactDetails = useContactDetails();

    return (
        <div className="min-h-full">
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative" 
                  style={{ paddingTop: '120px', minHeight: 'calc(100vh - 120px)' }}>
                <RegisterUserInquiry contactDetails={contactDetails} />
            </main>
        </div>
    );
};

export default ContactUsPage;
