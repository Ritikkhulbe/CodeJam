import log from 'electron-log/main'

// Function to pad zero
const padZero = (num: number): string => String(num).padStart(2, '0')

// Get current time
const date = new Date()

// prettier-ignore
const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`

// Customize log file name
log.transports.file.fileName = `${formattedDate}.log`

// Customize log file format
log.transports.file.format = `[{h}:{i}:{s}.{ms}] [{level}] {text}`

// Assign log.functions to console
Object.assign(console, log.functions)
