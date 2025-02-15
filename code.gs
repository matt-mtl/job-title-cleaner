/**
 * Creates menu items when the spreadsheet is opened
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Job Title Tools')
    .addItem('Process Selected Titles', 'processSelectedRange')
    .addItem('Bulk Process All Sheets', 'processBulk')
    .addItem('Add Data Validation', 'addDataValidation')
    .addItem('Apply Formatting', 'applyFormattingToRange')
    .addSeparator()
    .addItem('Reset Formatting', 'resetFormatting')
    .addToUi();
}

/**
 * Process selected range of titles
 */
function processSelectedRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const startRow = range.getRow();
  const startCol = range.getColumn();
  const numRows = range.getNumRows();
  
  // Add headers
  CONFIG.HEADERS.forEach((header, index) => {
    sheet.getRange(startRow - 1, startCol + index).setValue(header);
  });
  
  // Process each row
  for (let i = 0; i < numRows; i++) {
    const row = startRow + i;
    const title = sheet.getRange(row, startCol).getValue();
    
    // Validate and clean
    const { clean, status, message } = validateAndCleanTitle(title);
    const standardized = STANDARDIZE_TITLE(clean);
    const seniority = GET_SENIORITY(standardized);
    const seniorityText = GET_SENIORITY_TEXT(standardized);
    const functionCat = GET_FUNCTION(standardized);
    
    // Set values
    sheet.getRange(row, startCol + 1).setValue(standardized);
    sheet.getRange(row, startCol + 2).setValue(seniority);
    sheet.getRange(row, startCol + 3).setValue(seniorityText);
    sheet.getRange(row, startCol + 4).setValue(functionCat);
    sheet.getRange(row, startCol + 5).setValue(status);
  }
  
  // Apply formatting and validation
  applyFormattingToRange(range);
  addDataValidation(range);
}

/**
 * Apply formatting to range
 */
function applyFormattingToRange(range) {
  const sheet = range.getSheet();
  const startRow = range.getRow();
  const startCol = range.getColumn();
  const numRows = range.getNumRows();
  
  for (let i = 0; i < numRows; i++) {
    const row = startRow + i;
    
    // Get values
    const seniorityText = sheet.getRange(row, startCol + 3).getValue();
    const validationStatus = sheet.getRange(row, startCol + 5).getValue();
    
    // Apply seniority color
    if (CONFIG.SENIORITY_COLORS[seniorityText]) {
      sheet.getRange(row, startCol + 2, 1, 2)
        .setBackground(CONFIG.SENIORITY_COLORS[seniorityText]);
    }
    
    // Apply validation color
    if (CONFIG.VALIDATION_COLORS[validationStatus]) {
      sheet.getRange(row, startCol + 5)
        .setBackground(CONFIG.VALIDATION_COLORS[validationStatus]);
    }
  }
  
  // Add borders and formatting
  range.setBorder(true, true, true, true, true, true, '#D3D3D3', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(startRow - 1, startCol, 1, CONFIG.HEADERS.length)
    .setBackground('#F3F3F3')
    .setFontWeight('bold');
}

/**
 * Add data validation dropdowns
 */
function addDataValidation(range) {
  const sheet = range.getSheet();
  const startRow = range.getRow();
  const startCol = range.getColumn();
  const numRows = range.getNumRows();
  
  // Create validation rules
  const functionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.FUNCTIONS)
    .setAllowInvalid(false)
    .build();
  
  const seniorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.SENIORITY_LEVELS)
    .setAllowInvalid(false)
    .build();
  
  // Apply validation rules
  sheet.getRange(startRow, startCol + 4, numRows, 1).setDataValidation(functionRule);
  sheet.getRange(startRow, startCol + 3, numRows, 1).setDataValidation(seniorityRule);
}

/**
 * Process all sheets in workbook
 */
function processBulk() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const ui = SpreadsheetApp.getUi();
  
 // Confirm with user
  const response = ui.alert(
    'Process all sheets?',
    `This will process titles in ${sheets.length} sheets. Continue?`,
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) return;
  
  // Process each sheet
  sheets.forEach(sheet => {
    // Get data range
    const dataRange = sheet.getDataRange();
    if (dataRange.getNumRows() <= 1) return; // Skip empty sheets
    
    // Process the sheet
    try {
      const range = sheet.getRange(2, 1, dataRange.getNumRows() - 1, 1);
      processSelectedRange(range);
      
      // Log success
      Logger.log(`Processed sheet: ${sheet.getName()}`);
    } catch (error) {
      Logger.log(`Error processing sheet ${sheet.getName()}: ${error.message}`);
    }
  });
  
  // Show completion message
  ui.alert('Processing Complete', 'All sheets have been processed.', ui.ButtonSet.OK);
}
