import { exec } from "child_process";
import fs from "fs";
import path from "path";

const runCodeInDocker = (language, code, input) => {
  const codeFilePath = path.join(__dirname, `temp_code.${language === 'cpp' ? 'cpp' : 'py'}`);
  
  // Save the code to a temporary file
  fs.writeFileSync(codeFilePath, code);

  return new Promise((resolve, reject) => {
    // Execute Docker command
    exec(`docker run --rm -v ${codeFilePath}:/usr/src/app/code.${language} ubuntu /usr/src/app/execute_code.sh ${language} /usr/src/app/code.${language} "${input}"`,
      (error, stdout, stderr) => {
        if (error) {
          return reject(`Execution error: ${stderr}`);
        }
        resolve(stdout);
      }
    );
  });
};

export default runCodeInDocker;
