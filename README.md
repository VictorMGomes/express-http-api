# EXPRESS HTTP API
A HTTP based API build with Express and more.

# To execute this project you need:
The latest LTS version of Node.JS.
A SQL SGBD such as MySQL or another wich Sequelize support.
    And a proper database and the credentials to access it.

# How to execute this project after clone:

# Install dependencies
npm install

# Copy the '.env.example' and rename to '.env'
Edit with your proper Database credentials

# Execute Sequelize to migrate tables:
npx sequelize db:migrate

# Execute in development mode
npm run dev

# Execute in production mode
npm run start

# Check the console logs and you're done
