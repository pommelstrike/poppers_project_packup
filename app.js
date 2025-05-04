function initializeApp() {
    console.log("App initialized");

    // Select DOM elements
    const selectSource = document.getElementById("select-source");
    const runBackup = document.getElementById("run-backup");
    const statusMessage = document.getElementById("statusMessage");
    const downloadButton = document.getElementById("downloadButton");
    const treeDisplay = document.getElementById("treeDisplay");

    let sourceHandle = null;

    // Handle folder selection
    async function selectFolder(inputId) {
        try {
            const dirHandle = await window.showDirectoryPicker();
            // Display only the folder name clearly
            document.getElementById(inputId).value = `Selected: ${dirHandle.name}`;
            statusMessage.textContent = `Selected folder: ${dirHandle.name}`;
            statusMessage.style.color = "#5f6d45";
            return dirHandle;
        } catch (err) {
            statusMessage.textContent = `Error selecting folder: ${err.message}`;
            statusMessage.style.color = "#f8d7da";
            return null;
        }
    }

    selectSource.addEventListener("click", async () => {
        sourceHandle = await selectFolder("source-root");
    });

    // Handle backup processing
    runBackup.addEventListener("click", async () => {
        const targetFolderName = document.getElementById("target-folder").value.trim();

        // Validate inputs
        if (!sourceHandle) {
            statusMessage.textContent = "Please select a source folder.";
            statusMessage.style.color = "#f8d7da";
            return;
        }
        if (!targetFolderName) {
            statusMessage.textContent = "Please enter a project name.";
            statusMessage.style.color = "#f8d7da";
            return;
        }

        statusMessage.textContent = "Processing backup... Please wait.";
        const sanitizedName = targetFolderName.replace(/\s+/g, '_').replace(/:/g, '_');
        const backupFolderName = `${sanitizedName}_Export_Data`;
        const subdirsToCheck = ['', 'Editor/Mods', 'Generated/Public', 'Mods', 'Projects', 'Public'];

        let foldersBackedUp = [];
        let treeLines = [`${backupFolderName}/`];
        const zip = new JSZip();
        const zipRoot = zip.folder(backupFolderName);
        const processedPaths = new Set(); // Track processed folder paths

        try {
            // Search for target folders
            for (const subdir of subdirsToCheck) {
                try {
                    let currentHandle = sourceHandle;
                    const pathParts = subdir ? subdir.split('/').filter(p => p) : [];
                    
                    // Navigate to subdirectory
                    for (const part of pathParts) {
                        currentHandle = await currentHandle.getDirectoryHandle(part, { create: false });
                        if (!currentHandle) break;
                    }
                    
                    if (currentHandle) {
                        const targetHandle = await currentHandle.getDirectoryHandle(targetFolderName, { create: false });
                        if (targetHandle) {
                            const relativePath = subdir ? `${subdir}/${targetFolderName}` : targetFolderName;
                            
                            // Skip if already processed
                            if (!processedPaths.has(relativePath)) {
                                processedPaths.add(relativePath);
                                foldersBackedUp.push({ src: relativePath, dest: `${backupFolderName}/${relativePath}` });
                                treeLines.push(`  ${relativePath}/`);
                                await addFolderToZip(zipRoot.folder(relativePath), targetHandle, '');
                            }
                        }
                    }
                } catch (err) {
                    console.log(`Skipping ${subdir}/${targetFolderName}: ${err.message}`);
                }
            }

            // Generate and add log file
            if (foldersBackedUp.length > 0) {
                const logContent = [
                    `Backup Log - ${new Date().toISOString()}`,
                    `Target Folder: ${targetFolderName}`,
                    `Backup Destination: ${backupFolderName}`,
                    '',
                    'Collected Folders:',
                    ...foldersBackedUp.map(f => `${f.src} -> ${f.dest}`)
                ].join('\n');

                zipRoot.file(`backup_log_${sanitizedName}.txt`, logContent);

                // Display tree
                treeDisplay.textContent = treeLines.join('\n');
                treeDisplay.style.display = "block";

                // Generate zip
                const zipContent = await zip.generateAsync({ type: 'blob' });
                const url = URL.createObjectURL(zipContent);
                downloadButton.href = url;
                downloadButton.download = `${backupFolderName}_${getUtcTimestamp()}.zip`;
                downloadButton.style.display = "block";

                statusMessage.textContent = `Backed up ${foldersBackedUp.length} folder(s). Download the zip file below.`;
                statusMessage.style.color = "#5f6d45";
                document.getElementById("patreonMessage").style.display = "block";
            } else {
                statusMessage.textContent = `No folders named '${targetFolderName}' found.`;
                statusMessage.style.color = "#fff3cd";
                treeDisplay.style.display = "none";
                downloadButton.style.display = "none";
            }
        } catch (err) {
            statusMessage.textContent = `Error during backup: ${err.message}`;
            statusMessage.style.color = "#f8d7da";
            treeDisplay.style.display = "none";
            downloadButton.style.display = "none";
        }
    });

    // Utility functions
    function getUtcTimestamp() {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

    async function addFolderToZip(zipFolder, dirHandle, path) {
        for await (const entry of dirHandle.values()) {
            const entryPath = path ? `${path}/${entry.name}` : entry.name;
            if (entry.kind === 'file') {
                const fileHandle = await dirHandle.getFileHandle(entry.name);
                const file = await fileHandle.getFile();
                zipFolder.file(entry.name, await file.arrayBuffer());
            } else if (entry.kind === 'directory') {
                const newDirHandle = await dirHandle.getDirectoryHandle(entry.name);
                const newZipFolder = zipFolder.folder(entry.name);
                await addFolderToZip(newZipFolder, newDirHandle, entryPath);
            }
        }
    }
}

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
