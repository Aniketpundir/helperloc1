import { useState } from 'react';
import PageBanner from './PageBanner/PageBanner';
import JobDetailsForm from './JobDetailsForm/JobDetailsForm';
import './PostWork.css';

const PostWork = () => {

    return (
        <>
            <PageBanner />
                <main className="post-work__main">
                    <JobDetailsForm />
                </main>
        </>
    );
};

export default PostWork;