# CloudShare - File Sharing Platform

CloudShare simplifies file sharing by allowing users to upload files and generate short links for easy sharing with anyone, anywhere. With secure and fast file uploads, instant link generation, and one-click sharing, CloudShare ensures that your files are accessible on any device, at any time. Start sharing effortlessly today!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation Guide](#installation-guide)

## Introduction

CloudShare leverages EJS and Bootstrap for its frontend, while the backend is powered by Node.js, Express, and MongoDB, utilizing Multer for file upload and AWS S3 for cloud file storage. With CloudShare, upload files and share them instantly with anyone, anywhere.


## Features

CloudShare comes equipped with a wide range of features to enhance your file sharing experience:

1. **Authentication System**: CloudShare offers a secure authentication system that allows users to register and log in using their email and password.

2. **Password Security**: User passwords are securely stored in the database. CloudShare employs salting and hashing techniques using the Crypto module to protect user data.

3. **Authorization**: CloudShare maintains authorization across all routes using JSON Web Tokens (JWT) and cookies, ensuring that only an authorized user can access the uploaded files on our platform.

4. **Upload Files to Cloud**: Easily upload your files of any type within the allowed file size limit (50 MB) to our secure cloud storage.

5. **Generate Short Link**: Create short, shareable links for any of your uploaded files. Share these links with friends, colleagues, or anyone you choose.

6. **Download Your Files**: Access your uploaded files from anywhere in the world. Simply click on the short link to download the file you need, without the hassle of searching through your file storage.

## Installation Guide

To get started with CloudShare on your local machine, follow these installation steps:

1. **Clone the Repository**: Begin by cloning this repository to your local machine using the following command:

   ```
   git clone https://github.com/Shivek-Sharma/cloud-share.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm:

   ```
   cd cloud-share
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env` file in the root directory of the project and configure your environment variables. Here's a sample `.env` file:

   ```
   AWS_ACCESS_KEY_ID=your-aws-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret
   AWS_BUCKET_NAME=your-aws-bucket
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret
   ```

4. **Start the Application**: Run the following command to start the CloudShare application:

   ```
   npm run dev
   ```

5. **Access CloudShare**: Open your web browser and navigate to `http://localhost:3000` to access CloudShare.
