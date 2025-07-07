![image](https://github.com/PatrickFrankAIU/GradeManagerProject/assets/134087916/b5d814bf-e38f-456f-8f9c-cb5a98fb52fa)

# ITWEB300-2503B
For students in ITWEB-300, Term 2503B. 
Patrick Frank, Instructor

Instructions:
This is a short project that you can pull together quickly to demonstrate your skills with a "vanilla" frontend and a Node+Express backend. The project is hosted on render.com, on a free tier that times out after 15 minutes and takes 50 seconds to restart. 

Construction Sequence: 
- Create a new folder on your HD and open it in Visual Studio Code
- Create package.json and paste in data (or use npm init -y in the terminal)
- Create data.js and server.js and paste in (or develope) your code
- Run commands to create the Node server:
  - npm install (or "npm init -y" if you did not create package.json)
  - npm install express
  - npm start (or "npm server.js" if you used npm init -y instead of copying the package.json file)
- With the server running, follow the instructions in the terminal window to test the code (remember to click pretty-print!)

Add Front-End: 
- Create folder "public" within the project folder
- Add index.html, main.css, and main.js to the public folder
- Create appropriate HTML, CSS, and JS code in these files (follow the ones in the repository)
  - Note: There's a version that uses async/await in the demo, if you want to try that instead of promise chains
- Add static file hosting to server.js, if it's not already there (see demo code)

To host your project:
- Create a file called .gitignore
- Add this to the file:
  # Node.js dependencies
  node_modules/
- Note: I *think* that's all you need, but if this doesn't work, add the rest of the contents of the .gitignore file in the demo repository
- Initialize and sync to your GitHub account (you may need to make a repository first, but see if it gives you the Publish option)
- Check your GitHub account and make sure it's there
- Open your Render.com dashboard
- Click "Add New", then "Web Service"
- Point it to the repository
- Select the free tier service
- Begin the installation (it will take a few minutes)
- Test to make sure it works
