# Bamazon

Bamazon is a storefront and inventory management app designed to be run from the command line using Node.js.

Through storefront.js, Bamazon allows users to view inventory from an SQL database and purchase items. Items purchased are updated in the inventory database. 

Through bamazonstaff.js, Bamazon allows management to view inventory, restock items, or stock new items.  

In order to ready Bamazon for use, complete the following steps: 
1. Download this package from https://github.com/Mlipphardt/Bamazon
2. Navigate to the downloaded folder.
3. If Node.js has not been installed, download and install it from 
   https://nodejs.org/
3. Run 'npm install' to install the following required packages: mysql and inquirer.
4. To run Bamazon, customer version, input the following in the command line:
    node storefront.js

5. Once open, the user will be provided a menu to select which department they would like to browse.

[Storefront main menu.](./demo-images/storefront-opening.png)

6. Next, a user may select to either browse the inventory, or purchase an item.

[List of possible actions](./demo-images/storefront-actions.png)

7. If the user elects to browse the inventory, it will be displayed.

[Example of inventory view.](./demo-images/storefront-inventory-demo.png)

8. If the user chooses to purchase an item, they will be given the total cost and the database will be updated.

[Example of purchase request.](./demo-images/storefront-purchase-demo.png)

8a. If the user attempts to order more than is stocked, they will be notified and the request will not complete.

[Example of attempted over-purchase.](./demo-images/overpurchase-demo.png)




Technologies used in this project:

- Node.js was used to create the command line interface.

- MySQL was used to create the Bamazon database and queries.

- NPM package "mysql" was used to utilize MySQL databases and queries in node.js.

- NPM package "inquirer" used to provide a user interface and obtain user input.

