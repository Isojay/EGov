import React from 'react';
import { FaEnvelope, FaPhone, FaFileAlt, FaQuestionCircle } from 'react-icons/fa';

const LearnMore: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <main className="w-4/5 bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-5xl font-bold mb-8 text-center text-blue-600">Learn More</h1>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 flex items-center">
                        <FaFileAlt className="mr-3 text-blue-500" /> Overview of Birth and Death Registration
                    </h2>
                    <p className="mb-4 text-lg">Registering births and deaths is crucial for legal recognition and access to various benefits and services.</p>
                    <p className="text-lg">Our platform provides an easy and streamlined process for registering births and deaths in [Location/Country].</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 flex items-center">
                        <FaFileAlt className="mr-3 text-blue-500" /> Step-by-Step Guides
                    </h2>
                    <h3 className="text-2xl font-semibold mb-4">How to Register a Birth</h3>
                    <p className="mb-4 text-lg">Follow these steps to register a birth:</p>
                    <ul className="list-disc list-inside mb-8 text-lg space-y-2">
                        <li>Step 1: Collect required documents</li>
                        <li>Step 2: Fill out the birth registration form</li>
                        <li>Step 3: Submit the form and documents to the local registration office</li>
                        <li>Step 4: Receive the birth certificate</li>
                    </ul>
                    <h3 className="text-2xl font-semibold mb-4">How to Register a Death</h3>
                    <p className="mb-4 text-lg">Follow these steps to register a death:</p>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>Step 1: Collect required documents</li>
                        <li>Step 2: Fill out the death registration form</li>
                        <li>Step 3: Submit the form and documents to the local registration office</li>
                        <li>Step 4: Receive the death certificate</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 flex items-center">
                        <FaQuestionCircle className="mr-3 text-blue-500" /> Frequently Asked Questions (FAQs)
                    </h2>
                    <p className="mb-4 text-lg"><strong>Q: What documents are required to register a birth?</strong></p>
                    <p className="mb-8 text-lg">A: You need a birth certificate from the hospital, parents' identification, and proof of residence.</p>
                    <p className="mb-4 text-lg"><strong>Q: How long does it take to process a death registration?</strong></p>
                    <p className="text-lg">A: It typically takes 5-7 business days to process and issue a death certificate.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 flex items-center">
                        <FaPhone className="mr-3 text-blue-500" /> Contact Information
                    </h2>
                    <p className="mb-4 text-lg">If you have any questions or need further assistance, please contact our support team:</p>
                    <p className="mb-2 text-lg flex items-center"><FaEnvelope className="mr-2" /> Email: <a href="mailto:support@birthdeathregistry.com" className="text-blue-500 hover:underline">support@birthdeathregistry.com</a></p>
                    <p className="text-lg flex items-center"><FaPhone className="mr-2" /> Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+123-456-7890</a></p>
                </section>
            </main>
        </div>
    );
};

export default LearnMore;
