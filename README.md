**REST API USING NODEJS SERVERLESS FUNCTION - AZURE**

This documentation provides a step-by-step guide on how to create a REST API using a Node.js serverless function via Azure. The process involves setting up and configuring the necessary tools and services, such as Azure Functions and Azure Storage, creating the Node.js serverless function, defining the endpoints and routes for the API, and finally testing and deploying the API to Azure. By following this, you will have a fully functioning REST API that can handle HTTP requests and responses

**Prerequisites**

* You must have an active Azure account. If you don't have one, you can sign up for a free Azure account at https://azure.microsoft.com/.
* You need to have an Azure subscription associated with your Azure account. This subscription will be used to create and manage Azure resources, including the Function App.
* Familiarize yourself with Node.js and JavaScript programming languages


**STEP BY STEP GUIDE**

1. Log in to your Azure portal

   ![1](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/727c0283-9292-422a-b872-a1d4de54d9b9)

2. Click on 'Create a resource' and search for 'Function App'
3. Click on Create
4. On the panel, choose your subscription, create a new resource group, and provide a function app name as shown below :

   ![Creating a function app](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/ccd46866-bebe-4c3d-85e7-1f8cb6beab34)

5. Choose the 'Nodejs' runtime stack. This will show the version and region
6. Now, click on 'Hosting', you need to create a storage account.
7. Navigate to Monitoring, Azure Monitor Application Insight is an application performance management service for automatically monitoring your application. Enable application insights, it will tell you how many times the functions have been called and how long they took to process.

![Azure application insght](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/e9b1f23b-6c5b-4b7f-a2ea-6458116306ba)

   
8. Review the setup and click Create.

   Wait for the deployment. Once this is deployed, go to resources - it will show the status as running, which includes the URL, Location, Subscription ID etc

   ![Function app created](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/9b15efdc-6a3a-4c2c-9bf3-bb2c12f7b6f7)


Now, the next step is to **create a serverless function**

1. Click on Functions and Create
2. Choose the development environment as Develop in Portal
3. Choose a template, in this case, I've used HTTP Trigger-it's a function that will run whenever it receives an http request, responding based on data in the body or query string.

4. Give the new function a name, I've given the name Person
5. Change the authorization level to anonymous, this means anyone can call the request without any authorization.


**Why do we require such a serverless function, what's the importance?**

Let's consider a real-life scenario: a company that sells tickets for events, such as concerts or sports games, and needs an API to handle ticket purchases. 

Traditional Server-Based Approach:

In a traditional server-based approach, the company would need to set up and maintain servers to handle incoming API requests. They would need to anticipate the maximum expected traffic and provision enough servers to handle it. However, this approach can be challenging to scale, as it's difficult to predict exactly how many servers will be needed at any given time. Additionally, they would need to manage server maintenance tasks, such as software updates and security patches.
   
Serverless Approach:

With serverless functions, the company doesn't need to worry about provisioning servers or scaling infrastructure. Whether there's a sudden surge in ticket purchases due to a popular event or low traffic during off-peak hours, the serverless platform automatically scales to handle incoming requests. Developing and deploying serverless functions is quick and straightforward. The company can focus on writing code to handle ticket purchases without worrying about managing servers or infrastructure. The ticketing API can be designed as a set of serverless functions that respond to events, such as ticket purchases or cancellations. For example, when a customer makes a ticket purchase request, a serverless function handles the transaction, updates the ticket inventory, and sends a confirmation email—all triggered by the event of a purchase request.

Now, let's get into the Testing Part

1. Navigate to the Function that you created, in my case 'Person'
2. If we click on Code+Test, we can see an index.js and function.json file
3. We can test the file using the Test option :

![7](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/353a78e5-42d1-4a00-8a36-4a416d0cc526)

4. In the above dialogue box, you can see the 'Body', you can change the value and click run
5. The result shows 'Connected and the output shows '200ok'
6. If we click on the 'Integration' option, we can see a flow of events including the trigger, input, function, and finally the output
7. Our 'Person' function is triggered by an http event request and outputs HTTP response using the res variable. If we click on the HTTP trigger, there are options to change the request parameter name, and we can choose the HTTP method, in this case, I chose GET only and saved.
8. This change will be reflected in the function.json file if you check, there won't be any 'get' parameter there in the code anymore.
9. To test the function from a browser, click on 'get function URL', this will give you a link. If we call the URL, it will show a response as follows :

![Testing 1](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/e2a7598a-b657-4cb0-b7bf-6e1d8e56bce5)

10. So if we add ?name=abc, the result will be

Hello abc, the HTTP triggered function executed successfully.

11. Now we made some changes in the index file, to display certain names when we add an ID like 1,2,3 and to display 'Please provide a valid ID' if anything apart from these are added

![Testing 2](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/670c0e74-35ae-4cde-8090-9743e73a930a)

![Testing 3](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/9ea9c37e-79b6-447d-b6a9-7e95f63510fd)

In the above scenario, we had to add ?id= in the URL to correctly show the results, but to surpass this we can use a route template, it is used to define the URL path that triggers a specific function. It allows you to define dynamic segments within the URL path that can be used as parameters in your function code.

12. Click 'INtegration' - 'Trigger' - there is a route template filed
13. For it to work, we can add Person/{id:int}
14. This needs a little change in the index.js file as follows: const id= context.bindingData.id

**Let's get into the API Management Instance session**

1. Within the Function app, click on API Management and click on Create new
2. It will ask for a name, which will be part of the URL of the API, and give the organization's name
3. Once it is created click on Link API, and our functions will be automatically imported
4. It will open up a panel 'Create from function app', click Create

![API Management service](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/082848f0-90ee-4185-a09f-fa976c79e711)


Our API is now ready.

1. If we click on the function, we get the base url. Open a new tab and paste the url and add ?id=1 in the ending, everything is working

![Testing 5](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/16d5ee72-c199-4d00-adac-51c5bac028a7)
![Testing 4](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/93515b43-b5fa-4209-ae2c-222c85c189fd)

**Creating an inbound processing rule for routing**

1. Click on 'API Management' - 'Design'
2. Click on 'Person', we need to change the front-end interface first, in the url - add /{id}
3. In the template parameter, ID type must be given as integer, then save
4. From the inbound processing, change the backend to /person?id={id}

![Inbound processing rule](https://github.com/Shahanaz-M-Meera/Rest-API-using-Nodejs-serverless-function-Azure/assets/163439731/c09c3ba7-74db-4626-b999-3a73b564210a)

That's it : )
We have successfully created a REST API using Nodejs serverless function in Azure
