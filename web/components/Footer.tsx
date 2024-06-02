import React from 'react';

const Footer = () => {
    return (
        <footer className="text-green-800 text-center px-8 py-4 mx-8 my-4 flex justify-end items-center space-x-8">
            <div>© 2023 Your Company. All rights reserved.</div>
            <a href="/about" className="text-green-800">About Me</a>
            <a href="/feedback" className="text-green-800">ご意見等</a>
            <a href="/terms" className="text-green-800">利用規約</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src="/footerIcon/XlogoBig.png" alt="X Logo" className="h-8 w-8" />
            </a>
            <a href="https://note.com" target="_blank" rel="noopener noreferrer">
                <img src="/footerIcon/notelogoBig.png" alt="Note Logo" className="h-8 w-8" />
            </a>
        </footer>
    );
};

export default Footer;