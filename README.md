# Background Remover Web Application

A professional, user-friendly web application for removing backgrounds from images using the remove.bg API.

## Features

- Clean, modern UI with responsive design
- Drag-and-drop image upload
- Progress indicators for processing status
- Before & after image comparison
- Download options in PNG and JPG formats
- Dark mode support

## Getting Started

### Prerequisites

- A web server or local development environment
- A remove.bg API key (for production use)

### Setup

1. Clone this repository to your local machine or web server
2. For production use, update the API key in `js/script.js`

### Replacing the Dummy API Key

To use the actual remove.bg API:

1. Sign up for an account at [remove.bg](https://www.remove.bg/)
2. Navigate to your footer and click on api documentation  and get your API key
3. Open `js/script.js` and in first line :
   ```javascript
   const API_KEY = 'YOUR_DUMMY_API_KEY';
   ```
4. Replace 'YOUR_DUMMY_API_KEY' with your actual API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

**Note:** The remove.bg API is a paid service with limited free tier usage. Check their [pricing page](https://www.remove.bg/pricing) for current rates and free usage allowances.

## Browser Compatibility

This application is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## Technologies Used

- HTML5
- CSS3 with modern features (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts (Montserrat and Lora)
- remove.bg API for background removal

## Project Structure

```
background-remover/
│
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # CSS styles
├── js/
│   └── script.js       # JavaScript functionality
└── images/             # Image assets directory
    ├── sample-before.jpg  # Sample original image
    └── sample-after.png   # Sample processed image
```

## License

This project is made by @official_lust_coders they have all rights and this is made for public use 

and its not allowed to sell 

to sell this project please contact @official_lush_coders on instagram or else whatsapp on +91 7483126170 for custom projects also avaible

Made by https://www.instagram.com/official_lust_coders

uploaded to https://buycollegeprojects.online