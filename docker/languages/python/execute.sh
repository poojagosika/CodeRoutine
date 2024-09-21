#!/bin/bash

CODE_FILE=$1   # Path to the Python code file
INPUT=$2       # Input for the code execution

# Execute the Python code and pass the input
python3 $CODE_FILE <<< "$INPUT"
