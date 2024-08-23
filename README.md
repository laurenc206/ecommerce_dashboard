
# Overview 
This is the dashboard for my e-commerce project. The dashboard is where all data from the storefront can be created, updated or deleted. Once a store is created inside the dashboard, all store details and products managed inside the dashboard will be readily displayed on the [storefront](https://github.com/laurenc206/ecommerce_storefront) when you supply the storefront with the relevant API links automatically generated on the dashboard. All changes to the store will immediately take place on the storefront. Customer orders placed on the storefront, including an order summary and customer details, are also avaliable on the dashboard for admin review.
<br><br>
## Project Details
This project uses the Next.js App Router so all project files under the app folder are organized in a way that folder structure represents the page url or api route. For more information on the project structure for Next.js, check out https://nextjs.org/docs/getting-started/project-structure
<br><br>
You will see that some pages like colors, sizes, categories, subcategories are very similiar to eachother; I chose to design this web app this way by repeating code to make the code easier to understand and make each route self-containing, rather than creating one large smart component- there are obviously trade-offs and arguements for either implementation.
<br><br>
This project was created as a way for me to practice with the latest web development technologies such as: React, Tailwind, Prisma DB, Cockroach DB, and Clerk. The dashboard is where a majority of the work for this project is done and is where you can perform CRUD operations on the data in the storefront. 
<br><br>
In this version, I chose to include a locking feature to prevent certain data from being modified in the dashboard. This is so that I can demo the storefront with sample data. I chose to include an isLocked field instead of limiting database user permissions so users who are interacting with my demo dashboard/storefront would be able to modify some (but not all) of the sample data. Any operation made on a row marked locked will simply be rejected by the API service (@/app/api) with a 409 error code. The isLocked field is for demo purposes only so it can be removed without any consequence on the overall functionality of the dashboard or storefront.
<br><br>
The schema to the tables is stored in prisma/schema.prisma. Any modifications to the schema must be pushed to the database using `npx prisma db push`. Visit https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema for more information on prisma db.
<br><br>
Currently, the dashboard has no inventory management but I plan on adding this in future versions. I also plan on allowing multiple color and sizing options for a product and enabling store user accounts.
<br><br>
<b>Reach out to me at laurencav.info!</b>
<br>
<br>
## Set up
1. The entire page is wrapped in a ClerkProvider so that the user must first be logged in to access their stores. In the code for the storefront you will need to save the url to the dashboard/api/<store_id> with the store_id of the store you want to display the data from. Clerk is used for user authentication and management. You will need to configure the Clerk API in the .env file with the API keys. For more information on Clerk go to https://clerk.com<br><br>
2. You can use any distrubuted SQL database you like to store the data. You will also need to configure the database credentials and supply the database url in the .env file<br><br>
3. Cloudinary (https://cloudinary.com) is used for image uploads where the url is then saved into the database. Your cloudinary name will need to be stored in the .env file<br><br>
4. For processing transactions, the Stripe API is used on both the storefront and dashboard pages. When a user clicks checkout on their cart, a new order is made and the transaction is labeled as unpaid (paid = false). Under api/webhook is where you need to set up a listener to the Stripe API so that when Stripe successfully processes the transaction, the order gets updated to paid = true. It is important that the webhook is properly set-up and working, otherwise the order page might show an order as unpaid when it has actually been paid. Stripe's API documentation recommends using a webhook for listening for transaction updates rather than attempting to update that information by making API calls to Stripe. Stripe goes into more details about the webhook here: https://docs.stripe.com/webhooks<br>
5. In the .env file you will also need to include your Stripe API key and Stripe webhook secret. Make sure when you set up the webhook you use the correct url `http://<dashboard_url>/api/webhook`<br><br>
6. The link to the storefront must also be supplied in the .env file to bypass cors restrictions
<br><br><br>
## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
<br>
You will want to start the storefront first, which will likely be running on port 3000. Make sure that the URL of the storefront is saved into the .env file of the dashboard so that the storefront API calls can be made without CORS errors.
<br>
<br>
If the storefront is already running, it is likely listening on port 3000. Therefore, the dashboard will likely automatically start on port 3001.<br>
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
<br><br>

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
