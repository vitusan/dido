var AES = require("crypto-js/aes");

export default class CryptoUtil {
    static encrypt(key: string, textToEncrypt: string): string {
        return AES.encrypt(textToEncrypt, key).toString();
    }

    static decrypt(key: string, textToDecrypt: string): any {
        const bytes = AES.decrypt(textToDecrypt, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
