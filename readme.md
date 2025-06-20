# Popper's BG3 Data Backup Tool
![poppers_coffee_1](https://github.com/user-attachments/assets/9c4dab42-2884-4400-9c70-079091ca6722)

A web-based tool to back up your BG3 Mod ToolKit project folders from your Baldur's Gate 3 `/Data` directory. Select a source folder and project name, view a tree structure of the backed-up folders, and download them as a zip file with a detailed log. 

Try our related tool: [pommelstrike's BeholderEye Tool](https://github.com/pommelstrike/BeholderEye) 

**Live Site**: https://poppers-project-packup.vercel.app/

## Features

- **Folder Backup**: Finds folders matching your project name (e.g., `ProjectName_UUID`) in BG3 `/Data` subdirectories like `Mods` and `Public`.
- **Tree Display**: Shows a tree structure of the backed-up folders on the page.
- **Zip Download**: Creates a zip file with the backed-up folders and a log file (`backup_log_<project_name>.txt`).
- **Client-Side Processing**: Runs securely in your browser using Chrome or Edge.

## Prerequisites

- **Browser**: Google Chrome or Microsoft Edge (required for folder access).

## How to Use

1. **Open the App**:
   - Visit [https://poppers-project-packup.vercel.app/](https://poppers-project-packup.vercel.app/).

2. **Select Source Folder**:
   - Click “Select Folder” next to “BG3 \Data\ Folder” and choose your Baldur's Gate 3 `/Data` directory (e.g., `L:\SteamLibrary\steamapps\common\Baldurs Gate 3\Data`).
   - The input shows the folder name with a sample path. Hover over the confirmation checkbox for more info.

3. **Select your Project Name**:
   - Click your project folder name (e.g., `MyProject_UUID`) in the “Project Name” field.

4. **Confirm Local Execution**:
   - Check the “I confirm this app runs locally in my browser” checkbox to enable the “Run Backup” button.

5. **Run Backup**:
   - Click “Run Backup” to start the process.
   - The tool searches for your project folders in /Data subdirectories.

6. **View Results**:
   - **Zip Download**: Click “Download Backup Zip” to get a zip file with your folders and a `backup_log_<project_name>.txt` log.
   - **Status Message**: Shows success, warnings (e.g., no folders found), or errors.

7. **Troubleshooting**:
   - Ensure your project folder exists in the BG3 `/Data` subdirectories.
   - Verify the selected folder matches your BG3 `/Data` directory.
   - Use Chrome or Edge for folder selection.
   - Large folders may take a moment to zip.

## Dependencies

- **JSZip**: Creates zip files in your browser.
- **Noto Sans Display**: Google Font for styling.
- **Font Awesome**: Icons for download and Patreon links.

## Limitations

- Works only in Chrome or Edge.
- Zipping large folders may be slow.
- Folders are zipped for download, not saved locally.

## Offline Version

An offline version is available as a Blender add-on, perfect for users with BG3 Data folders in restricted directories like `C:\Program Files`, which may cause issues with browser-based backups.

- **Compatibility**: Works with Blender 3.0+.
- **Functionality**: Backs up modkit project folders locally, creates a zip file, and includes a log (`backup_log_<project_name>.txt`).
- **Download**: Get it from [Patreon](https://www.patreon.com/pommelstrike) or [GitHub](https://github.com/pommelstrike/poppers_project_packup). Install via Blender’s Add-ons menu.

## Support

If you find this tool useful, please consider supporting me on [Patreon](https://www.patreon.com/pommelstrike) to help create more BG3 tools and mods. Your support keeps the rage alive!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Created by [pommelstrike](https://github.com/pommelstrike).
- Powered by [Vercel](https://vercel.com/), Google Fonts, Font Awesome, and JSZip.
