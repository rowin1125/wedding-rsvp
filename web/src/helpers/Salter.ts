export class Salter {
    private key: CryptoKey | null = null;
    private salt = 'cm1hibp3p000j6jsvive4zr1d';

    constructor(salt?: string) {
        this.salt = salt || this.salt;
    }

    private async getKey(): Promise<CryptoKey> {
        if (!this.key) {
            const encoder = new TextEncoder();
            const keyMaterial = await crypto.subtle.importKey(
                'raw',
                encoder.encode(this.salt),
                'PBKDF2',
                false,
                ['deriveBits', 'deriveKey']
            );

            this.key = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: encoder.encode('salt'),
                    iterations: 100000,
                    hash: 'SHA-256',
                },
                keyMaterial,
                { name: 'AES-GCM', length: 256 },
                false,
                ['encrypt', 'decrypt']
            );
        }
        return this.key;
    }

    async saltString(input: string): Promise<string> {
        const encoder = new TextEncoder();
        const key = await this.getKey();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encoder.encode(input)
        );

        const encryptedArray = new Uint8Array(encrypted);
        const result = new Uint8Array(iv.length + encryptedArray.length);
        result.set(iv);
        result.set(encryptedArray, iv.length);

        return this.bufferToBase64(result);
    }

    async parseString(encrypted: string): Promise<string> {
        try {
            const data = this.base64ToBuffer(encrypted);
            const iv = data.slice(0, 12);
            const encryptedData = data.slice(12);

            const key = await this.getKey();
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                encryptedData
            );

            const decoder = new TextDecoder();
            return decoder.decode(decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            return '';
        }
    }

    private bufferToBase64(buffer: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    }

    private base64ToBuffer(base64: string): Uint8Array {
        const binaryString = atob(base64);
        return new Uint8Array(binaryString.length).map((_, i) =>
            binaryString.charCodeAt(i)
        );
    }
}
