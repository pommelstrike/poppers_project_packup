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

4. **Check Results**:
   - Success: A message shows the number of folders backed up and the log file path.
   - Warning: If no matching folders are found, a warning appears.
   - Error: Invalid paths or empty project names trigger error messages.

## Output
- **Backup Folder**: `<user_path>\BG3_Backups\<ProjectName_UUID>_Export_Data\`, containing copied folders.
- **Log File**: `backup_log_<project>.txt`, detailing the backup process (timestamp, source, destination, copied folders).
- **Zip File** (if enabled): `<user_path>\BG3_Backups\<ProjectName_UUID>_Export_Data.zip`.

## Custom Icon
The add-on uses a custom 32x32 PNG icon (`bg3_backup_icon.png`) displayed next to the subpanel title. To replace it:
1. Create a new 32x32 PNG.
2. Name it `bg3_backup_icon.png` and place it in the add-on folder.
3. Reinstall the add-on or update the `.zip`.

## Compatibility
- Tested with Blender 4.1.1 (including custom builds like SSGI Native 1.17r).
- Minimum Blender version: 3.0.0.
- Designed for Windows (uses `\` paths). Contact the author for cross-platform support.

## Troubleshooting
- **Add-on Not Loading**:
  - Check the System Console (`Window > Toggle System Console`) for errors like `Error registering BG3 Mod Kit Project Backup`.
  - Ensure the `.zip` or `.py` is correctly installed.
  - Restart Blender and re-enable.
- **Subpanel Missing**:
  - Verify you’re in Properties > Output > Output.
  - Expand the “Output” panel.
  - Confirm the add-on is enabled.
- **Icon Missing**:
  - Check the System Console for “Custom icon not found”.
  - Ensure `bg3_backup_icon.png` is in the add-on folder.
- **Backup Fails**:
  - Ensure the source path points to a valid `/Data` directory.
  - Check that the project name and destination path are valid.
  - Review the Blender UI for error messages.

## Version History
- **1.4**: Added custom icon (`bg3_backup_icon.png`) and `.zip` packaging support.
- **1.3**: Added README.md, maintained subpanel with icosphere icon.
- **1.2**: Switched to `MESH_ICOSPHERE` icon for subpanel.
- **1.1**: Added icon support (`FILE_BACKUP`) and versioning.
- **1.0**: Initial release with backup, zipping, and subpanel in Properties > Output.

## License
This add-on is provided as-is. Feel free to modify and distribute under your preferred terms.

## Contact
For issues or feature requests, contact pommelstrike or submit a request via the repository (if available).
