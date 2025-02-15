Job Title Classifier for Google Sheets
A powerful Google Apps Script tool that automatically standardizes, classifies, and analyzes job titles in Google Sheets, providing consistent seniority levels and functional categorization.
Features

Title Standardization

Removes special characters, regional indicators, and unnecessary text
Normalizes common abbreviations (Sr → Senior, VP → Vice President, etc.)
Validates and cleans input titles


Classification

Seniority Levels (8 levels from Intern to CXO)
Function Categories (14 categories including Engineering, Sales, HR, etc.)
Validation Status with data quality indicators


Visual Enhancements

Color-coded seniority levels
Validation status highlighting
Clean formatting with headers and borders


Bulk Processing

Process selected ranges or entire sheets
Multi-sheet processing capability
Error handling and logging



Installation

Open your Google Sheet
Go to Extensions > Apps Script
Replace all content in the script editor with the provided code
Save the project
Refresh your Google Sheet

Usage
Menu Options
After installation, you'll see a new menu item "Job Title Tools" with the following options:

Process Selected Titles: Analyze titles in the selected range
Bulk Process All Sheets: Process all sheets in the workbook
Add Data Validation: Add dropdown menus for manual corrections
Apply Formatting: Apply visual formatting to the selected range
Reset Formatting: Remove all formatting and start fresh

Input Format

Place job titles in Column A
Select the range containing your titles
Use the "Job Title Tools" menu to process them

Output Columns

Original Title: The input title
Standardized Title: Cleaned and normalized version
Seniority Level: Numerical level (1-8)
Seniority: Text representation of seniority
Function: Job function category
Validation Status: Data quality indicator

Classification Categories
Seniority Levels

Intern
Entry
IC (Individual Contributor)
Sr. IC
Lead/Manager
Director
VP
CXO

Function Categories

Engineering & Technology
Product
Sales
HR
Marketing
Finance
Operations
Consulting
Research
Legal
Education
Healthcare
Creative
Executive
Other

Customization
The script uses a configuration object (CONFIG) at the top of the file where you can modify:

Column headers
Function categories
Seniority levels
Color schemes
Abbreviation mappings

Requirements

Google Sheets
Google Apps Script permissions

Limitations

Maximum 50,000 titles per batch (Google Sheets limit)
Processing time increases with dataset size
Some complex or unusual titles may require manual review
