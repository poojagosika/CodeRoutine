# Use an official image as a parent image
FROM ubuntu:latest

# Install required languages and tools
RUN apt-get update && \
    apt-get install -y g++ python3 python3-pip && \
    apt-get clean

# Create a directory for storing code
WORKDIR /usr/src/app

# Copy the language-specific execution scripts
COPY ./languages /usr/src/app/languages
COPY ./execute_code.sh /usr/src/app/execute_code.sh

# Make the execution script executable
RUN chmod +x /usr/src/app/execute_code.sh

ENTRYPOINT ["/usr/src/app/execute_code.sh"]
