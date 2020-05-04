# Instructions to deploy on Dialogflow
* Create Dialogflow account.
* Goto Dialogflow console.
* Create new [agent](https://cloud.google.com/dialogflow/docs/quick/build-agent#create-an-agent). While creating agent, in the **GOOGLE PROJECT**, choose the firebase project that you created earlier while deploying Firebase Cloud Functions.
    
![](./dialogflow.gif)
 
* Click on settings on top left corner.
* Select **Export and Import** tab.
* Click on **Import From ZIP**.

![](./dialogflow2.gif)
 
* Choose the zip file [dialogflow.zip](./dialogflow.zip)
* Type IMPORT to confirm

**Note** - You will have to enable billing for the project. [See here](https://cloud.google.com/billing/docs/how-to/manage-billing-account#create_a_new_billing_account)

