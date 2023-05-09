import { Page, expect } from "@playwright/test"

//Selecting item from inventory page and adding item to card by clicking button
export default class sortingItems {

    constructor(public page: Page) { }
    //Sorting items by names from A to Z
    async sortItemsByAscending(){
    
        await this.page.click('.product_sort_container');
        await this.page.locator('[class="product_sort_container"]').selectOption({label:'Name (A to Z)'})
        await this.page.waitForSelector('[class="product_sort_container"]')
    
        // Get the list of item names
        const itemNames = await this.page.$$eval('.item-name', (elements) => elements.map((el) => el.textContent));
      
        // Check if the items are sorted in ascending order by name
        const sortedItemNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedItemNames);
    }
    async sortItemsByDescending(){
    
        await this.page.click('.product_sort_container');
        await this.page.locator('[class="product_sort_container"]').selectOption({label:'Name (Z to A)'})
        await this.page.waitForSelector('[class="product_sort_container"]')
    
        // Get the list of item names
        const itemNames = await this.page.$$eval('.item-name', (elements) => elements.map((el) => el.textContent));
      
        // Check if the items are sorted in ascending order by name
        const sortedItemNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedItemNames);
    }

}