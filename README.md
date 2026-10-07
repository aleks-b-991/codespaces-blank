# North Star Bakery Website

A four-page website for North Star Bakery, a fictional neighborhood bakery. The site promotes the bakery's breads, pastries, and cakes and makes it easy for customers to send a pre-order request.

This is a class project for Introduction to Web Development (Sophia Learning), built across Touchstones 2 through 5 for "Client A: North Star Bakery."

**Live site:** https://aleks-b-991.github.io/codespaces-blank/

## Pages

| Page | File | What it contains |
|---|---|---|
| Home | `index.html` | Welcome message and audio, what the bakery is known for, featured item of the week, hours and location |
| Our Products | `products.html` | Breads, pastries, and cakes with descriptions and price ranges, plus the My Pre-Order List |
| About Our Bakery | `about.html` | The bakery's story, a behind-the-scenes video, sourcing philosophy, and staff highlights |
| Contact and Pre-Orders | `contact.html` | Inquiry and pre-order form, location, and hours of operation |

## Features

- **Semantic HTML:** every page uses `header`, `nav`, `main`, and `footer`, with one `h1` and ordered headings.
- **Responsive design:** a mobile-first layout built with Flexbox, with media queries at 600px and 900px.
- **Consistent design system:** four colors and two fonts used across all pages.
- **My Pre-Order List:** customers click "Add to my list" on any product, and the list updates on the page without reloading.
- **Form validation:** JavaScript checks each field and shows a clear message directly under any field that needs fixing.
- **Saved data:** `localStorage` remembers the pre-order list and the customer's name, email, and request type. The list also pre-fills the "Item details" box on the contact form.
- **Accessibility:** meaningful alt text, a label for every form field, fieldsets with legends, readable color contrast, and fallback text for audio and video.

## Design

| Color | Hex | Used for |
|---|---|---|
| Cream | `#FFF8F0` | Page background |
| Brown | `#6B3E26` | Headings, links, buttons, footer |
| Peach | `#D88C5A` | Accents, borders, highlighted sections |
| Charcoal | `#2F2A26` | Body text |

**Fonts:** Lora (headings) and Nunito (body text), loaded from Google Fonts.

## Project structure

```
index.html
products.html
about.html
contact.html
styles.css      all styling for the four pages
script.js       pre-order list, form validation, and localStorage
media/          logo, photos, welcome audio, and behind-the-scenes video
```

## Running the site

No installation is needed. Open the live site link above, or download the repository and open `index.html` in a browser.

To preview it in GitHub Codespaces, run this in the terminal and open port 8000 in the browser:

```
python3 -m http.server 8000
```

## Notes

- The contact form does not send data to a server. A valid submission shows a confirmation message and saves the contact details in the browser.
- North Star Bakery is not a real business. The address, phone number, staff names, and prices are made up for the assignment.
- The images, audio, and video were provided by Sophia Learning for this course.

## Author

Aleksandra Bugarcic
