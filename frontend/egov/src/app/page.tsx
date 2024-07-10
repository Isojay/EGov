import React, {useEffect} from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import HomePage from "@/app/components/Homepage";
import AuthenticatedDataComponent from "@/app/components/AuthenticatedDataComponent";

const HomePageLayout: React.FC = () => {



    return (
        <>
            <HomePage/>
        </>
    );
};

export default HomePageLayout;
