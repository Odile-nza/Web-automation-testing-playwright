
// login as standard user
import { Page } from "@playwright/test"

export default class LoginPage {

    constructor(public page: Page) { }

    async login(username: string, password: string) {

        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickLoginBtn()
    }

    async enterUserName(username: string) {
        await this.page.getByPlaceholder("Username")
            .type(username)
    }

    async enterPassword(password: string) {
        await this.page.getByPlaceholder("Password")
            .type(password)
    }

    async clickLoginBtn() {
        await this.page.locator('[id="login-button"]') .click()
        
    }
}