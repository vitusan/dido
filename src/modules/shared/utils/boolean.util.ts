export default class BooleanUtil {
    static getBoolean(value: any) {
        typeof value === 'string' && (value = value.toLowerCase());
        switch (value) {
            case true:
            case 'true':
            case 1:
            case '1':
            case 'on':
            case 'yes':
                return true;
            default:
                return false;
        }
    }
}
