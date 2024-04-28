import { formatBytes } from "./formatBytes";

describe("formatBytes()", () => {
    it("should return 0 Bytes if no bytes are passed", () => {
        const bytes = 0;
        const result = formatBytes(bytes);

        expect(result).toBe("0 Bytes");
    });
    it("should return 1 Bytes if 1 byte is passed", () => {
        const bytes = 1;
        const result = formatBytes(bytes);

        expect(result).toBe("1 Bytes");
    });
    it("should return 1 KB if 1024 bytes are passed", () => {
        const bytes = 1024;
        const result = formatBytes(bytes);

        expect(result).toBe("1 KB");
    });
    it("should return 1 MB if 1048576 bytes are passed", () => {
        const bytes = 1048576;
        const result = formatBytes(bytes);

        expect(result).toBe("1 MB");
    });
    it("should return 1 GB if 1073741824 bytes are passed", () => {
        const bytes = 1073741824;
        const result = formatBytes(bytes);

        expect(result).toBe("1 GB");
    });
    it("should return 1 TB if 1099511627776 bytes are passed", () => {
        const bytes = 1099511627776;
        const result = formatBytes(bytes);

        expect(result).toBe("1 TB");
    });
    it("should return 1 PB if 1125899906842624 bytes are passed", () => {
        const bytes = 1125899906842624;
        const result = formatBytes(bytes);

        expect(result).toBe("1 PB");
    });
    it("should return 1 EB if 1152921504606846976 bytes are passed", () => {
        const bytes = 1152921504606846976;
        const result = formatBytes(bytes);

        expect(result).toBe("1 EB");
    });
    it("should return 1 ZB if 1180591620717411303424 bytes are passed", () => {
        const bytes = 1180591620717411303424;
        const result = formatBytes(bytes);

        expect(result).toBe("1 ZB");
    });
});
