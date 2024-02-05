"use server"
import * as argon2 from 'argon2';

export interface DbTableDict {
    [id: string]: any;
}

export async function hashString(text: string) {
    const hash = await argon2.hash(text);
    return hash;
}

export async function verifyString(text: string, hashedItem: string) {
    const isValid = await argon2.verify(text, hashedItem);
    return isValid;
}

/**
export async function updateJsonFile(filePath: string, content: string): Promise<void> {
    const documentId = uuidv4()
    try {
        // Read the existing JSON file
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Add the new key-value pair
        jsonData[documentId] = JSON.parse(content);

        // Write the updated JSON back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

        console.log(`Key-value pair (${documentId}: ${content}) added to ${filePath}`);
    } catch (error: any) {
        console.error('Error updating JSON file:', error.message);
    }

}

export async function createJsonFile(filePath: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const jsonData = JSON.parse(content);
            const jsonString = JSON.stringify(jsonData, null, 2); // The third parameter (2) is for indentation spaces

            fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch (parseError) {
            reject(parseError);
        }
    });
}


export async function readJsonFile(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}
 */