import { getTotalByteSize } from "./getTotalByteSize";

describe("getTotalByteSize()", () => {
    it("should return 0 bytes if no files are passed", () => {
        expect(getTotalByteSize([])).toBe(0);
    });
    it("should return the total size of the files in bytes", () => {
        expect(getTotalByteSize([new File(["hello"], "hello.txt")])).toBe(5);
    });
    it("should return the total size of the files in kilobytes", () => {
        expect(
            getTotalByteSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
            ]),
        ).toBe(10);
    });
    it("should return the total size of the files in megabytes", () => {
        expect(
            getTotalByteSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
            ]),
        ).toBe(15);
    });
    it("should return the total size of the files in gigabytes", () => {
        expect(
            getTotalByteSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
            ]),
        ).toBe(20);
    });
    it("should return the total size of the files in terabytes", () => {
        expect(
            getTotalByteSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
                new File(["hello"], "hello5.txt"),
            ]),
        ).toBe(25);
    });
    it("should return the total size of the files in petabytes", () => {
        expect(
            getTotalByteSize([
                new File(["hello"], "hello.txt"),
                new File(["hello"], "hello2.txt"),
                new File(["hello"], "hello3.txt"),
                new File(["hello"], "hello4.txt"),
                new File(["hello"], "hello5.txt"),
                new File(["hello"], "hello6.txt"),
            ]),
        ).toBe(30);
    });
});
