import { Page, expect } from "@playwright/test"

//Selecting item from inventory page and adding item to card by clicking button
export default class InventoryPage {

    constructor(public page: Page) { }
    //Sorting items by names from A to Z
    async sortItemsByAscending(){

        await this.page.locator('[class="product_sort_container"]').click()
        //await this.page.getByLabel('Name (A to Z)').click()
        await this.page.locator('[class="product_sort_container"]').selectOption({label:'Name (A to Z)'})
        await this.page.waitForSelector('[class="product_sort_container"]')

        const sortedItems = await this.page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
       for (let i = 0; i < sortedItems.length-1; i++) { 
        const currentItem = sortedItems[i]
        const nextItem = sortedItems[i + 1]
        console.log(nextItem)
     } 
        

    }
    //Sorting items by names from Z to A
    async sortItemsByDescending(){
        await this.page.locator('[class="product_sort_container"]').click()
        await this.page.locator('[class="product_sort_container"]').selectOption({label:'Name (Z to A)'})
        await this.page.waitForSelector('[class="product_sort_container"]')
        const sortedItems = await this.page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
        for (let i = 0; i < sortedItems.length - 1; i++) { 
         const currentItem = sortedItems[i]
         const nextItem = sortedItems[i + 1]
         console.log(nextItem)
        }

    }

    async addItemsToTheCart() { 

     const item = await this.page.locator('.inventory_item')
     const count = await item.count();
     for (let i = 0; i < 6; ++i){
          const randomItem = Math.floor(Math.random() * count)
         await this.page.locator('.btn_inventory').nth(randomItem).click()
     }
     
    }
     async removeItemFromTheCart(){
         await  this.page.locator('.shopping_cart_link').click()
         const item = await this.page.locator('.cart_item')
        const count = await item.count();
        const randomItem = Math.floor(Math.random() * count)
        if (randomItem < count)
           await this.page.locator('.cart_button').nth(randomItem).click()
     }

}