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
7. ~~Come up with a value for interval for choosing the xticks (programmatically)~~ &#x2611;
8. ~~Sort out models/types~~ &#x2611;
   - ~~Line data~~ &#x2611;
   - ~~Bar data~~ &#x2611;
9. ~~Improve the datePicker reset button and whole datePicker logic~~ &#x2611; (No longer doing)
10. ~~Make sidebar its own component~~ &#x2611;
11. ~~Look at add full history to ag-grid instead and display below the graphs~~ &#x2611;
12. Write some custom logic to dynamically change the size of the graph
13. ~~Add pie chart~~ &#x2611;
14. ~~Improve isLoading to prevent console log errors~~ &#x2611;
15. Make app dynamically sized
16. Make charts dynamic / generic as possible (Not important)
17. ~~**RE-WORK PIE CHART CATEGORICAL DATA LOGIC (see below)**~~ &#x2611;
18. ~~Get percentage change for bar chart~~ &#x2611;
19. ~~Get percentage total working for pie chart~~ &#x2611;
20. ~~Add new category~~ &#x2611;
21. ~~Render in action buttons~~ &#x2611; and get working
22. When changing dates, have all values change in all components (Not important)
23. ~~Moving average~~ &#x2611;
24. Route Guarding:

- ~~Add logged in user to state~~ &#x2611;
- ~~Make sure state updates even when logged in (via token)~~ &#x2611;

25. ~~Show averages in the expenses side bar~~ (no doing anymore) &#x2611;
26. Improve validation for modal forms
27. ~~Make category choice a drop down~~ &#x2611;
28. Either need a generic ok call back, or have it so then transactions and category updates are the same object essentially
29. ~~Change the type of pie chart shown~~ &#x2611;
30. ~~Make application response for ipad screen~~ &#x2611;
31. ~~Have separate modal for category creation. But have the same modal for create, update and delete~~ &#x2611;
32. ~~Make the graph responsive~~ &#x2611;
33. ~~Put charts in their own card~~ &#x2611;
34. ~~Maybe place buttons elsewhere~~ &#x2611;
35. ~~Clear state when modal closes~~ &#x2611;
36. On successfully adding transaction, then send the action to update the grid
37. ~~Handle login failure and general error handling~~ &#x2611;
38. ~~change buttons to icons and have at the top of the grid (eg 1d, 1m, 3m, 6m, 1y etc)~~ &#x2611;
39. Make sure transaction and expense are used in the right context
40. Editing a transaction needs some work
41. ~~Handle errors when navigating from stocks to dashboard~~ &#x2611;
42. ~~Make ins and outs a bit smaller~~ &#x2611;
43. ~~Remove moving average logic~~ &#x2611;
44. **TESTS**!!!!!!!!!!!
45. ~~Need to add first name and last name to state and User object~~ &#x2611;
46. If you want to save, what should do?
47. ~~Monthly breakdown not working properly~~ &#x2611;
48. Tooltip on grid to show descirption in full

---

### Refactoring

1. ~~Refactor line chart tooltip (as generic as possible in html)~~ &#x2611; -> ~~Allow custom templates to be passed through~~ &#x2611;
2. ~~Refactor Modal (using ng templates and ViewChild || ContentChild)~~ &#x2611;
3. Refactor transaction and API types Daily and Historical
4. Refactor styling into scss files (settings may make more sense in certain places)
5. Question dependencies
6. ~~Refactor bar chart tooltip (custom component)~~ &#x2611;
7. ~~**Point to C# API**~~ &#x2611;
8. Nav bar using config to determine nav bar config
9. Clean up styling in nav bar
10. ~~Allow user to upload and save image as well~~ &#x2611;
11. ~~Make dropdown on graph its own component~~ &#x2611;
12. ~~Add Category service~~ &#x2611;
13. Pull data-state related to log in out into separate
14. ~~Refactor end points to allow for userIds~~ &#x2611;
15. ~~Log in and sign up form, have some shared logic, so pull out into separate file~~ (No longer needed due to using Auth0) &#x2611;
16. Upgrade angular
17. ~~Maybe change nav bar to angular material~~ (Not needed)
18. ~~Pull out all user into different its own component~~ &#x2611;
19. ~~Pull Data state and API services into shared~~ &#x2611;
20. ~~AppComponent should handle setting the user info when first logging in~~ &#x2611;
21. ~~Refactor AuthService and how user sessions are handles and how data is set~~ &#x2611;
22. ~~Refactor navbar to work on phones and ipad~~ &#x2611;
23. ~~Refactor login to its own route, that way there is more control over loading and make sure no render occurs before user info is set. Also call seems to be slow because the user-info call is slow which is likely due to the image size~~ (Need to try with new photo) &#x2611;
24. Make users and expenses into their own modules. That way we can control the imports a lot
25. Use business rule when dealing with create and update modal
26. Convert all bootstrap models to angular material
27. Colours for charts and categories needs to be fixed (come up with some auto generated)
28. ~~Need to fix display all card on the same page on phone~~ &#x2611;
29. Fix home page too
30. ~~Fix scrolling~~ &#x2611;
31. Line chart different time ranges needs to be fixed. Need to find the range in which the values should exist

---

### Business Logic

1. ~~Allow the ability to create new categories~~ &#x2611; (~~Python~~ &#x2611; ; ~~.NET~~ &#x2611;)
2. ~~Allow for updating a record~~ &#x2611;
3. ~~Allow for the creation of new records (should update grid and charts)~~ &#x2611;
4. ~~All for the deletion of records (should update grid and charts)~~ &#x2611;
5. ~~Allow the creation of new users~~ &#x2611;
6. Allow the users to edit any monthly subscriptions that they want
7. ~~Make all graphs line graphs, with different ticks for monthly values (1m = last 30 days, 6m = last 180 days, 1y = last 365 days)~~ &#x2611;
8. ~~Upcoming transactions~~
9. ~~When clicking on ins and out, a breakdown of that month should show. Potential pie-chart showing category (another modal)~~ &#x2611;
10. User profile settings - brought back as need to integrate with AuthO
11. User notification settings
12. ~~Delete account~~&#x2611;
13. Change password
14. Allow for demo mode
15. Add some error handle on all CRUD operations
16. Improve the look of the in and out modal

---

#### Styling

1. ~~Change show/hide password to use an icon~~ (Not longer needed due to not coding)
2. ~~Maybe change the log in and sign up model. Maybe use lines and not boxes~~ (Not longer needed due to not coding)

---
