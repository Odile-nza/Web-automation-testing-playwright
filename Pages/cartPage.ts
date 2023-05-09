import { Page } from "@playwright/test"

//Selecting item from inventory page and adding item to card by clicking button
export default class CartPage {

    constructor(public page: Page) { }
    async clickOnCheckoutBtn(){
       await this.page.locator('[class="shopping_cart_link"]')
            .click()
       await this.page.locator('#checkout')
            .click()
       
    }
    async countItem(){
     const item = await this.page.locator('.cart_item')
     const countCart = await item.count()

    }
}   