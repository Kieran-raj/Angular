### Angular app

---

1. Reset button for expenses summary page
2. Work with JSON-Server and make documentation on how to run
3. ~~Integrate NgRx - **MASSIVE JOB** (Daily Transactions, Monthly, Implement in components)~~ &#x2611;

- ~~Make sure to implement subscriptions when selecting data to prevent memory leaks~~ &#x2611;
- Maybe look at failuer states if
- ~~Add dailyTotal to daily transactions state and then have an transactions object inside that~~

4. ~~Integrate date picker into full history (might be more difficult to do)~~ -> This will now not be needed as going to have ag-grid on summary page
5. ~~Change nav bar words to symbols and add the words to the tooltip~~ &#x2611;
6. ~~Get datepickers working for expenses~~ &#x2611;
7. Come up with a value for interval for choosing the xticks (programmatically)
8. ~~Sort out models/types~~ &#x2611;
   - ~~Line data~~ &#x2611;
   - ~~Bar data~~ &#x2611;
9. Improve the datePicker reset button and whole datePicker logic (Ignoring for now)
10. ~~Make sidebar its own component~~ &#x2611;
11. ~~Look at add full history to ag-grid instead and display below the graphs~~ &#x2611;
12. Write some custom logic to dynamically change the size of the graph
13. Refactor transaction and API types Daily and Historical
14. ~~Add pie chart~~ &#x2611;
15. Improve isLoading to prevent console log errors
16. Make app dynamically sized
17. Make charts dynamic / generic as possible
18. ~~**RE-WORK PIE CHART CATEGORICAL DATA LOGIC (see below)**~~ &#x2611;
19. ~~Get percentage change for bar chart~~ &#x2611;
20. ~~Get percentage total working for pie chart~~ &#x2611;

---

### Business Logic

1. Allow the ability to create new categories
2. Allow for updating a category (via context menu in ag grid)
3. Allow for the creation of new records (should update grid and charts)
4. All for the deletion of records (should update grid and charts)

---

#### New things to learn/focus on

1. ~~State management~~ &#x2611;
2. Subjects
3. async/await
