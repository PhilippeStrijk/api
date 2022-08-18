const generateSmsOTP = (): number => {
    return Math.floor(Math.random() * 899999 + 100000);
};

export default generateSmsOTP;