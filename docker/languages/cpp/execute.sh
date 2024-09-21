#!/bin/bash

CODE_FILE=$1
INPUT=$2

# Compile the C++ code
g++ $CODE_FILE -o /usr/src/app/output

# Check if compilation was successful
if [ $? -ne 0 ]; then
  echo "Compilation Error"
  exit 1
fi

# Run the compiled binary with the provided input
echo "$INPUT" | ./output
