import os
import pyperclip

def check_and_create_json_files(filename):
    # Get the current working directory
    cwd = os.getcwd()
    # Define the locales directories
    dirs = ['ar', 'fr', 'en']
    # Base path for locales
    base_path = os.path.join(cwd, 'public', 'locales')

    for dir in dirs:
        # Construct the full path for each directory
        full_path = os.path.join(base_path, dir, f'{filename}.json')
        # Check if the file exists
        if not os.path.exists(full_path):
            # If the file does not exist, create it
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, 'w') as f:
                f.write('{}')  # Creating an empty JSON file with empty object

            print(f'Created missing file: {full_path}')
        else:
            print(f'File already exists: {full_path}')

if __name__ == "__main__":
    # Take input from the user
    filename = input("Enter the filename (without extension): ")

    # Check if the input is empty or not a string
    if not filename.strip():
        clipboard_content = pyperclip.paste()
        if clipboard_content.strip():
            confirmation = input(f'Use "{clipboard_content}" from clipboard as filename? (y/n): ')
            if confirmation.lower() == 'y':
                filename = clipboard_content
            else:
                print("No valid filename provided. Exiting.")
                exit()
        else:
            print("No valid filename provided and clipboard is empty. Exiting.")
            exit()
    
    # Call the function to check and create JSON files
    check_and_create_json_files(filename)
