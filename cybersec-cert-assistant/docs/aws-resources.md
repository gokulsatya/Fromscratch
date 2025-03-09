# AWS Resources for Cybersecurity Certification Assistant

This document tracks all AWS resources used in the Cybersecurity Certification Assistant project.

## IAM Resources

- User: cybersec-cert-assistant-user
  - Purpose: Programmatic access for development
  - Permissions: 
    - AmazonS3ReadOnlyAccess
    - AmazonDynamoDBFullAccess
    - AmazonEC2ReadOnlyAccess
    - CloudWatchLogsReadOnlyAccess
    - AWSLambda_ReadOnlyAccess

## S3 Buckets (Planned)

- Bucket for raw data storage (to be created)
- Bucket for processed data (to be created)
- Bucket for frontend hosting (to be created)

## DynamoDB Tables (Planned)

- Table for document metadata (to be created)
- Table for user data and preferences (to be created)

## EC2 Instances (Planned)

- t2.micro instance for backend services (to be provisioned in Week 5)

## Other AWS Services (Planned)

- CloudWatch for monitoring
- CloudFront for frontend content delivery
- Lambda for periodic tasks (optional)

## Architecture Diagram

(To be added as the project progresses)