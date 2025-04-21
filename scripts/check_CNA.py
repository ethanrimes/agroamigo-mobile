import sys
import pyreadstat
import pandas as pd

def main():
    if len(sys.argv) < 2:
        print("Usage: python read_sav.py <filename.sav>")
        sys.exit(1)

    sav_file = sys.argv[1]

    # Read the file, capturing both data and metadata
    try:
        df, meta = pyreadstat.read_sav(sav_file)
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)

    # Ensure all columns are shown when printing
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 0)  # Let pandas calculate best width

    # Print column names
    print("\n=== Column Names ===")
    print(list(df.columns))

    # Print first 10 rows
    print("\n=== First 10 Rows (Head) ===")
    print(df.head(10))

    # Print variable labels
    print("\n=== Variable Labels ===")
    for var, label in meta.column_names_to_labels.items():
        print(f"{var}: {label}")

    # Print value labels
    print("\n=== Value Labels ===")
    for var, labels in meta.value_labels.items():
        print(f"{var}:")
        for value, meaning in labels.items():
            print(f"  {value}: {meaning}")

    # Print missing value formats
    print("\n=== Missing Values ===")
    for var, missing in meta.missing_ranges.items():
        print(f"{var}: {missing}")

    # Print dataset label and notes (if any)
    if meta.file_label:
        print("\n=== File Label ===")
        print(meta.file_label)

    if meta.notes:
        print("\n=== Notes ===")
        for note in meta.notes:
            print(note)

if __name__ == "__main__":
    main()