import fs from 'fs';
import path from 'path';
import { promises } from 'fs';4

const filename = path.join(process.cwd(), 'text.txt');

// fs.writeFileSync(filename, 'Hello Node.js');
// console.log('File created successfully');

// const read = async () => {
//   try {

//       const data = await fs.promises.readFile(filename, 'utf-8');
//       console.log(data);
//   } catch (error) {
//       console.error('Error reading file:', error);
//   }
// }
// read();

// const append = async () => {
//     try {
//         await fs.promises.appendFile(filename, '\nAppended content');
//         read();
//     } catch (error) {
//          console.error('Error appending file:', error);
//     }
// }
// append();

// const remove = async () => {
//     try {
//         await fs.promises.unlink(filename);
//         console.log('File removed successfully');
//     } catch (error) {
//         console.error('Error removing file:', error);
//     }
// }
// remove();