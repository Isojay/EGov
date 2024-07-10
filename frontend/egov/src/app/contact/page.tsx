import React from 'react';

const ContactUs = () => {
    return (
        <section className="mt-8 max-w-3xl  mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">If you have any questions or need assistance, feel free to reach out:</p>
            <ul className="text-gray-700">
                <li className="mb-2">Email: <a href="mailto:contact@example.com"
                                               className="text-blue-500 hover:underline">contact@example.com</a></li>
                <li className="mb-2">Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234)
                    567-890</a></li>
                <li className="mb-2">Office Address: 123 Main Street, City, Country</li>
            </ul>
            <p className="mt-4 text-gray-700">Support Hours: Monday to Friday, 9:00 AM - 5:00 PM (GMT+0)</p>
            <p className="mt-4 text-gray-700">For emergencies outside office hours, please call <a
                href="tel:+1122334455" className="text-blue-500 hover:underline">+1 (122) 334-455</a>.</p>
            <br/><br/>
        </section>
    );
};

export default ContactUs;
