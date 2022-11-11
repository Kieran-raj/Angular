### Angular app

---

1. ~~Reset button for expenses summary page~~ &#x2611;
2. Work with JSON-Server and make documentation on how to run
3. ~~Integrate NgRx - **MASSIVE JOB** (Daily Transactions, Monthly, Implement in components)~~ &#x2611;

- ~~Make sure to implement subscriptions when selecting data to prevent memory leaks~~ &#x2611;
- Maybe look at failuer states if
- ~~Add dailyTotal to daily transactions state and then have an transactions object inside that~~

4. ~~Integrate date picker into full history (might be more difficult to do)~~ -> Removed due to the ag gid integratiion
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
13. ~~Add pie chart~~ &#x2611;
14. ~~Improve isLoading to prevent console log errors~~ &#x2611;
15. Make app dynamically sized
16. Make charts dynamic / generic as possible
17. ~~**RE-WORK PIE CHART CATEGORICAL DATA LOGIC (see below)**~~ &#x2611;
18. ~~Get percentage change for bar chart~~ &#x2611;
19. ~~Get percentage total working for pie chart~~ &#x2611;
20. ~~Add new category~~ &#x2611;
21. ~~Render in action buttons~~ &#x2611; and get working
22. When changing dates, have all values change in all components
23. ~~Moving average~~ &#x2611;
24. Route Guarding
25. Show averages in the expenses side bar
26. Validation for modal forms
27. Either need a generic ok call back, or have it so then transactions and category updates are the same object essentially
28. Change the type of pie chart shown

---

### Refactoring

1. ~~Refactor line chart tooltip (as generic as possible in html)~~ &#x2611; -> ~~Allow custom templates to be passed through~~ &#x2611;
2. ~~Refactor Modal (using ng templates and ViewChild || ContentChild)~~ &#x2611;
3. Refactor transaction and API types Daily and Historical
4. Refactor styling into scss files (settings may make more sense in certain places)
5. Question dependencies
6. ~~Refactor bar chart tooltip (custom component)~~&#x2611;

---

### Business Logic

1. ~~Allow the ability to create new categories~~ &#x2611; (~~Python~~ &#x2611; ; .NET)
2. Allow for updating a category (maybe do drop down as context menu doesnt work)
3. Allow for the creation of new records (should update grid and charts)
4. All for the deletion of records (should update grid and charts)

---

#### New things to learn/focus on

1. ~~State management~~ &#x2611;
2. ~~Subjects~~ &#x2611;
3. async/await
