import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fileCreation = () => {
    rl.question('Enter the file name: ', (fileName) => {
        rl.question('Enter the content for the file: ', (fileContent) => {
            fs.writeFile(`${fileName}.txt`, fileContent, (err) => {
                if (err) {
                    console.error("Error creating file:", err);
                } else {
                    console.log(`File "${fileName}.txt" created successfully.`);
                }
            });
        });
        rl.close();
    });
}
fileCreation();

