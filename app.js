function initializeApp() {
    console.log("App initialized");

    // Select DOM elements
    const selectSource = document.getElementById("select-source");
    const runBackup = document.getElementById("run-backup");
    const statusMessage = document.getElementById("statusMessage");
    const downloadButton = document.getElementById("downloadButton");
    const treeDisplay = document.getElementById("treeDisplay");
    const projectList = document.getElementById("projectList");
    const targetFolderInput = document.getElementById("target-folder");

    let sourceHandle = null;
    let selectedProject = null;

    // Enable Run Backup button when both source and project are selected
    function updateRunBackupButton() {
        runBackup.disabled = !(sourceHandle && (selectedProject || targetFolderInput.value.trim()));
    }

    // Handle folder selection
    async function selectFolder() {
        try {
            const dirHandle = await window.showDirectoryPicker();
            statusMessage.textContent = `Selected Data folder: ${dirHandle.name}`;
            statusMessage.style.color = "#5f6d45";
            sourceHandle = dirHandle;
            await populateProjectList();
            updateRunBackupButton();
            return dirHandle;
        } catch (err) {
            statusMessage.textContent = `Error selecting folder: ${err.message}`;
            statusMessage.style.color = "#f8d7da";
            return null;
        }
    }

    // Populate project list from Mods subdirectory
    async function populateProjectList() {
        if (!sourceHandle) return;

        projectList.innerHTML = "";
        projectList.style.display = "none";

        try {
            const modsHandle = await sourceHandle.getDirectoryHandle("Mods", { create: false });
            const projects = [];

            for await (const entry of modsHandle.values()) {
                if (entry.kind === "directory" && entry.name.match(/.*_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)) {
                    projects.push(entry.name);
                }
            }

            if (projects.length > 0) {
                projects.sort(); // Sort alphabetically for consistency
                const listHtml = projects
                    .map(
                        (project, index) => `
                            <label>
                                <input type="radio" name="project" value="${project}" ${index === 0 ? "checked" : ""}>
                                ${project}
                            </label>
                        `
                    )
                    .join("");
                projectList.innerHTML = `<h4>Select a Project</h4>${listHtml}`;
                projectList.style.display = "block";
                selectedProject = projects[0]; // Default to first project
                targetFolderInput.value = selectedProject; // Auto-fill input
            } else {
                statusMessage.textContent = "No project folders found in Mods directory.";
                statusMessage.style.color = "#fff3cd";
            }
        } catch (err) {
            statusMessage.textContent = "Mods directory not found or inaccessible.";
            statusMessage.style.color = "#fff3cd";
        }

        updateRunBackupButton();
    }

    selectSource.addEventListener("click", async () => {
        await selectFolder();
    });

    // Handle project selection from radio buttons
    projectList.addEventListener("change", (event) => {
        if (event.target.type === "radio") {
            selectedProject = event.target.value;
            targetFolderInput.value = selectedProject;
            updateRunBackupButton();
        }
    });

    // Update button state when target folder input changes
    targetFolderInput.addEventListener("input", () => {
        selectedProject = null; // Clear radio selection if user types manually
        projectList.querySelectorAll('input[type="radio"]').forEach((radio) => (radio.checked = false));
        updateRunBackupButton();
    });

    // Handle backup processing
    runBackup.addEventListener("click", async () => {
        const targetFolderName = targetFolderInput.value.trim() || selectedProject;

        // Validate inputs
        if (!sourceHandle) {
            statusMessage.textContent = "Please select a Data folder.";
            statusMessage.style.color = "#f8d7da";
            return;
        }
        if (!targetFolderName) {
            statusMessage.textContent = "Please enter a project name or select one from the list.";
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
