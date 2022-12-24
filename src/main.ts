function main() {
    const threads = GmailApp.search('from:(aeonnetshop@aeonnetshop.com)', 0, 10);
    console.log(threads);
}