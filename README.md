# RICARDO REACT EXERCISE

## Description
The goal of this exercise is to build a (very) **small version of Ricardo** using Ricardo's api. The application is described below

# Home page (/)
- Users first land on the **Home Page** where they would see a search bar and a (initially disabled) `search` button
- `SEARCH` button is **disabled by default**. Typing anything on this search bar enables the `**SEARCH**` button.
- Clicking the `SEARCH` button goes to the **Search page**

# Search page (/search/:searchText)
- The **Search page** shows the **total number** of results
- The **Search page** shows a list of article cards **from Ricardo's inventory** where each card contains:
    - A picture
    - The title of the article
    - The end date of the article
    - The price in CHF
- Clicking on a product card (you can also add a link inside the product card if you prefer) navigates to the **Product Details Page**
- Clicking the Ricardo logo navigates back to the **Home Page**

# Product Details Page (/article/:articleId)
- The **Product Details Page** shows a bit more details about the product:
    - The image (big size)
    - The title
    - The subtitle (if any)
    - The seller name
    - The price
    - The description (formatted in HTML)
- Clicking the Ricardo logo navigates back to the **Home Page**

## Requirements

- You need to build the app according to the specifications above.
- You need to build your application using **React**. You can use any library you want in your app, it's up to you.
- You need to **use Git**. The project will be hosted on your Github (or any other provider), be **public**, and you will send the link to your repo to the email address that was given to you earlier.
- You initially have **2 weeks** to do this exercise. If you finish earlier it's cool as well. **If you need more time it's also definitely ok**, we all have a private life and we understand that. Really. Don't think that you are "late". Seriously it's ok.
The only thing we ask you is to **let us know early enough** as we also have to book time for reviewing your code and preparing the next steps.
- Designs **DO NOT** have to match perfectly but should still be close to what is proposed. However **it's ok if you feel creative** and build your own UI 👩‍🎨, but it has to be at least as wonderful as it is today.

## Nice to have

- Use **Typescript** for your project.
- Feel free to **go beyond the specifications** and surprise us with a feature of your own 😉
 
## Good luck!
**Have fun** building it, if you need **any clarification drop us an email** (you should have it already) and don't forget to ask if you need more time.
