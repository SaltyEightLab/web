import React from 'react';

const Footer = () => {
    return (
        <footer className="text-green-800 text-center px-8 py-4 mx-8 my-4 flex justify-end items-center space-x-8">
            <div>© 2024 SaltyEightLab. All rights reserved.</div>
            {/* <a href="/about" className="text-green-800">About Me</a> */}
            {/* <a href="/feedback" className="text-green-800">ご意見等</a> */}
            {/* <a href="/terms" className="text-green-800">利用規約</a> */}
            <a href="https://x.com/SaltyEightLab" target="_blank" rel="noopener noreferrer">
                <img src="/footerIcon/XlogoBig.png" alt="X Logo" className="h-12 w-12" />
            </a>
            <a href="https://qiita.com/SaltyEight" target="_blank" rel="noopener noreferrer">
                <img src="/footerIcon/qiitalogo.png" alt="Qiita Logo" className="h-8 w-8" />
            </a>
        </footer>
    );
};

export default Footer;