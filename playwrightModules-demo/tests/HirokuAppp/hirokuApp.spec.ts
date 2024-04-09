import { fa, faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import config from '../../playwright.config';
import { LoginPage } from '../../pages/HerokuApp/loginPage';
import { ContactListPage } from '../../pages/HerokuApp/contactListPage';
import { AddContactPage } from '../../pages/HerokuApp/addContactPage';
import { ContactDetailsPage } from '../../pages/HerokuApp/contactDetailsPage';
import { EditContactPage } from '../../pages/HerokuApp/editContactPage';

test('Create, edit and delete Customer @herokuapp', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const contactListPage = new ContactListPage(page);
    const addContactPage = new AddContactPage(page);
    const contactDetailsPage = new ContactDetailsPage(page);
    const editContactPage = new EditContactPage(page);

    await loginPage.navigateToLandingPage();

    await loginPage.login(config.username, config.password);

    await expect(page).toHaveTitle("My Contacts");

    // Add Contact
    await contactListPage.clickAddNewContact();

    // Verify Add Contact page
    await expect(page).toHaveTitle("Add Contact");
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    await addContactPage.populateDetails(fname, lname);

    // Verify Contact List page
    await expect(page).toHaveTitle("My Contacts");
    await contactListPage.clickRowContact(fname, lname);

    // Verify Contact Details page
    await expect(page.locator('text=Contact Details')).toHaveText('Contact Details');
    await contactDetailsPage.clickEdit();

    // Verify Edit Contact page
    await expect(page.locator('text=Edit Contact')).toHaveText('Edit Contact');
    await editContactPage.populateDetails(faker.person.firstName(), faker.person.lastName());

    // // Verify Contact Details page
    await expect(page.locator('text=Contact Details')).toHaveText('Contact Details');
    page.on("dialog", dialog => dialog.accept());
    await page.locator('[id="delete"]').click();
    await expect(page.locator('text=Contact Details')).toHaveText('Contact Details');
    await page.waitForLoadState("networkidle");

    // Verify logout text
    await page.locator('[id="logout"]').click();
    await expect(page.locator('text=Contact List App')).toHaveText('Contact List App');

})