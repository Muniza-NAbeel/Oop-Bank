#! /usr/bin/env node
import inquirer from "inquirer";
// *** Bank Account Class ***
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // *** Debit Money ***
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`You Withdraw $${amount} Successfully!!\n`);
            console.log(`\nYour Remaining Balance is: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance ..");
        }
    }
    // *** Credit Money ***
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //100$ deposit karny pe 1$ katy gy 
        }
        this.balance += amount;
        console.log(`\nYou Successfully deposit $${amount}`);
        console.log(`\nYour Remaining Balance is: $${this.balance}`);
    }
    // *** Check Balance ***
    checkBalance() {
        console.log(`Your Current Balance is: $${this.balance}`);
    }
}
// *** Customer Class ***
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// *** Create Bank Accounts ***
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 1500)
];
//  *** Create Customers ***
const customers = [
    new Customer("Muniza", "Malik", "Female", 25, 3112614571, accounts[0]),
    new Customer("Nabeel", "Ahmed", "Male", 26, 3318673523, accounts[1]),
    new Customer("Abdul", "Nafay", "Male", 2, 2345678910, accounts[2])
];
// *** Function to interact with Bank Account ***
async function service() {
    do {
        const accNumInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter Your Account Number:"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accNumInput.accountNumber);
        if (customer) {
            console.log(` Welcome!!!, ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select An Operation..",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter The Amount To Deposit:"
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter The Amount To Withdraw:"
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("\nExiting Program !!!");
                    console.log("\nThank You For Coming .. Have a Nice Day !!!");
                    return;
            }
        }
        else {
            console.log(" Invalid Account Number.. Please Try Again !!!");
        }
    } while (true);
}
service();
