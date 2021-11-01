**Manual Acceptance Testing**

The testing plan will utilize manual acceptance testing. Acceptance testing and inspections will be performed by the product designer after the requirements for each feature have been completed. In other words, once each pull request has been merged to complete a feature. If any defects, failures, or bugs are found while testing, the product designer will notify the dev working on the specific feature, and an issue will be created in GitHub. If for any reason, the Product Designer is unable to complete the test, the PM and dev team will work to test the completed feature.

- Safari browser on iPhoneXR
- Chrome browser on Mac Pro running MacOS Big Sur
- Firefox browser on Dell Inspiron running Windows 11

**Testing Requirements**

**This covers requirements for Global Requirements: A.1, A.2, A.3, A.4, and A.5**

1. Nav bar is present at top of every screen
2. Nav bar contains 3 items: Logo, Directory, About Us
3. Each button directs the user to the corresponding page.

**This covers requirements for Landing Page: B.1 and B.2**

1. The user opens the web page and the landing page is displayed
2. The user clicks &quot;Go on an Adventure&quot; button and is directed to &#39;Stop Select&#39; page
3. The user clicks &quot;Go to Directory&quot; button and is directed to &#39;Directory List&#39; page

**This covers requirements for Choose Number of Activities (stops): C.1, C.2, C.3, C.4, C.5, C.6, and C.7**

1. The user has clicked &quot;Go on an Adventure&quot; button and is viewing the &#39;Stop Select&#39; page
2. The page displays a nav bar, text header, 3 cards, and a next button.
3. The user views 3 cards with the following number of stops: 1, 2, and 3
4. The user selects the &quot;1 stop&quot; card
5. The next arrow button is now clickable
6. The user changes their mind and deselects it by clicking it again
7. The user then selects the &quot;2 stops&quot; card
8. The user clicks next button and is directed to the category select page

**This covers requirements for Category Select Page: D.1, D.2, D.3, D.4, D.5, D.6, and D.7**

1. The user has clicked the &#39;Next arrow&#39; button and is viewing the &#39;category select&#39; page
2. The page displays a nav bar, text header, 6 cards, and a next button.
3. The user views 6 cards with text and respective images/icons on them
4. Since the user had previously chosen 2 stops, the message &quot;&quot;Please select up to 2 categories&quot; is displayed
5. The user clicks the &quot;food&quot; category
6. The next button is now clickable
7. The user changes their mind and deselects it by clicking it again
8. The user then selects the &quot;shop&quot; and &quot;beauty&quot; cards
9. The user tries to select the &quot;exercise&quot; card, but is unable to do so. (as they selected 2 stops previously)
10. The user clicks next button and is directed to the adventure page

**This covers requirements for Your Adventure Page: E.1, E.2, E.3, E.4**

1. The user has clicked the &#39;Next arrow&#39; button and is viewing the &#39;Adventure Paget&#39; page
2. The page displays a nav bar, text header, number of cards corresponding to number of stops selected, and a next button
3. The cards are respective to the categories selected previously
4. The user views 2 cards. One for &quot;beauty test business 1&quot; (beauty) and another for a &quot;shop test business 1&quot; (shop)
5. Each card displays: logo, local business name, website, phone number, and address. And a randomize button
6. The user clicks the randomize button for the &quot;shop test business 1&quot;
7. The card is switched out with a &quot;shop test business 2&quot;
8. User clicks &quot;go on another adventure&quot; which restarts the adventure and takes the user back to to the &#39;stop select&#39; page.

**This covers requirements for Directory Page: F.1 and F.2**

1. The user has clicked &quot;Directory&quot; button either from the landing page or nav bar and is viewing the Directory page
2. The user is shown a list of 6 categories, each with a text header and respective image/icon
3. The user clicks a category
4. The user is taken to a card list view of all businesses that fall under that category
5. Each card displays: logo, local business name, website, phone number, and address
6. The user clicks the back button to be taken back to the category list view

**This covers requirements for About Us Page: G.1, G.2, and G.3**

1. The user has clicked &quot;About Us&quot; button from the nav bar and is viewing the About Us page
2. The user is shown a header, text of the team&#39;s mission and purpose
3. Underneath this, the user can vertically scroll down and view a card for each team member that displays a headshot of the team member and short description (Stretch goal)
