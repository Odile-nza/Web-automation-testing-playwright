import { Page, expect } from "@playwright/test"

//Validating the checkout overview
export default class CheckoutPage {

    constructor(public page: Page) { }

    async enterFirstName(firstname: string) {
        await this.page.getByPlaceholder("First Name")
           .type(firstname)

    }
    async enterLastName(lastname: string) {
        await this.page.getByPlaceholder("Last Name")
        .type(lastname)

    }
    async enterZipOrPostalCode(zipcode: string) {
        await this.page.getByPlaceholder("Zip/Postal Code")
        .type(zipcode)

    }
    async clickOnContinueBtn(){
         await this.page.locator("#continue")
        .click()
    }
    async validatePurchase(){
        const item = await this.page.locator('.cart_item')
        const count = await item.count()
      
       }
       async validateTotalPrice(){
        const strPrice =await this.page.locator('.inventory_item_price').allInnerTexts()
        let sum =0 
        for (let i = 0; i <strPrice.length; ++i){
           let price = +strPrice[i].substring(1,strPrice[i].length );
                   sum = price+sum 
        }
        const strTax =await this.page.locator('.summary_tax_label').allInnerTexts()
        for (let i = 0; i <strTax.length; ++i){
           let Tax= +strTax[i].substring(6,strTax[i].length );
                   const totalPricefloat =  sum + Tax
                   console.log("items total price=",totalPricefloat)
        
       }
    }
    async summaryTotalPrice(){
        const strPrice =await this.page.locator('.summary_total_label').allInnerTexts()
        for (let i = 0; i <strPrice.length; ++i){
           let summaryPrice = +strPrice[i].substring(8,strPrice[i].length );
                   console.log("summary total  price=",summaryPrice)
                   
        }
    }

    async clickOnFinishBtn(){
        await this.page.locator('[id="finish"]')
        .click()
    }
} 