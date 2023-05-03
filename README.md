<div align="left">
            <a href="https://paypal.me/piyushsati311999" target="_blank" style="display: inline-block;">
                <img
                    src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square&logo=paypal" 
                    align="left"
                />
            </a>
            <a href="https://www.buymeacoffee.com/piyushsati" target="_blank" style="display: inline-block;">
                <img
                    src="https://img.shields.io/badge/Donate-Buy%20Me%20A%20Coffee-orange.svg?style=flat-square&logo=buymeacoffee" 
                    align="left"
                />
            </a>
</div>  
<br/>  



# Zinger

Food ordering website for Zinger restaurant built using Next.js, TailwindCSS, Redux, Mongodb

![Logo](https://zinger.vercel.app/_next/image?url=%2Fimg%2FZinger.svg&w=128&q=75)

<img src="https://zinger.vercel.app/img/favicons/apple-touch-icon.png" height="100" alt="" />


## Demo

https://zinger.vercel.app


## Screenshots

![App Screenshot](https://i.ibb.co/8x3ZGnG/zinger.gif)

  
## Features

- Responsive
- Real Time and Dynamic
- Progressive Web App (PWA)
- Payment Gateway integration
-  Admin Dashboard with functionalities like adding products, deleting a product, updating products, adding a category, viewing users registered, updating order status, and canceling orders.
- State management using Redux
- Google authentication
- Track order status real time
- Cancel orders


## Run Locally

Clone the project

```bash
  git clone https://github.com/Pinqua/Zinger.git
```

Go to the project directory

```bash
  cd Zinger
```

Install dependencies

```bash
  npm install
```

Create a **.env.local** file inside project directory with fields given below.

```bash
  # Authentication
  GOOGLE_ID=
  GOOGLE_SECRET=

  # Need to add this to... google cloud
  # http://localhost:3000/api/auth/callback/google


  NEXTAUTH_URL=http://localhost:3000


  HOST=http://localhost:3000


  # Stripe
  STRIPE_PUBLIC_KEY=
  STRIPE_SECRET_KEY=


  # Stripe Terminal/CLI
  STRIPE_SIGNING_SECRET=

  # Testing Webhook
  # stripe listen --forward-to localhost:3000/api/webhook


  # Mongodb Database
  
  # Your database name
  MONGODB_DB=
  # Add monogdb connection url 
  MONGO_URI=
  # Add mongodb connection url but with driver node.js and version 2.2.12 or later 
  MONGODB_URI=
  
```

Start the server

```bash
  npm run dev
```
 
Admin Access 

```
 To gain admin access, you need to add your email ID to the admin collection in MongoDB.
 After adding it, try logging in with the same email ID, and you should see the dashboard option.
```
![182356880-d13b94f1-2a21-4e4e-8d1a-bb4faca0e61d (1)](https://user-images.githubusercontent.com/69719134/235835845-66a9ba70-e8d3-47f3-a213-298fcf3d0b89.png)




## Stripe Payment Gateway

Test Stripe payment gateway with these card details.

```
  BRAND - VISA
  CARD NUMBER - 4242424242424242
  CVC - Any 3 digits
  DATE - Any future date
```

See details: https://stripe.com/docs/testing
  

## Contributing

Contributions are always welcome!

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

<br/>
<br/>

<p align="center">If you liked the repository, show your  ❤️  by starring and forking it.</p>
  
