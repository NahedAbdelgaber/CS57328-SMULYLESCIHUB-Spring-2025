# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Gradle wrapper files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Build the application
RUN ./gradlew build -x test

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./gradlew", "bootRun"] 