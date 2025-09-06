# Plant Images Folder

This folder contains all plant images for the Jungle Sale catalog.

## Folder Structure
```
public/images/plants/
├── README.md
├── monstera-deliciosa/
│   ├── small.jpg
│   ├── medium.jpg
│   └── large.jpg
├── fiddle-leaf-fig/
│   ├── small.jpg
│   ├── medium.jpg
│   └── large.jpg
└── ... (other plants)
```

## Naming Convention
- **Folder names**: Use the plant slug from the CSV (e.g., `monstera-deliciosa`)
- **Image files**: Use `small.jpg`, `medium.jpg`, `large.jpg` for each size variant
- **File format**: JPG recommended for web (good compression, fast loading)

## CSV Image URL Format
Update your CSV `image_urls` field to use local paths:
```
/images/plants/monstera-deliciosa/small.jpg,/images/plants/monstera-deliciosa/medium.jpg,/images/plants/monstera-deliciosa/large.jpg
```

## Benefits of Local Images
- ✅ Faster development (no external dependencies)
- ✅ Better performance (served from same domain)
- ✅ Full control over image quality and sizing
- ✅ No broken image links during development
- ✅ Easy to optimize for web

## Image Requirements
- **Small**: 300x300px (for thumbnails)
- **Medium**: 600x600px (for product cards)
- **Large**: 900x900px (for detailed views)
- **Format**: JPG with 80-85% quality
- **File size**: Keep under 200KB per image

