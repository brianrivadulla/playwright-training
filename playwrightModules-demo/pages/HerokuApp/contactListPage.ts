import { Page, Locator } from "playwright";
import { expect } from "@playwright/test";

export class ContactListPage {
    readonly page: Page;
    readonly addNewContact: Locator;
    readonly tableRow: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addNewContact = page.locator('[id="add-contact"]');
        this.tableRow = page.locator('//tr[@class="contactTableBodyRow"]');
    }

    async clickAddNewContact() {
        await this.addNewContact.click();
        await this.page.waitForLoadState("networkidle");
    }

    async clickRowContact(fname: string, lname: string) {
        await this.page.locator('//tr[@class="contactTableBodyRow"]/td[.="' + fname + ' ' + lname + '"]').dblclick();
        await this.page.waitForLoadState("networkidle");
    }

}