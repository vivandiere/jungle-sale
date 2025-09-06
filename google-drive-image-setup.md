# Google Drive Image Hosting Setup

## Step 1: Upload Images to Google Drive
1. Create a folder in Google Drive called "jungle-sale-images"
2. Upload your plant images
3. Right-click each image → "Share" → "Anyone with the link can view"

## Step 2: Get Direct Image URLs
Google Drive share links look like:
`https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

Convert to direct image URL:
`https://drive.google.com/uc?export=view&id=FILE_ID`

## Step 3: Add to Google Sheets
Copy the direct URLs into your image_urls column.

## Example:
- Share URL: `https://drive.google.com/file/d/1abc123def456/view?usp=sharing`
- Direct URL: `https://drive.google.com/uc?export=view&id=1abc123def456`
