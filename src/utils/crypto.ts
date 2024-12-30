import crypto from 'crypto';

export class CryptoDataEncryption {
  static secretKey = process.env.CRYPTO_SECRET_KEY ?? '123456789projectManagement';

  constructor() {}

  // Function to hash the secret key to 32 bytes using SHA-256
  private static generateKey(secretKey: string): Buffer {
    return crypto.createHash('sha256').update(secretKey).digest(); // Ensure 32-byte key
  }

  // Function to encrypt email content
  public encryptEmail(content: string): string {
    const key = CryptoDataEncryption.generateKey(CryptoDataEncryption.secretKey); // Use hashed key
    const iv = crypto.randomBytes(16); // 16-byte random IV for AES-256-CBC

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(content, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Return both the IV (base64) and the encrypted content (base64) in a concatenated format
    return iv.toString('base64') + ':' + encrypted;
  }

  // Function to decode encrypted email
  public decryptEmail(content: string): string {
    const [ivBase64, encryptedBase64] = content.split(':'); // Split the IV and encrypted content
    const iv = Buffer.from(ivBase64, 'base64'); // Decode the IV from base64
    const key = CryptoDataEncryption.generateKey(CryptoDataEncryption.secretKey); // Use hashed key

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Return the decrypted content
  }
}
