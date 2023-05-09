import { expect, test } from '@playwright/test'
//importing pages classes
import  LoginPage from '../../Pages/logPage'
import  InvertoryPage  from '../../Pages/invetoryPage'
import CartPage from '../../Pages/cartPage'
import CheckoutPage from '../../Pages/checkoutPage'
import sortingItems from '../../Pages/sorting'


//Declaration of credentials
const username = "standard_user"
const password = "secret_sauce"
//Declaration of user information
const firstname = "Odile"
const lastname = "Nzambazamariya"
const zipcode = "250"


//Defining group of tests
test.describe('soucedemo validation', async()=>{

   // Validating whether the item is in cart
   test('Validation of adding items to cart', async({page})=>{
  
    const login = new LoginPage(page)
    const inventoryPage = new InvertoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    //Visiting login page with valid credentials
    await page.goto('https://www.saucedemo.com/')
    await login.login(username, password)

    //Visiting inventory page to select item
    await inventoryPage.addItemsToTheCart()

    //remove item from cart
   await inventoryPage.removeItemFromTheCart()

   //Validating iems in cart
   const cart = await cartPage.countItem()
    
    //Check cart page and contnue to checkout
    await cartPage.clickOnCheckoutBtn()
    await checkoutPage.enterFirstName(firstname)
    await checkoutPage.enterLastName(lastname)
    await checkoutPage.enterZipOrPostalCode(zipcode)
    await checkoutPage.clickOnContinueBtn()
    const check = await checkoutPage.validatePurchase()
    const itemsTotalPrice = await checkoutPage.validateTotalPrice()
     const summaryTotalPrice = await checkoutPage.summaryTotalPrice()
    await checkoutPage.clickOnFinishBtn()
    

    //Validate checkout if it only contains the items that you want to purchase
    expect(cart).toEqual(check)

    //Check the total whether is right
    expect(itemsTotalPrice).toEqual(summaryTotalPrice)

    //Validating that the website confirms the order
    expect(await page.innerText('[class="complete-header"]')).toBe('Thank you for your order!')


   })
   test.only('Validation of sorting product is right', async({page})=>{
    const login = new LoginPage(page)
    await page.goto('https://www.saucedemo.com/')
    await login.login(username, password)

    //sort product by name
    
   const sorting = new sortingItems(page)

   await sorting.sortItemsByAscending()
   await sorting.sortItemsByDescending()

   })


})