# InventoryTracking


Project 6. Inventory tracking

Write a Next.js or React program that tracks personal inventory. The program should allow you to enter an item, a serial number, and an estimated value. The program should then be able to print a tabular report in both HTML and CSV format that looks like this:
 	Name 		Serial Number 	Value 	Xbox One AXB	124AXY 	$399.00 	Samsung TV 	S40AZBDE4 	$599.99

Constraints
• store data in a local persistent data file in JSON, XML, or YAML format.
requires numerical data for the value of each item. Provide user-friendly error messages for invalid inputs
use Tailwind CSS to create a responsive, visually appealing UI for both mobile and desktop users.
allow sorting by columns (name, serial number, value) using JavaScript
allow searching for articles. Implement a search bar that filters inventory items based on: Name, Serial number, Value range (example: $100 - $500).
deploy the app using Vercel for the Next.js version and Netlify for the React version. Provide a shareable link

Challenges
modify the program so that it can store photos. If you are creating this app for a mobile device, allow the user to take a photo with the camera. Use the FileReader API to display the photo in the UI before saving. Store photos as Base64 strings in the local data file or upload them to a cloud storage service like AWS S3 or Firebase Storage
enable users to import inventory data from existing JSON, XML, or YAML files
display the total value of all items at the bottom of the table. Highlight items that exceed a specific value threshold (example: $500)

	Bonus Challenges
generate pie charts or bar graphs showing: value distribution of items, count of items by category or value range. Use charting libraries like Chart.js or Recharts
add user authentication using Firebase Authentication or NextAuth.js. Allow multiple users to manage their own inventories
