This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Quick start

1. Make sure you have Node.js and npm installed.

1. Create a `.env.local` file in the root folder of the project, with the contents that we have shared with you privately.

1. Install all the dependencies if not already done:

   ```bash
   npm install
   ```

1. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Details

1. Make sure you have a recent version of Node.js and npm installed. To verify this you can run the commands `node --version` and `npm --version`, in your terminal, e.g.:

   ```bash
   $ node --version
   v14.18.0
   $ npm --version
   8.3.0
   ```

1. Clone the repository:

   ```bash
   $ git clone git@github.com:tupuio/tupuapp.git
   ```

1. Enter in the just created folder, and install all the dependencies (among them, there will be `Next.js`):

   ```bash
   $ cd tupuapp
   tupuapp$ npm install
   ```

1. Create an `.env.local` file, open your favourite code editor, and fill the file with the contents that we have shared with you privately (probably through `https://cryptobin.co/` or `https://yopass.se/`):

   ```bash
   tupuapp$ touch .env.local
   tupuapp$ code .
   ```

1. We use SendGrid in order to send notification emails. 
Create a free acount on https://sendgrid.com/go/email-smtp-service-signup-sales-1. 
Afterwards create a SendGrid API's key. Please, create one and add it to your `.env.local` file under `SENDGRID_API_KEY`. 

1. Set a `SENDGRID_EMAIL_VERIFIED_SENDER` in your `.env.local` with a SendGrid verified sender (for the same API key).

1. In order to not spam real people with notifications while developing, set `DEV_EMAIL_RECIPIENT` in `.env.local` with your email to receive all the notification emails to your inbox while developing.

1. After filling in the file `.env.local`,if you use VSCode, you could open a new terminal (`Terminal` -> `New Terminal` or simply `` Ctrl+Shift+` ``), or use again the previous terminal, and start the the development server with:

   ```bash
   tupuapp$ npm run dev
   ```

1. Open [http://localhost:3000](http://localhost:3000) with your browser, and you should see the login page
1. Try to login with the user `test` and password `app` to test the connection to the server database (you need to be connected to the internet, and have correctly set the `.env.local` file in the root of the Tupu application).
