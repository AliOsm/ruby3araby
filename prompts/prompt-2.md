Load the prd skill and create a PRD for the following issues:
1. Layout is not RTL, the sidebar (Curriculum) is not on the right, it is on the left, and the code editor is not on the left. The RTL layout should be [code editor | content | curriculum] not [curriculum | content | code editor].
2. Code blocks inside the content are not highlighted. Ruby syntax is not clear.
3. Run code, copy code, and restart buttons should be icons only, with small text on hover with the shortcuts.
4. Check outputs button should be below the outputs box, not within the same row as the run code, copy code, and restart buttons.
5. The theme button should be converted to a dropdown.
6. Colors are not correct for both light and dark themes. For example, in dark theme, the number in the sub-topic is not visible. While in light theme, the text color is not visible.
7. The Arabic characters in the code are not showing with proper font. You may want to use a second font for Arabic in the code blocks like https://makkuk.com/kawkab-mono. Do your research.
8. Add a button to access the progress page while reading the lessons.
9. The run code button is very fast and not showing any indication that the code ran and finished successfully. Add a simple animation that shows even if the code finished immediately.
10. Use "روبي عربي" instead of "روبي بالعربي" in the whole website.
11. Use "شيفرة برمجية" instead of "كود" in the whole website.
12. Change the colors to be more related to Ruby.
13. The CodeEditor component is not filling the entire width of the parent card while loading the editor. This shows 2 background colors, one for the card and one for the loading state.
14. In lessons like fundamentals/user-input, the code editor card is longer than the page high because of the user input panel. So, the output box is not fully visible. This should be fixed.
15. The output box is showing the placeholder from LTR instead of RTL while the placeholder text is in Arabic.
16. The English words like `nil?` are showing the content reversed like `?nil` because they are rendering in an RTL context. Fix this in the whole app.
17. Consider moving all Arabic comments inside the code blocks to separate lines (Above of below the code that they are explaining) so that they are not rendering in weird positions/orders.
18. Add a copy button to the code blocks inside the content.
19. Add a copy and download buttons to each lesson to copy the lesson content and download the lesson as a markdown file.
20. Quoted text has extra padding in the bottom.
