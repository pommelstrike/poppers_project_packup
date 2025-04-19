pommelstrike's BG3 Data Backup Tool
A web-based tool to back up specified folders from your Baldur's Gate 3 /Data directory. Select a source folder and project name, view a tree structure of the backed-up folders, and download them as a zip file with a detailed log. Built with a sleek, dark-themed UI inspired by pommelstrike's BeholderEye Tool.
Live Demo: https://bg3-backup-tool.vercel.app (Deployed on Vercel)
Features

Folder Backup: Searches for folders matching your project name (e.g., ProjectName_UUID) in predefined BG3 /Data subdirectories (Mods, Public, etc.).
Tree Display: Shows a tree structure of the backed-up folders directly on the page.
Zip Download: Packages the backed-up folders and a log file (backup_log_<project_name>.txt) into a downloadable zip.
Clear Path Display: Displays the selected folder with a sample path (e.g., Data (e.g., C:\...\Baldurs Gate 3\Data)) to help confirm the correct folder.
Local Confirmation: Requires a checkbox to confirm the app runs locally in the browser, ensuring user trust.
User-Friendly UI: Dark theme, Noto Sans Display font, and centered layout, styled like the BeholderEye Tool.
Client-Side Processing: Uses the File System Access API (Chrome/Edge) for secure, local folder access.
Open Source: Contributions welcome to enhance functionality or add support for other browsers.

Prerequisites

Browser: Google Chrome or Microsoft Edge (File System Access API is not supported in Firefox/Safari as of April 2025).
Node.js: Required for local development and deployment (version 16 or higher recommended).
Vercel CLI: For deploying to Vercel (optional if using the Vercel dashboard).
Git: For cloning the repository and pushing to GitHub.

Installation

Clone the Repository:
git clone https://github.com/pommelstrike/bg3-backup-tool.git
cd bg3-backup-tool


Install Dependencies:
npm install


Run Locally:
npm start


Opens http://localhost:3000 in your browser.
Use Chrome/Edge for full functionality.



Usage

Open the App:

Access the deployed site at https://bg3-backup-tool.vercel.app or run locally (npm start).


Select Source Folder:

Click “Select Folder” next to “BG3 \Data\ Folder” and choose your Baldur's Gate 3 /Data directory.
The input shows the folder name with a sample path (e.g., Data (e.g., C:\...\Baldurs Gate 3\Data)). Hover over the confirmation checkbox for a note about browser path restrictions.


Enter Project Name:

Input the target folder name (e.g., MyProject_UUID) in the “Project Name” field.


Confirm Local Execution:

Check the “I confirm this app runs locally in my browser” checkbox to enable the “Run Backup” button.


Run Backup:

Click “Run Backup” to process the folders.
The app searches for folders matching your project name in subdirectories like Mods, Public, etc.


View Results:

Tree Structure: A tree (e.g., MyProject_UUID_Export_Data/Mods/MyProject_UUID/) appears on the page.
Zip Download: A “Download Backup Zip” link provides a zip file containing the backed-up folders and a backup_log_<project_name>.txt log file.
Status Message: Indicates success, warnings (e.g., no folders found), or errors.


Troubleshooting:

Ensure the source folder contains the target folder in one of the predefined subdirectories.
Verify the displayed folder name matches your BG3 /Data directory.
Use Chrome/Edge for folder selection.
For large folders, zipping may take a moment.



Deployment
Deploy to Vercel

Set Up Vercel:

Install the Vercel CLI:npm install -g vercel


Log in to Vercel:vercel login




Deploy the Project:
vercel


Follow prompts to configure the project (use default settings for a static site).
Link to your GitHub repository for automatic deployments.


GitHub Integration:

Push the repository to GitHub:git remote add origin https://github.com/your-username/bg3-backup-tool.git
git push -u origin main


In the Vercel dashboard, connect the repository for automatic deployments on push.


Access the Site:

Vercel provides a URL (e.g., https://bg3-backup-tool.vercel.app) after deployment.



Project Structure
bg3-backup-tool/
├── public/
│   ├── index.html  # Main UI with form, tree display, and download link
│   ├── app.js      # Logic for folder processing, tree generation, and zipping
├── vercel.json     # Vercel configuration for static site deployment
├── package.json    # Node.js dependencies and scripts
├── README.md       # This file

Dependencies

JSZip: For client-side zip file generation.
Noto Sans Display: Google Font for UI styling.
Font Awesome: Icons for download and Patreon links.

Limitations

Browser Support: File System Access API is Chrome/Edge-only. A server-side version could support other browsers (see Contributing).
Path Display: Browsers restrict access to full file paths for security. The app shows the folder name with a sample path to aid confirmation.
Performance: Zipping large folders may be slow client-side. Consider a server-side approach for heavy workloads.
No Destination Folder: Folders are not copied locally; they’re collected in memory and zipped for download.

Contributing
Contributions are welcome! To contribute:

Fork the Repository:
git clone https://github.com/pommelstrike/bg3-backup-tool.git
cd bg3-backup-tool


Create a Branch:
git checkout -b feature/your-feature


Make Changes:

Enhance the UI (e.g., interactive tree with collapsible nodes).
Add server-side processing for broader browser support.
Optimize performance for large folders.
Improve path display or add new features (e.g., custom subdirectory selection).


Test Locally:
npm start


Submit a Pull Request:

Push your branch:git push origin feature/your-feature


Open a pull request on GitHub with a clear description of your changes.



Support
If you find this tool useful, please consider supporting me on Patreon to help create more BG3 tools and mods. Your support keeps the rage alive!
License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgements

Built with rage by pommelstrike.
Inspired by the BeholderEye Tool.
Powered by Vercel, JSZip, and the File System Access API.


Made with rage by pommelstrike
