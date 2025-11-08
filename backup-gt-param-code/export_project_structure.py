import os

def is_text_file(filepath):
    """Check if file is likely text (safe to read)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            f.read(1024)  # Try reading first KB
        return True
    except (UnicodeDecodeError, PermissionError, IsADirectoryError):
        return False

def export_project_structure(output_file="project_export.txt"):
    with open(output_file, "w", encoding="utf-8") as out:
        for root, dirs, files in os.walk("."):
            # Skip .git, __pycache__, virtual environments, etc. if needed
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['__pycache__', '.venv', 'venv']]
            
            for filename in files:
                filepath = os.path.join(root, filename)
                relpath = os.path.relpath(filepath, ".")

                # Skip this script itself to avoid infinite recursion
                if relpath == output_file or relpath == os.path.basename(__file__):
                    continue

                # Write header
                out.write(f"{relpath}\n")

                # Write content if text file
                if is_text_file(filepath):
                    try:
                        with open(filepath, "r", encoding="utf-8") as f:
                            content = f.read()
                            out.write(content)
                    except Exception as e:
                        out.write(f"# ERROR reading file: {e}\n")
                else:
                    out.write("# Binary or unreadable file\n")

                out.write("\n" + "="*80 + "\n\n")  # Separator between files

    print(f"✅ Exported project structure to '{output_file}'")

if __name__ == "__main__":
    export_project_structure()