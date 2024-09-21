import fs from "fs"; // Import fs module for file operations
import { exec } from "child_process"; // Import exec to run shell commands

// Merge user's code into the template
const createCompleteCode = (userCode, problemTemplate) => {
  return problemTemplate.replace("// Your code here", userCode);
};

// Function to execute the complete code (for C++ or Python as examples)
export const runCode = async (userCode, testCases, language) => {
  let problemTemplate;

  // Define code templates for different languages
  switch (language) {
    case "cpp":
      problemTemplate = `
class Solution {
public:
    string shortestPalindrome(string s) {
        // Your code here
    }
};

int main() {
    Solution solution;
    string result = solution.shortestPalindrome("%s");
    cout << result;
    return 0;
}
      `;
      break;
    case "python":
      problemTemplate = `
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        # Your code here
        pass

if __name__ == "__main__":
    solution = Solution()
    result = solution.shortestPalindrome("%s")
    print(result)
      `;
      break;
    // Add other languages like Java, JavaScript here
    default:
      throw new Error("Unsupported language");
  }

  // Merge user's code into the selected template
  const completeCode = createCompleteCode(userCode, problemTemplate);

  // Write the complete code to a file
  const fileName = language === "cpp" ? "Solution.cpp" : "Solution.py"; // Python and C++
  fs.writeFileSync(fileName, completeCode);

  // Execute the code and handle test cases
  return new Promise((resolve, reject) => {
    let command;

    if (language === "cpp") {
      command = `g++ ${fileName} -o Solution && ./Solution`;
    } else if (language === "python") {
      command = `python3 ${fileName}`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || "Error occurred during execution");
      } else {
        resolve(stdout.trim());
      }
    });
  });
};
