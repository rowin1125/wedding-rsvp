import { getFormattedTotalFilesSize } from "./getFormattedTotalFilesSize";

describe("getFormattedTotalFilesSize", () => {
    it("should return 0 bytes if no files are passed", () => {
        expect(getFormattedTotalFilesSize([])).toBe("0 Bytes");
    });
    it("should return the total size of the files in bytes", () => {
        expect(
            getFormattedTotalFilesSize([new File(["hello"], "hello.txt")]),
        ).toBe("5 Bytes");
    });
    it("should return the total size of the files in kilobytes", () => {
        expect(
            getFormattedTotalFilesSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
            ]),
        ).toBe("10 Bytes");
    });
    it("should return the total size of the files in megabytes", () => {
        expect(
            getFormattedTotalFilesSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
            ]),
        ).toBe("15 Bytes");
    });
    it("should return the total size of the files in gigabytes", () => {
        expect(
            getFormattedTotalFilesSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
            ]),
        ).toBe("20 Bytes");
    });
    it("should return the total size of the files in terabytes", () => {
        expect(
            getFormattedTotalFilesSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
                new File(["hello"], "hello5.txt"),
            ]),
        ).toBe("25 Bytes");
    });
    it("should return the total size of the files in petabytes", () => {
        expect(
            getFormattedTotalFilesSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
                new File(["hello"], "hello5.txt"),
                new File(["hello"], "hello6.txt"),
            ]),
        ).toBe("30 Bytes");
    });
    it("should return the total size of the files in exabytes", () => {
        expect(
            getFormattedTotalFilesSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
                new File(["hello"], "hello5.txt"),
                new File(["hello"], "hello6.txt"),
                new File(["hello"], "hello7.txt"),
            ]),
        ).toBe("35 Bytes");
    });
});
