# BG3 Mod Kit Project Backup

**Version**: 1.4  
**Author**: pommelstrike  
**Blender Version**: 3.0.0 or later (tested with 4.1.1)  
**Location**: Properties > Output > Output > BG3 Data Backup  

A Blender add-on to back up specified folders from a Baldur's Gate 3 (BG3) `/Data` directory, with optional zipping. Designed for modders using the BG3 Mod Kit, it simplifies project backups by copying relevant folders and logging the process.

## Features
- **Backup BG3 Project Folders**: Copies folders matching a specified `ProjectName_UUID` from the `/Data` directory and its subdirectories (`Editor\Mods`, `Generated\Public`, `Mods`, `Projects`, `Public`).
- **Custom Backup Destination**: Saves backups to a user-defined path under `\BG3_Backups\<ProjectName_UUID>_Export_Data\`.
- **Optional Zipping**: Compresses the backup folder into a `.zip` file if selected.
- **Detailed Logging**: Creates a `backup_log_<project>.txt` file with backup details (source, destination, copied folders, timestamp).
- **User-Friendly Interface**: A collapsible subpanel in Blender’s Properties > Output > Output, marked with a custom icon.
![bg3_project_backup (3)](https://github.com/user-attachments/assets/2468de98-eb0f-4647-98a6-e905b26a4e2e)

## Installation
1. **Download the Add-on**:
   - Obtain the `.zip` file (e.g., `bg3_mod_kit_project_backup_v1_4.zip`) or individual files from the source.
   - The `.zip` includes:
     - `pmlstk_bg3_project_backup.py`
     - `bg3_backup_icon.png` (custom icon)
     - `README.md`

2. **Install in Blender**:
   - Open Blender (version 3.0.0 or later, tested with 4.1.1).
   - Go to `Edit > Preferences > Add-ons`.
   - Click `Install…`, select `bg3_mod_kit_project_backup_v1_4.zip`, and click `Install Add-on`.
   - Alternatively, install the `.py` file directly if not using the `.zip`.
   - Enable the add-on by checking the box next to “System: BG3 Mod Kit Project Backup” (version 1.4).

3. **Verify**:
   - In the Properties Editor, go to the Output tab.
   - Expand the “Output” panel and find the “BG3 Data Backup” subpanel (with a custom icon).
   - Ensure no unexpected workspace tabs are created.

## Usage
1. **Open the Subpanel**:
   - In Blender, switch to the **Properties Editor** (wrench or checklist icon).
   - Select the **Output** tab (folder or arrow icon).
   - Expand the **Output** panel and click the triangle next to “BG3 Data Backup” (custom icon).

2. **Configure Backup Settings**:
   - **Your BG3 \Data\ Folder Path**: Select the BG3 `/Data` directory (e.g., `D:\BG3\Data`) using the folder picker.
   - **Insert ProjectName_UUID**: Enter the project folder name (e.g., `MyMod_1234-5678-9012`).
   - **Backup Destination Path**: Choose a base folder for backups (e.g., `E:\MyBackups`). The add-on appends `\BG3_Backups\<ProjectName_UUID>_Export_Data\`.
   - **Zip Backup**: Check to create a `.zip` file of the backup.

3. **Run the Backup**:
   - Click **Run Backup**.
   - The add-on searches for folders matching `ProjectName_UUID` in the `/Data` directory and its subdirectories.
   - Matching folders are copied to the destination (e.g., `E:\MyBackups\BG3_Backups\MyMod_1234-5678-9012_Export_Data\`).
   - A log file (`backup_log_<project>.txt`) is created in the backup folder with details.
   - If “Zip Backup” is checked, a `.zip` file (e.g., `MyMod_1234-5678-9012_Export_Data.zip`) is saved in `E:\MyBackups\BG3_Backups\`.
![bg3_project_backup (2)](https://github.com/user-attachments/assets/b8b957ed-f18f-4227-8d51-5b0ceb47fee6)

4. **Check Results**:
   - Success: A message shows the number of folders backed up and the log file path.
   - Warning: If no matching folders are found, a warning appears.
   - Error: Invalid paths or empty project names trigger error messages.
![bg3_project_backup (1)](https://github.com/user-attachments/assets/eb532e60-2886-4eb5-946f-2d50a4cfb69f)

## Output
- **Backup Folder**: `<user_path>\BG3_Backups\<ProjectName_UUID>_Export_Data\`, containing copied folders.
- **Log File**: `backup_log_<project>.txt`, detailing the backup process (timestamp, source, destination, copied folders).
- **Zip File** (if enabled): `<user_path>\BG3_Backups\<ProjectName_UUID>_Export_Data.zip`.
![bg3_project_backup (4)](https://github.com/user-attachments/assets/2a503bcb-78ac-4e39-9eeb-b5c6afaf07fc)

## Compatibility
- Tested with Blender 4.1.1 (including custom builds like SSGI Native 1.17r).
- Minimum Blender version: 3.0.0.
- Designed for Windows (uses `\` paths). Contact the author for cross-platform support.

## License
This add-on is provided as-is. Feel free to modify and distribute under your preferred terms.

## Contact
For issues or feature requests, contact pommelstrike or submit a request via the repository (if available).
