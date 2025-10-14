0.0.3 – Newest Updates
• Implemented context with the help of Levi  – removed prop drilling; all components now access context directly
• Added smooth hover effects (image zoom, gradient overlay, text slide-in) and responsive 3→2→1 column grid layout
• Integrated Lucide React icons (ArrowUpRight, Trash2, Edit, ArrowLeft) and modernized Design
• Added `updatePostInContext` and `updatePost` API for real-time updates and PUT requests to JSONPlaceholder
• PostPage now reads from context first for instant updates; AddNewPost form redesigned with glassmorphism, loading & error states
• consistent card heights, improved loading/error handling, and general code cleanup
• Searchbar is not working
• Pagination, add new posts, filter nothing works anymore
• fixed all is now working
• Added loadmore simple limit of content +10 onClick
• Added Currently Loaded Posts: 40 but i think this is a bug because number showing current limit posts and needs to be dynamic on filter or Posts per Page visible to show the correct counter
• added currentlyLoadedPosts useState which will track the length of the list and i was able to publish the right counter with this way
• if statement and visibility for button for const onlyShowloadMoreButton = currentlyLoadedPosts > 5 && filteredPosts.length > 1; 


0.0.2 – Previous Updates
• Context is now working with the Posts Grid — I’m creating a universal version for all components instead of prop drilling. Levi helped me with that, and you also gave me a tip to use Raycast and plugins. I’ll come back to that once I feel more confident instead of relying on predefined templates.
• Installed Vite updating before i get problems
• Tryed to build Context & Reducer still working on that 
• Fixed a bug with the API caused by a wrongly renamed file (PostPage / Home)
• Switched all styling from CSS to SCSS
• Installed Sass (npm install sass)
• Updated the header – now includes the three links: Home, All Posts, and Add New Post
• The empty root URL (/) now redirects to Home (project.com/)
• Added a simple wrapper component for each page and component
• Created the Add New Post page and added a corresponding button on the main grid
• Clicking the Add New Post button redirects to the Add New Post page
• Clicking Cancel returns you to the Posts page
• Started implementing the Add New Post form with input fields, value bindings, and submit buttons


0.0.1 – Previous Updates
• React + Vite setup
• Added React Router for page navigation: First / Last Page, Previous / Next Page, Page Dropdown, Current Page, and predefined options for 10, 20, 30, 40, or 50 cards per page
• Implemented Grid Design – single cards are rendered using the map() method, and the grid component controls the overall layout
• Each card displays Title, Date, and Description, received from the parent component (Home.jsx)
• Created a Single Card component for displaying post information
• The Single Card has two buttons: Read More and Delete
• The Read More button redirects to /PostPage/${postId}
• Fixed an API bug caused by a wrongly renamed file (PostPage / Home)
• Switched styles from CSS to SCSS