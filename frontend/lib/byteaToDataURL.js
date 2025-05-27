/**
 * Converts binary image data to a base64 data URL for use in <img src="...">.
 * @param {Uint8Array | ArrayBuffer} byteaBuffer - The binary image data.
 * @param {string} mimeType - The image MIME type (e.g., "image/png").
 * @returns {string} - A data URL string usable in <img src="...">.
 */
export default function byteaToDataURL(byteaBuffer, mimeType) {
    let uint8Array;
    if (byteaBuffer instanceof ArrayBuffer) {
        uint8Array = new Uint8Array(byteaBuffer);
    } else if (byteaBuffer instanceof Uint8Array) {
        uint8Array = byteaBuffer;
    } else {
        throw new TypeError('Input must be an ArrayBuffer or Uint8Array');
    }

    const binary = String.fromCharCode(...uint8Array);
    const base64 = btoa(binary);
    return `data:${mimeType};base64,${base64}`;
}
