# Job Title Classifier for Google Sheets

A powerful Google Apps Script tool that automatically standardizes, classifies, and analyzes job titles in Google Sheets, providing consistent seniority levels and functional categorization.

## Features

### Core Classification
- **Title Standardization**
  - Removes special characters, regional indicators, and unnecessary text
  - Normalizes common abbreviations (Sr → Senior, VP → Vice President, etc.)
  - Data validation and cleaning

- **Seniority Classification (8 levels)**
  1. Intern
  2. Entry
  3. IC (Individual Contributor)
  4. Sr. IC
  5. Lead/Manager
  6. Director
  7. VP
  8. CXO

- **Function Categories**
  - Engineering & Technology
  - Product
  - Sales
  - HR
  - Marketing
  - Finance
  - Operations
  - Consulting
  - Research
  - Legal
  - Education
  - Healthcare
  - Creative
  - Executive
  - Other

### Visual Features
- Color-coded seniority levels (blue scale)
- Validation status highlighting
- Data validation dropdowns
- Clean formatting with headers and borders

### Processing Capabilities
- Process selected ranges
- Bulk process multiple sheets
- Error handling and logging
- Input validation
- Data quality indicators

## Installation

1. Create a new Google Sheet
2. Go to `Extensions` > `Apps Script`
3. Create two files:
   - `core.gs`: Copy the core functions
   - `processing.gs`: Copy the processing functions
4. Save both files
5. Refresh your Google Sheet

## Usage

### Using the Menu
After installation, you'll see a new menu item "Job Title Tools" with options:
- **Process Selected Titles**: Process titles in selected range
- **Bulk Process All Sheets**: Process all sheets in workbook
- **Add Data Validation**: Add dropdown menus
- **Apply Formatting**: Apply visual enhancements
- **Reset Formatting**: Clear all formatting

### Processing Titles
1. Input your job titles in Column A
2. Select the range containing titles
3. Use "Process Selected Titles" from the menu
4. Review the results in:
   - Column B: Standardized titles
   - Column C: Seniority level
   - Column D: Seniority text
   - Column E: Function
   - Column F: Validation status

### Output Format
```
| Original Title | Standardized Title | Seniority Level | Seniority | Function | Validation Status |
|---------------|-------------------|----------------|-----------|----------|------------------|
| Sr Dev        | Senior Developer  | 4              | Sr. IC    | Engineering & Technology | Valid |
```

## Customization

### Modifying Classifications
All configurations are in the `CONFIG` object in `core.gs`:
```javascript
const CONFIG = {
  HEADERS: [...],
  FUNCTIONS: [...],
  SENIORITY_LEVELS: [...],
  SENIORITY_COLORS: {...},
  VALIDATION_COLORS: {...},
  ABBREVIATIONS: {...}
};
```

### Color Scheme
Modify the color schemes in `CONFIG`:
```javascript
SENIORITY_COLORS: {
  'Intern': '#E6F3FF',
  'Entry': '#E1F5FE',
  ...
}
```

## Limitations
- Maximum 50,000 titles per batch (Google Sheets limit)
- Processing time increases with dataset size
- Some complex titles may require manual review

## Error Handling
- Invalid titles are flagged
- Processing errors are logged
- User feedback for bulk operations
- Data validation prevents invalid entries

