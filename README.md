# House Plan

A Node.js application for a house plan selling platform is a robust, server-side solution that provides the backend functionality for web application.

## Table of Contents

1. Introduction
2. Features
3. Prerequisites
4. Installation
5. Usage
6. API Documentation
7. Configuration

## 1. Introduction

A Node.js application for a house plan selling platform is a robust, server-side solution that provides the backend functionality for your web application.

1. **Access to Diverse House Plans:** Users can explore a wide range of house plans, offering different styles, sizes, and layouts to find the one that best fits their needs and preferences.

2. **Inspiration and Ideas:** Users can gather inspiration and ideas for their dream homes by browsing through a variety of house plans, which can be particularly valuable for those planning to build or renovate their homes.

3. **Time and Cost Savings:** Users can save time and money by starting with existing house plans rather than creating designs from scratch, reducing the need for expensive architectural services.

4. **Efficient Decision-Making:** Detailed information, including floor plans, dimensions, and 3D renderings, empowers users to make well-informed decisions regarding their construction or renovation projects.

5. **Comparison and Reviews:** Users can compare multiple house plans side by side and read reviews and ratings from others who have built the same plans, aiding in the decision-making process.

## 2. Features

Users provide their specific requirements and preferences, including the number of rooms, room sizes, architectural style, and any unique features they desire.
Users can browse through various house plans, apply filters (e.g., style, size, or price range), and view detailed information about each plan.
Users can quickly preview house plans with images and key details without going through a lengthy process.
Users can add multiple house plans to their shopping cart, similar to an e-commerce platform. The cart displays the selected plans with pricing information.

## 3. Prerequisites

IN this app typically includes software, libraries, or configurations.

- **Node.js:** Provide the 18.12.1 required Node.js version.
- **npm:** Provide the 9.8.1 required Node.js version.
- **MongoDB:**
  To establish a connection to a MongoDB cluster using a connection string, you need to have specific prerequisites and understand the components of the connection string.

1. **_MongoDB Atlas Account:_** MongoDB Atlas is a cloud-based database service. To connect to a MongoDB cluster, you need to have an active MongoDB Atlas account. If you are using a different MongoDB service or a self-hosted cluster, you need access to the cluster's connection details.

2. **_Cluster Setup:_** You should have a MongoDB cluster created and configured within your MongoDB Atlas account or another hosting environment.

**Components of a MongoDB Connection String:**

A MongoDB connection string typically includes the following components:

1. **_Protocol:_** The connection string should specify the protocol, which is usually "mongodb+srv://" for MongoDB Atlas or "mongodb://" for self-hosted MongoDB clusters.

2. **_Username and Password:_** You need the username and password of a user with the appropriate permissions to access the cluster. These credentials should be provided in the connection string.

3. **_Cluster Hostname:_** The cluster hostname or IP address should be part of the connection string. This is where the MongoDB cluster is located.

4. **_Port:_** Specify the port number used to connect to the MongoDB cluster. The default MongoDB port is 27017, but it may vary depending on your configuration.

5. **_Database Name:_** Mention the name of the database to which you want to connect. It's essential to specify the database you intend to work with.

6. **_Additional Options:_** You can include optional query parameters in the connection string, such as SSL settings, connection pool options, and more.

Here is an example of a MongoDB Atlas connection string:
mongodb+srv://<username>:<password>@clustername.mongodb.net/<dbname>

- **s3 Bucket:**
  When using Amazon S3 (Simple Storage Service) to store images or any other type of data, you will need both access keys and the proper security settings to ensure that your data is stored and accessed securely. Here are the prerequisites and steps to follow:

  1.  **_AWS Account:_** You must have an Amazon Web Services (AWS) account. If you don't have one, you can sign up for an AWS account.

  2.  **_IAM User:_** Create an IAM (Identity and Access Management) user with the necessary permissions to access your S3 bucket.

      - Sign in to the AWS Management Console.
      - Open the IAM console.
      - Create a new user.
      - Attach policies that grant the required S3 permissions to this user.
      - Make a note of the Access Key ID and Secret Access Key for this user; you will need them to access S3 programmatically.

  3.  **_S3 Bucket:_**
      Create an S3 bucket to store your images. Configure the bucket's permissions to control who can access the data.

  4.  **_Access Key and Secret Access Key:_** You'll need the Access Key ID and Secret Access Key associated with your IAM user.

  **_S3 Bucket Configuration:_**

    In the AWS S3 console, select the bucket you created.
    Configure the bucket's permissions to allow or deny access to specific users, roles, or the public. You can use bucket policies and access control lists (ACLs) to define these permissions.

  1.  **_Bucket Policies:_**

      - You can set a bucket policy to define who can access objects in the bucket. Make sure to configure the policy to allow the specific IAM user you created to access the bucket. For example, you can specify the user's ARN (Amazon Resource Name) in the policy.

  2.  **_Access Control Lists (ACLs):_**

      - You can set access control lists on individual objects within the bucket, further specifying which users or entities can access each object.

  3.  **_Encryption:_**

      - Consider enabling encryption for the data stored in the bucket. You can use server-side encryption to protect the data at rest.

  4.  **_Access from Code:_**
      - When accessing the S3 bucket from your code (e.g., to upload or retrieve images), use the Access Key ID and Secret Access Key associated with your IAM user. You can use AWS SDKs or APIs to interact with S3 from your application.

 - **SMTP Email setup:**
  When setting up SMTP (Simple Mail Transfer Protocol) for an email service, you need specific details and prerequisites to configure your email sending system correctly.

1. **_Email Service Provider:_** You should have an email service provider (ESP) or access to an SMTP server to send emails. Common ESPs include Gmail, Outlook (Microsoft 365), Amazon SES, or custom SMTP servers.

2. **_Email Account:_** You'll need an active email account associated with your ESP or SMTP server.

 **_SMTP Configuration Details:_**

1. **_SMTP Host (Server):_** This is the hostname or IP address of the SMTP server provided by your ESP or SMTP service. It determines where your outgoing emails are routed.

2. **_SMTP Port:_**
   The specific port depends on your ESP or SMTP service provider. Typically, Port 587 is used for secure email sending with STARTTLS.

3. **_SMTP Username:_** This is the username associated with your email account. It's required to authenticate with the SMTP server to send emails. The username is usually your full email address (e.g., yourname@example.com).

4. **_SMTP Password:_** The corresponding password for the SMTP username. It's used for SMTP server authentication. Keep this password secure and do not expose it in your code.

**Steps for SMTP Email Setup:**

1. **_Log in to Your ESP:_** Access your email account through the web interface provided by your ESP (e.g., Gmail, Outlook).

2. **_Enable SMTP Access:_** Some ESPs may require you to enable SMTP access or generate an "App Password" for applications that use SMTP for sending emails.

3. **_SMTP Server Configuration:_** Configure code to use the SMTP host, port, username, and password obtained from your ESP.

## 4. Installation

1. **Clone the repository:**
   git clone https://github.com/kanani-bhargav/HousePlan.git

2. **Navigate to the project directory:**
   cd HousePlan

3. **Install project dependencies:**
   npm install

## 5. Usage

- **Start the application:**
  npm start

## 6. API Documentation

If your project includes an API, provide detailed documentation. Describe endpoints, request/response formats, and any authentication requirements.

- `GET /api/resource`: [Description of the endpoint]
- `POST /api/resource`: [Description of the endpoint]
- [List all API endpoints and their descriptions.]

- **For detailed API documentation, please refer to [API Documentation](api-doc.md).**

## 7. Configuration.

- **Create a `.env` file:** Users may need to create a `.env` file in the project root and specify configuration variables.

***replace [detail] with user input detail***
 - **Take reference 3. Prerequisites / mongodb**
- [x]   MONGODB_URL= [mongodbUrl] 
- [x] PORT=[port](eg.4000)
- [x] BASE_URL=https://[ip:port]

- [x] JWT_SECRET_KEY= [jwt-secret-key]
 - **Take reference 3. Prerequisites / SMTP Email setup**
- [x] SMTP_HOST=smtp.gmail.com 
- [x] SMTP_PORT=587
- [x] SMTP_USERNAME= [useremail@gmail.com]
- [x] SMTP_PASSWORD= [smtp-password]
- [x] EMAIL_FROM=['[user-name] <[useremail@gmail.com]>']
 - **Take reference 3. Prerequisites / s3 Bucket**
- [x] AWS_ACCESS_KEY=[user_aws_access_key] 
- [x] AWS_SECRET_KEY=[user_aws_secret_key]
- [x] AWS_REGION= [region]
- [x] AWS_BUCKET_NAME=[bucket_name]
- [x] IMAGE_URL=https://[user_s3_bucket_name].s3.[user_region].amazonaws.com
